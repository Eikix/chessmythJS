const allowedMoves = require('./chess/utils/pieces/pieceTypeToMoves');

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

// chess.move('3;5', '3;5', 'w');
//console.log(chess.getBoard());

// console.log(chess.getBoard());

// const moves = allPossibleMovesOnBoard(dimension, allowedMoves, 'b', board);

// const keys = Object.keys(moves);

// for (let key of keys) {
//     console.log(moves[key]);
// }

// console.log(chess.move('5;9', '5;8', 'b'));
// console.log(chess.move('5;8', '5;6', 'b'));

// console.log(chess.getBoard());

// console.log(chess.getPiecesAndMoves());
// console.log(allowedMoves.n);
// console.log(processMoves(width, '6;3', allowedMoves.n, 'w', board));
// console.log(chess.getTurn());

// console.log(chess.moveFromTo('1;9', '1;8'));
// console.log(chess.moveFromTo('1;2', '1;4'));
console.log(chess.allPossibleMovesPerTurn);
// console.log(chess.getBoard());
