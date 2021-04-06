const getBoard = (canvas, id, numCells = 10) => { //fonctions pour gérer le board
    const ctx = canvas.getContext('2d');
    const cellSize = Math.floor(canvas.width / numCells);

    const fillCell = (x, y, pion) => { //colore une case selon couleur et ses coords
        let img = new Image();
        if(id == pion.id || pion.id == 2){
            img.src = "images/" + pion.image + ".png";
            ctx.drawImage(img, x*cellSize, y*cellSize);
        } else {
            if(id == 0){
                img.src = "images/dosrouge.png";
                ctx.drawImage(img, x*cellSize, y*cellSize);
            } else if(id == 1){
                img.src = "images/dosbleu.png";
                ctx.drawImage(img, x*cellSize, y*cellSize);
            }
        }
        console.log(pion.image + " affiched");
    };

    const clearCell = (x, y) => {
        ctx.clearRect(x*cellSize, y*cellSize, cellSize - 1, cellSize - 1);
    };

    const drawGrid = () => { //dessine des lignes horizontales/verticales avec methode des canvas
        ctx.strokeStyle = "#565656";
        ctx.beginPath();

        for(let i = 0; i < numCells + 1; i++){
            ctx.moveTo(i*cellSize, 0);
            ctx.lineTo(i*cellSize, cellSize * numCells);

            ctx.moveTo(0, i*cellSize);
            ctx.lineTo(cellSize * numCells, i*cellSize);
        }
        ctx.stroke();
        
    };

    const clear = () => { //clear le canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const renderBoard = (board = []) => { //affiche le board en cours sauvegardé côté serv pour un nouveau utilisateur
        board.forEach((row, y) => {
            row.forEach((pion, x) => {
                if(pion){
                    fillCell(x, y, pion);
                }
            });
        });
    };

    const reset = (board) => { //reset du board
        clear();
        drawGrid();
        renderBoard(board);
    };

    const getCellCoords = ( x, y ) => { //renvoie la conversion des coords de la cellule selon les coords en paramètre
        return {
            x2: Math.floor(x / cellSize),
            y2: Math.floor(y / cellSize)
        };
    };

    return { fillCell, reset, getCellCoords, clearCell };
};

const getClickCoords = (elem, event) => { //renvoie les coords de l'event dans l'élément passé en paramètre
    const { top, left } = elem.getBoundingClientRect();
    const { clientX, clientY} = event;

    return {
        x: clientX - left,
        y: clientY - top
    };
};

let rdy = 0;
const ready = () => {
    let p = document.getElementById('pret');
    
    if(p.innerHTML == "Attente du second joueur"){
        p.innerHTML = "Prêt";
        document.getElementById('pret').className = 'btn btn-primary';
        rdy = 0;
    } else {
        p.innerHTML = "Attente du second joueur";
        document.getElementById('pret').className = 'btn btn-warning';
        rdy = 1;
    }
}

(() => {
    const sock = io();

    sock.on('sendData', (dataPlayer) => {
        let idJoueur = dataPlayer.id;
        console.log("id de ce joueur = " + dataPlayer.id);

        const canvas = document.querySelector('canvas'); //sélection du canvas
        let btn = document.getElementById('pret');
        btn.addEventListener('click', function(){
            sock.emit('ready', idJoueur);
        });

        console.log("id du joueur appel getboard = "+idJoueur);
        const { fillCell, reset, getCellCoords, clearCell } = getBoard(canvas, idJoueur); //récupération des fonctions de getBoard avec un canvas en paramètre

        //const onClick = (e) => { //envoie les coords de l'endroit cliqué côté serv
        //    const { x, y } = getClickCoords(canvas, e);
        //    sock.emit('turn', getCellCoords( x, y ));
        //};

        let tmpX = "";
        let tmpY = "";
        let tmpXToSwitch = "";
        let tmpYToSwitch = "";
        let cl = 0;
        const onClick = (e) => { //
            if(cl % 2 == 0){
                console.log("1er pion selectionné");
                let { x, y } = getClickCoords(canvas, e);
                let { x2, y2 } = getCellCoords( x, y );
                tmpX = x2;
                tmpY = y2;
                console.log("tmp x et y = " + tmpX + " " + tmpY + " tmptoswitch x et y = " + tmpXToSwitch + " " + tmpYToSwitch);
                cl++;
            } else if(cl % 2 == 1){
                console.log("et 2eme");
                let { x, y } = getClickCoords(canvas, e);
                let { x2, y2 } = getCellCoords( x, y );
                tmpXToSwitch = x2;
                tmpYToSwitch = y2;
                sock.emit('swap', ({tmpX, tmpY, tmpXToSwitch, tmpYToSwitch, idJoueur}));
                
                console.log("tmp x et y = " + tmpX + " " + tmpY + " tmptoswitch x et y = " + tmpXToSwitch + " " + tmpYToSwitch);
                cl = 0;
            }
        };
        sock.on('retourSwap', ({pion, pionToSwitch, tmpIdJ}) => {
            if(tmpIdJ == idJoueur){
                console.log("id joueur requete = " + tmpIdJ);
                console.log("id pion a swap = " + pion.id);
                console.log("pion = " + pion.image + " " + pion.id);
                clearCell(tmpX, tmpY);
                clearCell(tmpXToSwitch, tmpYToSwitch);
                fillCell(tmpX, tmpY, pion);
                fillCell(tmpXToSwitch, tmpYToSwitch, pionToSwitch);
                console.log("swap");
            }
        });

        sock.on('endPlacement', () => {
            alert("La partie commence");
            let p = document.getElementById('btnReady');
            p.innerHTML = "";
        });

        canvas.addEventListener('click', onClick);
        
        sock.on('board', reset);
        //sock.on('turn', ({ x, y, pion, clicks}) => fillCell(x, y, pion));

        

        //let test1 = new pion(1);
        //let test2 = new pion(0);
        //test1.battle(test2);
        //console.log(test1.alive);
        //console.log(test2.alive);
    });

    sock.on('connectToRoom',({roomno, name}) => {
        let room = document.getElementById('room');
        if(room.innerHTML == ""){
            room.innerHTML = "Connecté en tant que :  " + name +" | Room " +roomno;
        }
        sock.emit('nameRoom', "room-"+roomno);
    });

})();