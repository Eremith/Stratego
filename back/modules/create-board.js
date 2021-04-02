const createBoard = size => {

    let board = [["espion","eclaireur","eclaireur","eclaireur","eclaireur","eclaireur","eclaireur","eclaireur","eclaireur","demineur"],
    ["demineur","demineur","demineur","demineur","sergent","sergent","sergent","sergent","lieutenant","lieutenant"],
    ["lieutenant","lieutenant","capitaine","capitaine","capitaine","capitaine","commandant","commandant","commandant","colonel"],
    ["colonel","general","marechal","drapeau","bombe","bombe","bombe","bombe","bombe","bombe"],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["espion","eclaireur","eclaireur","eclaireur","eclaireur","eclaireur","eclaireur","eclaireur","eclaireur","demineur"],
    ["demineur","demineur","demineur","demineur","sergent","sergent","sergent","sergent","lieutenant","lieutenant"],
    ["lieutenant","lieutenant","capitaine","capitaine","capitaine","capitaine","commandant","commandant","commandant","colonel"],
    ["colonel","general","marechal","drapeau","bombe","bombe","bombe","bombe","bombe","bombe"]];

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