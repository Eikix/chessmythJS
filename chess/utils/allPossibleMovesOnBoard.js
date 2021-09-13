const processMoves = require('./processMoves');

function allPossibleMovesOnBoard(dimension, mobility, playerColor, board) {
    const allPossibleMoves = {};
    for (let x = 1; x <= dimension; x++) {
        for (let y = 1; y <= dimension; y++) {
            const coord = `${x};${y}`;
            if (
                board[coord].piece &&
                board[coord].piece.color === playerColor
            ) {
                const moves = processMoves(
                    dimension,
                    coord,
                    mobility[board[coord].piece.type],
                    playerColor,
                    board
                );
                allPossibleMoves[coord] = {
                    moves: moves,
                    piece: board[coord].piece.type,
                };
            }
        }
    }
    return allPossibleMoves;
}

module.exports = allPossibleMovesOnBoard;
