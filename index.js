const server = require('http').createServer()
const io = require('socket.io')(server)

let messageHistory = {}

io.on('connection', client => {
    client.currentRoom = client.id;
    messageHistory[client.currentRoom] = [];
    console.log(`Client connected: ${client.id}`);
    client
        // .on('register', handleRegister)
        // .on('join', handleJoin)
        // .on('leave', handleLeave)
        .on('message', message => handleMessage(message, client))
        .on('disconnect', () => {
            console.log(`Client ${client.id} has disconnected`)
            // handleDisconnect()
        })
        .on('error', err => {
            console.log(`Error from ${client.id}: ${err}`)
        })
        .on('join', (room) => {
            console.log(room)
            client.currentRoom = room;
            client.emit('message', `${client.rooms[room]}`)
        })
})

function handleMessage(message, client) {
    messageHistory[client.currentRoom].push({
        message,
        id: client.id,
        timestamp: new Date()
    });
    let msg = `${client.id}: ${message}`;
    io.in(client.currentRoom).emit('message', msg)
}

server.listen(3030, err => {
    if (err) throw err
    console.log('Listening on port 3030')
})