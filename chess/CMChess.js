const Board = require('./boards/CMBoard');
const exitCheckMoveList = require('./utils/helpers/exitCheckMoveList');
const isCheck = require('./utils/helpers/isCheck');
const allPossibleMovesOnBoard = require('./utils/moves/allPossibleMovesOnBoard');

class Chess extends Board {
    #turn = 0;
    constructor(boardOptions, piecesAndMoves) {
        super(boardOptions, piecesAndMoves);
        this.allPossibleMovesPerTurn = allPossibleMovesOnBoard(
            this.getDimension(),
            this.getPiecesAndMoves(),
            'w',
            this.getBoard(),
            false
        );
    }

    getTurn() {
        return this.#turn;
    }

    isWhiteTurn() {
        return this.#turn % 2 === 0;
    }

    moveFromTo(from, to) {
        const playerColor = this.isWhiteTurn() ? 'w' : 'b';
        if (this.board[from]?.piece?.color === playerColor) {
            // Verify isCheck state of player king.

            const playerKing = playerColor === 'w' ? this.wKing : this.bKing;
            const isChecked = isCheck(this.allPossibleMovesPerTurn, playerKing);

            const completeMove = this.move(from, to, playerColor);
            if (completeMove) {
                this.#turn += 1;

                // Setting all possible moves on board for next turn.
                const nextPlayerColor = playerColor === 'w' ? 'b' : 'w';
                const nextPlayerKing =
                    nextPlayerColor === 'w' ? this.wKing : this.bKing;
                const hypothethicMoves = allPossibleMovesOnBoard(
                    this.getDimension(),
                    this.getPiecesAndMoves(),
                    playerColor,
                    this.getBoard(),
                    false
                );
                if (isCheck(hypothethicMoves, nextPlayerKing)) {
                    this.allPossibleMovesPerTurn = exitCheckMoveList(
                        nextPlayerKing,
                        this.getDimension(),
                        this.getPiecesAndMoves(),
                        nextPlayerColor,
                        this.getBoard()
                    );
                } else {
                    this.allPossibleMovesPerTurn = allPossibleMovesOnBoard(
                        this.getDimension(),
                        this.getPiecesAndMoves(),
                        nextPlayerColor,
                        this.getBoard(),
                        false
                    );
                }
                return true;
            } else {
                return false;
            }
        }
    }
}

module.exports = Chess;
