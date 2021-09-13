const Board = require('./boards/CMBoard');

class Chess extends Board {
    #turn = 0;
    constructor(boardOptions, piecesAndMoves) {
        super(boardOptions, piecesAndMoves);
    }

    getTurn() {
        return this.#turn;
    }
}

module.exports = Chess;