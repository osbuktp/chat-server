const io = require('socket.io')(3030)

let rooms = {};
function pushMessage(room, msg) {
    msg.timestamp = new Date()
    rooms[room].messages.push(msg);
    io.in(room).emit('message', {
        message: msg,
        room: room
    })
}

function joinRoom(room, socket) {
    socket.join(room)
    rooms[room].users.push(socket.name)
    socket.emit('service', {
        type: 'join',
        room: {
            id: room,
            users: rooms[room].users
        }
    })
    pushMessage(room, {
        from: 0,
        text: `${socket.name} joined the room`
    })
}

io.on('connection', socket => {
    console.log(`Client ${socket.id} has connected`)
    socket
        .on('register', name => {
            socket.name = name;
            rooms[socket.id] = {
                users: [],
                messages: []
            };
            socket.emit('service', {
                type: 'register',
                ok: true,
                user: {
                    id: socket.id,
                    name: socket.name
                }
            })
            joinRoom(socket.id, socket)
        })
        .on('join', roomid => {
            if (rooms[roomid]) {
                joinRoom(roomid, socket)
            } else socket.emit('error', {
                text: 'No such room'
            })
        })
        .on('service', message => handleService(message))
        .on('leave', room => handleLeave(socket, room))
        .on('message', message => handleMessage(message))
        .on('disconnect', () => {
            console.log(`Client ${socket.id} has disconnected`)
            handleLeave(socket, null)
        })
})

function handleLeave(socket, room) {
    const msg = {
        from: 0,
        text: `${socket.name} has left the room`
    }
    if(room) {
        pushMessage(room, msg)
    } else {
        for (let rm in socket.rooms) {
            pushMessage(rm, msg)
        }
    }
}

function handleService(message) {
    const room = message.room
    delete message.room
    room ? io.in(room).emit('service', message) : io.emit('service', message)
}

function handleMessage(message) {
    const msg = {
        from: message.from,
        text: message.text
    }
    pushMessage(message.room, msg)
}