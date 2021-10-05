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
        this.isGameOver = false;
    }

    getTurn() {
        return this.#turn;
    }

    isWhiteTurn() {
        return this.#turn % 2 === 0;
    }

    getLegalMoves(coord) {
        const legalMoves = [];
        const playerColor = this.isWhiteTurn() ? 'w' : 'b';
        const playerKing = playerColor === 'w' ? this.wKing : this.bKing;
        const allowedMoves = exitCheckMoveList(
            playerKing,
            this.getDimension(),
            this.getPiecesAndMoves(),
            playerColor,
            this.getBoard()
        );
        const moves = this.getPossibleMoves(coord, playerColor);
        moves.forEach(move => {
            const movement = { from: coord, to: move.move };
            if (allowedMoves.includes(movement)) legalMoves.push(movement);
        });
        return legalMoves;
    }

    moveFromTo(from, to) {
        const playerColor = this.isWhiteTurn() ? 'w' : 'b';
        if (this.board[from]?.piece?.color === playerColor) {
            const playerKing = playerColor === 'w' ? this.wKing : this.bKing;
            let completeMove = null;
            const legalMoves = this.getLegalMoves(from);
            const desiredMove = { from, to };
            if (legalMoves.includes(desiredMove))
                completeMove = this.move(from, to, playerColor);
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
                    if (this.allPossibleMovesPerTurn.length === 0) {
                        this.isGameOver = true;
                    }
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
