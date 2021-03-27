const createBoard = size => {

    let board;

    const clear = () => {
        board = Array(size).fill().map(() => Array(size).fill(null));
    };

    const getBoard = () => board;

    const makeTurn = (x, y, color) => {
        board[y][x] = color;
    };

    clear();

    return {
        clear, makeTurn, getBoard
    };
};

module.exports = createBoard;