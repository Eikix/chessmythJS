const Piece = require("./chess/pieces/piece");

const piece = new Piece("knight", "white", "a2")

console.log(piece.getPosition(), piece.type);