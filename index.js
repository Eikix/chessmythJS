const processMoves = require('./chess/utils/processMoves');
const allowedMoves = require('./chess/utils/pieceTypeToMoves');

const width = 10;
const boardOptions = {
    backline: 'rnjbqkbjnr',
    frontline: 'psppppppsp',
    width: width,
    terrain: ['4;6'],
};

const Chess = require('./chess/Chess');

const chess = new Chess(boardOptions, allowedMoves);
const board = chess.getBoard();

// console.log(chess.getPiecesAndMoves());
// console.log(allowedMoves.n);
// console.log(processMoves(width, '2;5', allowedMoves.n, 'b', board));
// console.log(chess.getTurn());
