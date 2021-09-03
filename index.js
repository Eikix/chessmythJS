const processMoves = require('./chess/utils/processMoves');
const allowedMoves = require('./chess/utils/pieceTypeToMoves');
const allPossibleMovesOnBoard = require('./chess/utils/allPossibleMovesOnBoard.js');

const width = 10;
const boardOptions = {
    backline: 'rnnbqkbnnr',
    frontline: 'pppppppppp',
    width: width,
    terrain: ['4;6'],
};

const Chess = require('./chess/Chess');

const chess = new Chess(boardOptions, allowedMoves);
const board = chess.getBoard();
const dimension = chess.getDimensions();

// console.log(chess.getPossibleMoves('2;5', 'w'));
// chess.move('3;5', '3;5', 'w');
console.log(chess.getBoard());

// console.log(allPossibleMovesOnBoard(dimension, allowedMoves, 'w', board));

// console.log(chess.getPiecesAndMoves());
// console.log(allowedMoves.n);
console.log(processMoves(width, '10;10', allowedMoves.p, 'b', board));
// console.log(chess.getTurn());
