const Board = require('./boards/CMBoard');

class Chess extends Board {
    #turn = 0;
    constructor(boardOptions, piecesAndMoves) {
        super(boardOptions, piecesAndMoves);
    }

    getTurn() {
        return this.#turn;
    }

    isWhiteTurn() {
        return this.#turn % 2 === 0;
    }

    moveTo(from, to, playerColor) {
        const isPlayerTurn =
            playerColor === 'w' ? this.isWhiteTurn() : !this.isWhiteTurn();
        if (!isPlayerTurn) return null;
        if (isPlayerTurn) {
            const completeMove = this.move(from, to, playerColor);
            if (completeMove) {
                this.#turn += 1;
            }
        }
    }
}

module.exports = Chess;
