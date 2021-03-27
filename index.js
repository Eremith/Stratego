const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const createBoard = require('./back/modules/create-board');

const session = require('express-session')({
    secret: "eb8fcc253281389225b4f7872f2336918ddc7f689e1fc41b64d5c4f378cdc438",
    resave: true,
    saveUninitialized: true,
    cookie:{
        maxAge: 2*60*60*1000,
        secure: false
    }
});
const sharedsession = require('express-socket.io-session');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false});

const app = express();

app.use(express.static(__dirname + '/front'));
app.use(urlencodedParser);
app.use(session);

const server = http.createServer(app);
const io = socketio(server);
const { clear, getBoard, makeTurn } = createBoard(10);

io.use(sharedsession(session, {
    autoSave: true
}));

if (app.get('env') === 'production') {
    app.set('trust proxy', 1)
    session.cookie.secure = true
}

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

app.post('/login', body('login').isLength({ min: 3 }).trim().escape(), (req, res) => {
    const login = req.body.login;
  
    // Error management
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      //return res.status(400).json({ errors: errors.array() });
    } else {
      // Store login
      req.session.username = login;
      req.session.save()
      res.redirect('/');
    }
  });

io.on('connection', (sock) => {
    console.log('user connected');

    sock.on('login', () => {
        let srvSockets = io.sockets.sockets;
        srvSockets.forEach(user => {
            console.log(user.handshake.session.username);
        });
        io.emit('new-message', 'user' + socketio.handshake.session.username + ' logged in');
    });

    sock.emit('board', getBoard());
    sock.on('turn', ({x, y}) => {
        makeTurn(x, y, "blue");
        io.emit('turn', { x, y});
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