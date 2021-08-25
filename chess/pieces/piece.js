class Piece {

    /* Mobility is an array of objects containing allowed moves: e.g. [
        {
            move: Array || String, example:  [1, 2] // "lineForward" (means all line long) // "diagRight" (means all diag long) // [-1, -2] // etc. (diagLeft, lineBackward) //


            available: String, example: "firstTurn", "always"
            captureMove:  Array || String, example: [1, 1], etc.
        }  
    ] */
    #mobility;
    #canPromote;
    #name;

    constructor(name, mobility, canPromote) {
        this.#mobility = mobility;
        this.#name = name;
        this.#canPromote = canPromote;
    }

}