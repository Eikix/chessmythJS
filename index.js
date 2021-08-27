const processMoves = require('./chess/utils/processMoves');
const allowedMoves = require('./chess/utils/allowedMoves');

const width = 10;
const boardOptions = {
    backline: 'rnjbqkbjnr',
    frontline: 'psppppppsp',
    width: width,
};

const Chess = require('./chess/Chess');

const chess = new Chess(boardOptions);

// console.log(chess.getBoard());

// console.log(allowedMoves.p);
console.log(processMoves(width, '2;5', allowedMoves.q, 'w'));
