const convertBoardOptionsToInitialBoard = require("../utils/convertToBoard");

class Board {
    #dimension;
    constructor(boardOptions) {
        this.#dimension = boardOptions?.width || 0;
        // Initial board is an object with keys of format "NumberNumber" as strings. Example first row fifth column is "15" and entries of format: {piece: null || str, terrain: null | str}
        this.board = convertBoardOptionsToInitialBoard(boardOptions);
    }


    getDimensions() {
        return this.#dimension;
    }

    getBoardSize() {
        return this.#dimension*this.#dimension;
    }

    getBoard() {
        return this.board;
    }


}


module.exports =  Board;