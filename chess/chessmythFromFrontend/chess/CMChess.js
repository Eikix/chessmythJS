const Board = require('./boards/CMBoard');
const exitCheckMoveList = require('./utils/helpers/exitCheckMoveList');
const isCheck = require('./utils/helpers/isCheck');
const allPossibleMovesOnBoard = require('./utils/moves/allPossibleMovesOnBoard');
const _ = require('lodash');
const DEBUG = false;

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
        if (DEBUG) console.log('coord: ', coord);
        if (DEBUG)
            console.log(
                'What you would get by running this.getPossibleMoves',
                this.getPossibleMoves(coord, playerColor)
            );
        const legalMoves = [];
        const playerColor = this.isWhiteTurn() ? 'w' : 'b';
        if (DEBUG) console.log('Player Color: ', playerColor);
        const playerKing = playerColor === 'w' ? this.wKing : this.bKing;
        if (DEBUG) console.log('Player King : ', playerKing);
        const allowedMoves = exitCheckMoveList(
            playerKing,
            this.getDimension(),
            this.getPiecesAndMoves(),
            playerColor,
            this.getBoard()
        );
        if (DEBUG)
            console.log('exitCheckMoveList returned value: ', allowedMoves);
        const moves = this.getPossibleMoves(coord, playerColor);
        if (DEBUG)
            console.log(
                'Allowed Moves without taking in account Check: ',
                moves
            );
        moves.forEach(move => {
            const movement = { from: coord, to: move.move };
            if (DEBUG) console.log('Desired movement : ', movement);
            if (DEBUG) console.log(movement);
            allowedMoves.forEach(legalMove => {
                if (_.isEqual(legalMove, movement)) legalMoves.push(movement);
            });
        });
        if (DEBUG)
            console.log(
                'Legal Moves to be returned from getLegalMoves : ',
                legalMoves
            );
        return legalMoves;
    }

    moveFromTo(from, to) {
        const playerColor = this.isWhiteTurn() ? 'w' : 'b';
        if (this.board[from]?.piece?.color === playerColor) {
            const playerKing = playerColor === 'w' ? this.wKing : this.bKing;
            let completeMove = null;
            const legalMoves = this.getLegalMoves(from);
            const desiredMove = { from, to };
            legalMoves.forEach(legalMove => {
                if (_.isEqual(legalMove, desiredMove))
                    completeMove = this.move(from, to, playerColor);
            });
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
