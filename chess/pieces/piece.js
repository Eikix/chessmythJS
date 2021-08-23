class Piece {
    isAlive = true;
    #formerPosition; // eslint-disable-line no-use-before-define
    #position;
    constructor(type, color, position) {
        this.type = type;
        this.color = color;
        this.#position = position;
        this.#formerPosition = null;
    }

    movePiece(from, to) {
        this.#position = to;
        this.#formerPosition = from;
    }

    getPosition() {
        return this.#position;
    }




}

module.exports = Piece;