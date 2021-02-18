const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();

app.use(express.static(__dirname + '/front'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/front/html/index.html');
});

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (sock) => {
    console.log('user connected');
    sock.emit('message', 'You are connected');
    sock.on('disconnect', () => {
        console.log('user disconnected');
    })
})

server.on('error', (err) =>{
    console.log(err);
});

server.listen(4200, () => {
    console.log('Server ready');
});