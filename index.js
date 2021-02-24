const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const session = require('express-session')({
    secret: "eb8eryje8th4thehsetheth8eh8erheh5erherher1rh7erhwd9srh",
    resave: true,
    saveUninitialized: true,
    cookie:{
        maxAge: 2*60*60*1000,
        secure: false
    }
});
const sharedsession = require('express-socket.io-session');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false});

const { body, validationResult } = require('express-validator');

const app = express();

app.use(express.static(__dirname + '/front'));
app.use(urlencodedParser);
app.use(session);

app.get('/', (req, res) => {
    let sessionData = req.session;
    console.log(sessionData.username);
    //si utilisateur pas connecté
    if(!sessionData.username){
        res.sendFile(__dirname + '/front/html/index.html');
    } else{
        res.sendFile(__dirname + '/front/html/home.html');
    }
});

app.post('/login', body('login').isLength({min: 3, max: 32 }).trim().escape(), (req, res) => {
    login = req.body.login;

    //errors management
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
    } else{
        //store login
        req.session.username = login;
        req.session.save();
        res.redirect('/');
    }
});

const server = http.createServer(app);
const io = socketio(server);

io.use(sharedsession(session, {
    autoSave: true
}));

io.on('connection', (sock) => {
    console.log('user connected');

    sock.on('login', () => {
        let srvSockets = io.sockets.sockets;
        srvSockets.forEach(user => {
            console.log(user.handshake.session.username);
        });
        io.emit('new-message', 'user' + socketio.handshake.session.username + ' logged in');
    });

    sock.on('disconnect', () => {
        io.emit('new-message', 'user' + sock.handshake.session.username + ' disconnected');
        console.log('an user disconnected');
    });
});

server.on('error', (err) =>{
    console.log(err);
});

server.listen(4200, () => {
    console.log('Server ready');
});