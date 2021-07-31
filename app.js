const express = require('express');
const app = express();
const path = require('path');
// http serve is required to start the functionality of socket.io and pass that into const io
const http = require('http');
const server = http.createServer(app);

const socketio = require('socket.io');
const io = socketio(server);


app.use('/', express.static(path.join(__dirname, '/public')));

// connection is a name of the event; when frontend connects with backend, this below function will run
io.on('connection', (socket) => {
    console.log("Connection Successfull");
    console.log(socket.id);

    // listen to socket
    socket.on('send-msg', (data) => {
        console.log(`${data.msg} send by ${socket.id}`);

        // socket.emit => send/rcv data on one socket
        // io.emit => send/rcv data on all sockets in server
        io.emit('received-msg', {
            id: socket.id,
            msg: data.msg
        });
    });

});

// here instead of app, listen to the server
server.listen(process.env.PORT || 3003, () => {
    console.log("Server running at port 3003");
});