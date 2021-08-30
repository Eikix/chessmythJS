const Board = require('./boards/Board');

class Chess extends Board {
    #turn = 0;
    constructor(boardOptions) {
        super(boardOptions);
    }

    getTurn() {
        return this.#turn;
    }
}

module.exports = Chess;
