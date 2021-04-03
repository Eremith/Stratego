const createBoard = size => {

    let board = [[{image: "espion", id: 1},{image: "eclaireur", id: 1},{image: "eclaireur", id: 1},{image: "eclaireur", id: 1},{image: "eclaireur", id: 1},{image: "eclaireur", id: 1},{image: "eclaireur", id: 1},{image: "eclaireur", id: 1},{image: "eclaireur", id: 1},{image: "demineur", id: 1}],
    [{image: "demineur", id: 1},{image: "demineur", id: 1},{image: "demineur", id: 1},{image: "demineur", id: 1},{image: "sergent", id: 1},{image: "sergent", id: 1},{image: "sergent", id: 1},{image: "sergent", id: 1},{image: "lieutenant", id: 1},{image: "lieutenant", id: 1}],
    [{image: "lieutenant", id: 1},{image: "lieutenant", id: 1},{image: "capitaine", id: 1},{image: "capitaine", id: 1},{image: "capitaine", id: 1},{image: "capitaine", id: 1},{image: "commandant", id: 1},{image: "commandant", id: 1},{image: "commandant", id: 1},{image: "colonel", id: 1}],
    [{image: "colonel", id: 1},{image: "general", id: 1},{image: "marechal", id: 1},{image: "drapeau", id: 1},{image: "bombe", id: 1},{image: "bombe", id: 1},{image: "bombe", id: 1},{image: "bombe", id: 1},{image: "bombe", id: 1},{image: "bombe", id: 1}],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    [{image: "espion", id: 0},{image: "eclaireur", id: 0},{image: "eclaireur", id: 0},{image: "eclaireur", id: 0},{image: "eclaireur", id: 0},{image: "eclaireur", id: 0},{image: "eclaireur", id: 0},{image: "eclaireur", id: 0},{image: "eclaireur", id: 0},{image: "demineur", id: 0}],
    [{image: "demineur", id: 0},{image: "demineur", id: 0},{image: "demineur", id: 0},{image: "demineur", id: 0},{image: "sergent", id: 0},{image: "sergent", id: 0},{image: "sergent", id: 0},{image: "sergent", id: 0},{image: "lieutenant", id: 0},{image: "lieutenant", id: 0}],
    [{image: "lieutenant", id: 0},{image: "lieutenant", id: 0},{image: "capitaine", id: 0},{image: "capitaine", id: 0},{image: "capitaine", id: 0},{image: "capitaine", id: 0},{image: "commandant", id: 0},{image: "commandant", id: 0},{image: "commandant", id: 0},{image: "colonel", id: 0}],
    [{image: "colonel", id: 0},{image: "general", id: 0},{image: "marechal", id: 0},{image: "drapeau", id: 0},{image: "bombe", id: 0},{image: "bombe", id: 0},{image: "bombe", id: 0},{image: "bombe", id: 0},{image: "bombe", id: 0},{image: "bombe", id: 0}]];

    //modèle : {image: "nomimage", id: 0ou1}

    const clear = () => {
        board = Array(size).fill().map(() => Array(size).fill(null));
    };

    const getBoard = () => board;

    const makeTurn = (x, y, pion, idPlayer) => {
        board[y][x].image = pion.image;
        board[y][x].id = idPlayer;
    };

    if(board == undefined){
        clear();
    }

    return {
        clear, makeTurn, getBoard
    };
};

module.exports = createBoard;