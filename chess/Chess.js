const Board = require("./boards/Board");

class Chess extends Board {
    constructor(boardOptions) {
        super(boardOptions);
    }
}

module.exports = Chess