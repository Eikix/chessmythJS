class Board {
    constructor(dimension) {
        if (dimension > 0 && dimension < 27) {
            this.#dimension = dimension;
            this.#board = this.setBoard();
        } else {
            this.#dimension = 0;
            this.#board = {};
        }
        
    }


    getDimensions() {
        return #dimension;
    }

    getBoardSize() {
        return #dimension*#dimension;
    }

    setBoard() {
        const newBoard = {}
        for (let x=0; x<dimension; x++) {
            for (let y=0; y<dimension; y++) {
                newBoard[String.fromCharCode(x+97)][y] = x+y;
            }
        }
        return newBoard;
    }

    getBoard() {
        return this.#board;
    }


}


module.exports =  Board;