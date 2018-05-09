var socketio = require('socket.io');

const connectSocket = (server) => {
    const websocket = socketio.listen(server);
    websocket.on('connection', (client) => {
        console.log('A client just joined on', client.id);
        client.emit("mes", {
            hello: "hello"
        })
    });
}

module.exports = {
    connectSocket
}