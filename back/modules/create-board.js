const createBoard = size => {

    let board = [["blue","yellow","blue","yellow","blue","yellow","blue","yellow","blue","yellow"],
    ["blue","yellow","blue","yellow","blue","yellow","blue","yellow","blue","yellow"],
    ["blue","yellow","blue","yellow","blue","yellow","blue","yellow","blue","yellow"],
    ["blue","yellow","blue","yellow","blue","yellow","blue","yellow","blue","yellow"],
    ["blue","yellow","blue","yellow","blue","yellow","blue","yellow","blue","yellow"],
    ["blue","yellow","blue","yellow","blue","yellow","blue","yellow","blue","yellow"],
    ["blue","yellow","blue","yellow","blue","yellow","blue","yellow","blue","yellow"],
    ["blue","","blue","yellow","blue","yellow","blue","yellow","blue","yellow"],
    ["blue","yellow","blue","yellow","blue","yellow","blue","yellow","blue","yellow"],
    ["blue","yellow","blue","yellow","blue","yellow","blue","yellow","blue","yellow"]];

    const clear = () => {
        board = Array(size).fill().map(() => Array(size).fill(null));
    };

    const getBoard = () => board;

    const makeTurn = (x, y, color) => {
        board[y][x] = color;
    };

    if(board == undefined){
        clear();
    }

    return {
        clear, makeTurn, getBoard
    };
};

module.exports = createBoard;