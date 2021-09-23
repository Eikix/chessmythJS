const processMoves = require('./chess/utils/processMoves');
const allowedMoves = require('./chess/utils/pieceTypeToMoves');
const allPossibleMovesOnBoard = require('./chess/utils/allPossibleMovesOnBoard.js');

const width = 10;

const boardOptions = {
    backline: 'rnnbqkbnnr',
    frontline: 'pppppppppp',
    width: width,
    terrain: ['4;6'],
    mana: ['3;6', '7;8'],
    wKing: '6;1',
    bKing: '6;10',
};

const Chess = require('./chess/CMChess');

const chess = new Chess(boardOptions, allowedMoves);
const board = chess.getBoard();
const dimension = chess.getDimensions();

// chess.move('3;5', '3;5', 'w');
//console.log(chess.getBoard());

// console.log(chess.getBoard());

// const moves = allPossibleMovesOnBoard(dimension, allowedMoves, 'b', board);

// const keys = Object.keys(moves);

// for (let key of keys) {
//     console.log(moves[key]);
// }

console.log(chess.move('5;9', '5;7', 'b'));
console.log(chess.move('5;7', '5;5', 'b'));

console.log(chess.getBoard());

// console.log(chess.getPiecesAndMoves());
// console.log(allowedMoves.n);
// console.log(processMoves(width, '5;5', allowedMoves.b, 'w', board));
// console.log(chess.getTurn());
