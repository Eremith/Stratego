const createBoard = size => {

    //board initial à chaque création de room
    let board = [[{image: "espion", id: 1},{image: "eclaireur", id: 1},{image: "eclaireur", id: 1},{image: "eclaireur", id: 1},{image: "eclaireur", id: 1},{image: "eclaireur", id: 1},{image: "eclaireur", id: 1},{image: "eclaireur", id: 1},{image: "eclaireur", id: 1},{image: "demineur", id: 1}],
    [{image: "demineur", id: 1},{image: "demineur", id: 1},{image: "demineur", id: 1},{image: "demineur", id: 1},{image: "sergent", id: 1},{image: "sergent", id: 1},{image: "sergent", id: 1},{image: "sergent", id: 1},{image: "lieutenant", id: 1},{image: "lieutenant", id: 1}],
    [{image: "lieutenant", id: 1},{image: "lieutenant", id: 1},{image: "capitaine", id: 1},{image: "capitaine", id: 1},{image: "capitaine", id: 1},{image: "capitaine", id: 1},{image: "commandant", id: 1},{image: "commandant", id: 1},{image: "commandant", id: 1},{image: "colonel", id: 1}],
    [{image: "colonel", id: 1},{image: "general", id: 1},{image: "marechal", id: 1},{image: "drapeau", id: 1},{image: "bombe", id: 1},{image: "bombe", id: 1},{image: "bombe", id: 1},{image: "bombe", id: 1},{image: "bombe", id: 1},{image: "bombe", id: 1}],
    ["","",{image: "mer", id: 2},{image: "mer", id: 2},"","",{image: "mer", id: 2},{image: "mer", id: 2},"",""],
    ["","",{image: "mer", id: 2},{image: "mer", id: 2},"","",{image: "mer", id: 2},{image: "mer", id: 2},"",""],
    [{image: "espion", id: 0},{image: "eclaireur", id: 0},{image: "eclaireur", id: 0},{image: "eclaireur", id: 0},{image: "eclaireur", id: 0},{image: "eclaireur", id: 0},{image: "eclaireur", id: 0},{image: "eclaireur", id: 0},{image: "eclaireur", id: 0},{image: "demineur", id: 0}],
    [{image: "demineur", id: 0},{image: "demineur", id: 0},{image: "demineur", id: 0},{image: "demineur", id: 0},{image: "sergent", id: 0},{image: "sergent", id: 0},{image: "sergent", id: 0},{image: "sergent", id: 0},{image: "lieutenant", id: 0},{image: "lieutenant", id: 0}],
    [{image: "lieutenant", id: 0},{image: "lieutenant", id: 0},{image: "capitaine", id: 0},{image: "capitaine", id: 0},{image: "capitaine", id: 0},{image: "capitaine", id: 0},{image: "commandant", id: 0},{image: "commandant", id: 0},{image: "commandant", id: 0},{image: "colonel", id: 0}],
    [{image: "colonel", id: 0},{image: "general", id: 0},{image: "marechal", id: 0},{image: "drapeau", id: 0},{image: "bombe", id: 0},{image: "bombe", id: 0},{image: "bombe", id: 0},{image: "bombe", id: 0},{image: "bombe", id: 0},{image: "bombe", id: 0}]];

    //modèle : {image: "nomimage", id: 0ou1 = joueurs, 2 = autres}

    const clear = () => { //vide le board
        board = Array(size).fill().map(() => Array(size).fill(null));
    };

    const getBoard = () => board;

    const makeTurn = (x, y, pion, idPlayer) => { //(non utilisé) but = placement de pions sur un board vide ou déplacements lors d'une partie
        board[y][x].image = pion.image;
        board[y][x].id = idPlayer;
    };

    const swap = (tmpX, tmpY, tmpXToSwitch, tmpYToSwitch) => { //inverse 2 pions selon leurs coordonnées
        let tmpPion = board[tmpY][tmpX];
        board[tmpY][tmpX] = board[tmpYToSwitch][tmpXToSwitch];
        board[tmpYToSwitch][tmpXToSwitch] = tmpPion;
    };

    if(board == undefined){
        clear();
    }

    return {
        clear, makeTurn, getBoard, swap
    };
};

module.exports = createBoard;