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

io.use(sharedsession(session, {
    autoSave: true
}));

if (app.get('env') === 'production') {
    app.set('trust proxy', 1)
    session.cookie.secure = true
}

app.get('/', (req, res) => {
    let sessionData = req.session;
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

let roomno = 1;
let clicks = [0]; //tableau pour les différentes rooms
let boards = [];
boards[0] = createBoard(10);
let ready = [{j1:0,j2:0}];
io.on('connection', (sock) => { //si la connexion est faite

    console.log(sock.handshake.session.username + " connected");

    //Si le nombre d'utilisateur est de plus d'un dans une room, on en recrée une avec ses variables correspondantes
    if(io.sockets.adapter.rooms.get("room-"+roomno) && io.sockets.adapter.rooms.get("room-"+roomno).size > 1){
        roomno++;
        clicks.push({j1:0,j2:0});
        ready.push(0);
        console.log("nouvelle room : "+clicks);
        boards.push(createBoard(10));
    } 
    sock.join("room-"+roomno);

    let tmpId;
    if(io.sockets.adapter.rooms.get("room-"+roomno).size == 1){ //attribution de l'id aux joueurs
        tmpId = 0;
    } else{
        tmpId = 1;
    }
    let dataPlayer = {
        name:sock.handshake.session.username,
        id:tmpId
    }
    //const pion = {image:"bombe", id:tmpId};

    console.log("name="+dataPlayer.name + " id="+dataPlayer.id);

    sock.emit('sendData', dataPlayer); //envoie côté client des infos sur son id et nom

    let name = sock.handshake.session.username;
    io.sockets.in("room-"+roomno).emit('connectToRoom', {roomno, name});

    let nbRoom = 0;
    sock.on('nameRoom', (room)=>{
        nbRoom = room;
        nbRoom = nbRoom.slice(5);
        nbRoom = parseInt(nbRoom);

        io.sockets.in("room-"+roomno).emit('board', boards[nbRoom - 1].getBoard());

        console.log("room = "+room);
    });

    /*
    sock.on('turn', ({x, y}) => {        
        if(clicks[nbRoom - 1] % 2 == dataPlayer.id){
            clicks[nbRoom - 1]++;
            boards[nbRoom - 1].makeTurn(x, y, pion, dataPlayer.id);
            io.to(room).emit('turn', { x, y, pion, clicks });
            console.log("tableau des clics par room " + clicks);
        }
    });
    */

    //reception d'une requete de swap, si l'id des pions dans le board de la room correspond à l'id du joueur effectuant la requete, swap dans le board puis envoie de la validation
    sock.on('swap', ({tmpX, tmpY, tmpXToSwitch, tmpYToSwitch, idJoueur}) => {
        let board = boards[nbRoom - 1].getBoard();
        console.log("id pions : " + board[tmpY][tmpX].id + " " + board[tmpYToSwitch][tmpXToSwitch].id);
        console.log("id joueur swap : " + idJoueur);
        if(board[tmpY][tmpX].id == idJoueur && board[tmpYToSwitch][tmpXToSwitch].id == idJoueur){
            boards[nbRoom - 1].swap(tmpX, tmpY, tmpXToSwitch, tmpYToSwitch);
            board = boards[nbRoom - 1].getBoard();
            let pion = board[tmpY][tmpX];
            let pionToSwitch = board[tmpYToSwitch][tmpXToSwitch];
            let tmpIdJ = idJoueur;
            io.sockets.in("room-"+roomno).emit('retourSwap', {pion, pionToSwitch, tmpIdJ});
        }
    });

    sock.on('ready', idJoueur => { //si les 2 joueurs sont prêts, début de la partie (pas fonctionnel à 100%)
        console.log("pret " + idJoueur);

        if(idJoueur == 1){
            if(ready[nbRoom - 1].j2 == 0){
                console.log("j2 ready");
                ready[nbRoom - 1].j2 = 1;
            } else {
                console.log("j1 pas ready");
                ready[nbRoom - 1].j2 = 0;
            }
        }
        if(idJoueur == 0){
            if(ready[nbRoom - 1].j1 == 0){
                console.log("j1 ready");
                ready[nbRoom - 1].j1 = 1;
            } else {
                console.log("j1 pas ready");
                ready[nbRoom - 1].j1 = 0;
            }
        }
        
        if(ready[nbRoom - 1].j1 == 1 && ready[nbRoom - 1].j2 == 1){
            io.sockets.in("room-"+roomno).emit('endPlacement');
            console.log("début partie");
        }
    });

    sock.on('disconnect', () => { //gestion deconnexion pour quitter la room (ne met pas encore fin à la partie)
        sock.leave("room-"+roomno);
        io.emit('new-message', 'user' + sock.handshake.session.username + ' disconnected');
        console.log(sock.handshake.session.username+' disconnected');
    });
});

server.on('error', (err) =>{
    console.log(err);
});

server.listen(4200, () => { //on écoute sur le port 4200
    console.log('Server ready');
});