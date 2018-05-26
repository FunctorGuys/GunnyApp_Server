var socketio = require('socket.io');

const clients = {};
const rooms = [
    {
        id: 154832146284,
        name: "ROOM001",
        isFull: true,
        creater: {
            id: 54554,
            username: "user001",
            fullname: "User 001",
            isReady: false,
            win: 2,
            lose: 12,
        },
        invitee: {
            id: 2444,
            username: "user002",
            fullname: "User 002",
            isReady: true,
            win: 3,
            lose: 10,
        }
    },
    {
        id: 154832148884,
        name: "ROOM002",
        isFull: false,
        creater: {
            id: 5422554,
            username: "user003",
            fullname: "User 003",
            isReady: false,
            win: 12,
            lose: 10,
        },
        invitee: {}
    },
    {
        id: 154855212146284,
        name: "ROOM003",
        isFull: false,
        creater: {
            id: 12541215,
            username: "user005",
            fullname: "User 005",
            isReady: false,
            win: 21,
            lose: 12,
        },
        invitee: {}
    },
];


const connectSocket = (server) => {
    const websocket = socketio.listen(server);
    websocket.on('connection', (client) => {
        console.log('A client just joined on', client.id);
        clients[client.id] = client;
        listenClient(client);
    });
}

const listenClient = socketClient => {
    socketClient.on("getActiveRooms", () => {
        socketClient.emit("receivedActiveRooms", rooms);
    })
    socketClient.on("disconnect", () => {
        console.log("disconnect", socketClient.id);
        delete clients[socketClient.id];
    })
}

module.exports = {
    connectSocket
}