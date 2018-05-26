var socketio = require('socket.io');

const clients = {};
let rooms = [
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
    // Client get all rooms
    socketClient.on("getActiveRooms", () => {
        socketClient.emit("receivedActiveRooms", rooms);
    })

    // Client enter a room
    socketClient.on("enterRoom", ({room_id, user}) => {
        // console.log("Client enter room", room_id, rooms);

        let roomChange = {};
        rooms = rooms.map(room => {
            if (room.id === room_id) {
                return roomChange = {
                    ...room,
                    isFull: true,
                    invitee: {
                        ...user,
                        isReady: false
                    }
                }
            }
            return room;
        })
        updateRoom(roomChange);
        
    })

    // Client on leaveRoom
    socketClient.on("leaveRoom", room_id => {
        let roomLeave = rooms.filter(room => room.id === room_id)[0];
        console.log("Client leave room", room_id);
        let roomChange = {};
        if (roomLeave.isFull) {
            rooms = rooms.map(room => {
                if (room.id === room_id) {
                    return roomChange = {
                        ...room,
                        isFull: false,
                        invitee: {},
                    }
                }
                return room;
            })

            updateRoom(roomChange);
        } else {
            cancelRoom(roomLeave.id);
        }
    })

    // Client create new room 
    socketClient.on("createRoom", newRoom => {
        console.log("Client create new room");
        rooms.push(newRoom);
        createRoom(newRoom, () => {
            socketClient.emit("createdRoom", newRoom);
        });
    })


    // Client disconnect
    socketClient.on("disconnect", () => {
        console.log("disconnect", socketClient.id);
        delete clients[socketClient.id];
    })
}

const updateRoom = room => {
    Object.keys(clients).forEach(client_id => {
        const client = clients[client_id];
        if (client.id) {
            client.emit("updateRoom", room);
        }
    });
}

const cancelRoom = room_id => {
    rooms = rooms.filter(room => room.id !== room_id);
    Object.keys(clients).forEach(client_id => {
        const client = clients[client_id];
        if (client.id) {
            client.emit("cancelRoom", room_id);
        }
    });
}

const createRoom = async (room, cb) => {
    try {
        await Object.keys(clients).forEach(client_id => {
            const client = clients[client_id];
            if (client.id) {
                client.emit("createRoom", room);
            }
        });
        cb();

    } catch(er) {
        console.log(er);
    }
}

module.exports = {
    connectSocket
}