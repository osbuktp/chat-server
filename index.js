const express = require('express')
const path = require('path')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'build')))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

let rooms = {}
let userRooms = {}
let users = {}

function sendMessage(room, message) {
    io.in(room).emit('message', room, 0, {
        text: message,
        timestamp: new Date()
    })
}

function disconnect(socket) {
    console.log(`${socket.id} has disconnected`)
    io.in(socket.id).emit('closed')
    userRooms[socket.id].forEach(room => {
        if (rooms[room]) {
            rooms[room].users.delete(socket.id)
            io.in(room).emit('user-left', socket.id)
            sendMessage(room, `User ${socket.name} has left the room`)
        }
    })
    delete rooms[socket.id]
}
function signal(socket, toId, msg) {
    io.to(toId).emit('signal', socket.id, msg)
}
function joinRoom(socket, room) {
    socket.join(room)
    console.log(`${socket.id} joined ${room}`)
    if (!rooms[room]) {
        console.log('No such room')
        return
    }
    userRooms[socket.id].add(room)
    rooms[room].users.add(socket.id)
    io.in(room).emit('user-joined', room, socket.id)
    sendMessage(room, `User ${socket.name} has joined the room`)
    socket.emit('joined', room)
}
function message(socket, room, msg) {
    io.in(room).emit('message', room, socket.name, {
        text: msg,
        timestamp: new Date()
    })
}
function joinTranslation(socket, room) {
    console.log(`${socket.id} has joined video translation in room ${room}`)
    if (!rooms[room]) return;
    rooms[room].translation.add(socket.id)
    io.in(room).emit('user-joinedTranslation', socket.id, rooms[room].translation.size, Array.from(rooms[room].translation))
}
function leaveTranslation(socket, room) {
    console.log(`${socket.id} has left video translation in room ${room}`)
    if (!rooms[room]) return;
    rooms[room].translation.delete(socket.id)
    io.in(room).emit('user-leftTranslation', socket.id)
}
function register(socket, name) {
    console.log(`Register: ${socket.id}:${name}`)
    users[socket.id] = name
    socket.name = name
    socket.emit('registered', socket.id)
}
function chatInfo(socket, room) {
    if (!rooms[room]) return
    socket.emit('chat-info', {
        chatUsers: Array.from(rooms[room].users).map(user => users[user]),
        translationUsers: Array.from(rooms[room].translation).map(user => users[user])
    })
}

io.on('connection', socket => {
    console.log(`${socket.id} joined`)
    if (!rooms[socket.id]) rooms[socket.id] = {
        users: new Set(),
        translation: new Set()
    }
    if (!userRooms[socket.id]) userRooms[socket.id] = new Set()
    socket
    .on('register', name => register(socket, name))
    .on('signal', (toId, msg) => signal(socket, toId, msg))
    .on('join-room', room => joinRoom(socket, room))
    .on('get-chat-info', room => chatInfo(socket, room))
    .on('join-translation', room => joinTranslation(socket, room))
    .on('leave-translation', room => leaveTranslation(socket, room))
    .on('message', (room, msg) => message(socket, room, msg))
    .on('disconnect', () => disconnect(socket))
})

server.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})