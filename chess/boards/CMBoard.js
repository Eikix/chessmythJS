const convertBoardOptionsToInitialBoard = require('../utils/convertStringToBoard');
const processMoves = require('../utils/processMoves');

class Board {
    #dimension;
    #piecesAndMoves;
    constructor(boardOptions, piecesAndMoves) {
        this.#dimension = boardOptions?.width || 0;
        // Initial board is an object with keys of format "NumberNumber" as strings. Example first row fifth column is "15" and entries of format: {piece: null || str, terrain: null | str}
        this.board = convertBoardOptionsToInitialBoard(
            boardOptions,
            piecesAndMoves
        );
        this.#piecesAndMoves = piecesAndMoves;
        this.wKing = boardOptions?.wKing;
        this.bKing = boardOptions?.bKing;
    }

    getDimensions() {
        return this.#dimension;
    }

    getBoardSize() {
        return this.#dimension * this.#dimension;
    }

    getBoard() {
        return this.board;
    }

    getPiecesAndMoves() {
        return this.#piecesAndMoves;
    }

    getPossibleMoves(coord, playerColor) {
        const pieceTypeOnCoord = this.board[coord].piece?.type;
        if (
            pieceTypeOnCoord &&
            this.#piecesAndMoves.hasOwnProperty(pieceTypeOnCoord)
        ) {
            return processMoves(
                this.#dimension,
                coord,
                this.#piecesAndMoves[pieceTypeOnCoord],
                playerColor,
                this.board
            );
        } else {
            return [];
        }
    }

    move(from, to, playerColor) {
        const moves = this.getPossibleMoves(from, playerColor);
        if (this.board[from].piece === null) return false;
        let targetMove = null;
        console.log(moves);
        for (let move of moves) {
            // Checking if the target coordinate is present in the array of move objects.
            if (move.move === to) targetMove = move;
        }
        if (targetMove) {
            // Keep in memory king's position
            if (
                this.board[from].piece.type === 'k' &&
                this.board[from].piece.color === playerColor
            ) {
                if (playerColor === 'w') this.wKing = to;
                if (playerColor === 'b') this.bKing = to;
            }

            // Checks if the piece still has special move charges
            if (
                targetMove.isSpecialMove &&
                this.board[from].piece.specialMoveCharges === 0
            ) {
                return false;
            }

            // Checks if the piece is a pawn, and if they are moving for the first time, but only one tile.
            // In this case, their ability to move two tiles forward is depleted.
            if (
                this.board[from].piece.type === 'p' &&
                !targetMove.isSpecialMove &&
                this.board[from].piece.specialMoveCharges === 1
            ) {
                this.board[from].piece.specialMoveCharges -= 1;
            }

            // Moves the piece
            const tmp = this.board[from].piece;
            if (
                targetMove.isSpecialMove &&
                this.board[from].piece.specialMoveCharges > 0
            ) {
                tmp.specialMoveCharges -= 1;
            }
            this.board[from].piece = null;
            this.board[to].piece = tmp;
            return true;
        } else {
            return false;
        }
    }
}

module.exports = Board;
