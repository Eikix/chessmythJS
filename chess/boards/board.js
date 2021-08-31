const convertBoardOptionsToInitialBoard = require('../utils/convertStringToBoard');

class Board {
    #dimension;
    #piecesAndMoves;
    constructor(boardOptions, piecesAndMoves) {
        this.#dimension = boardOptions?.width || 0;
        // Initial board is an object with keys of format "NumberNumber" as strings. Example first row fifth column is "15" and entries of format: {piece: null || str, terrain: null | str}
        this.board = convertBoardOptionsToInitialBoard(boardOptions);
        this.#piecesAndMoves = piecesAndMoves;
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
}

module.exports = Board;
