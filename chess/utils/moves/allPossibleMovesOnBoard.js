const processMoves = require('./processMoves');

function allPossibleMovesOnBoard(
    dimension,
    mobility,
    playerColor,
    board,
    verbose = true
) {
    const allPossibleMoves = {};
    const allPossibleMovesArray = [];
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
                if (verbose) {
                    allPossibleMoves[coord] = {
                        moves: moves,
                        piece: board[coord].piece.type,
                    };
                } else {
                    for (let move of moves) {
                        allPossibleMovesArray.push(move?.move);
                    }
                }
            }
        }
    }
    if (verbose) {
        return allPossibleMoves;
    } else {
        return allPossibleMovesArray;
    }
}

module.exports = allPossibleMovesOnBoard;
