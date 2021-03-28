const getBoard = (canvas, numCells = 10) => { //fonctions pour gérer le board
    const ctx = canvas.getContext('2d');
    const cellSize = Math.floor(canvas.width / numCells);

    const fillCell = (x, y, color) => { //colore une case selon couleur et ses coords
        ctx.fillStyle = color;
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
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
            row.forEach((color, x) => {
                color && fillCell(x, y, color);
            });
        });
    };

    const reset = (board) => { //reset du board
        clear();
        drawGrid();
        renderBoard(board);
    };

    const getCellCoords = ( x, y) => { //renvoie la conversion des coords de la cellule selon les coords en paramètre
        return {
            x: Math.floor(x / cellSize),
            y: Math.floor(y / cellSize)
        };
    };

    return { fillCell, reset, getCellCoords };
};

const getClickCoords = (elem, event) => { //renvoie les coords de l'event dans l'élément passé en paramètre
    const { top, left } = elem.getBoundingClientRect();
    const { clientX, clientY} = event;

    return {
        x: clientX - left,
        y: clientY - top
    };
};

(() => {
    
    const canvas = document.querySelector('canvas'); //sélection du canvas
    const { fillCell, reset, getCellCoords } = getBoard(canvas); //récupération des fonctions de getBoard avec un canvas en paramètre
    const sock = io();

    const onClick = (e) => { //envoie les coords de l'endroit cliqué côté serv
        const { x, y} = getClickCoords(canvas, e);
        sock.emit('turn', getCellCoords( x, y ));
    };

    sock.on('board', reset);
    sock.on('turn', ({ x, y}) => fillCell(x, y));

    canvas.addEventListener('click', onClick);

    //let test1 = new pion(1);
    //let test2 = new pion(0);
    //test1.battle(test2);
    //console.log(test1.alive);
    //console.log(test2.alive);

})();