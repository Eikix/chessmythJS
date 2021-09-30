const allPossibleMovesOnBoard = require('../moves/allPossibleMovesOnBoard');

function exitCheckMoveList(
    playerKing,
    dimension,
    mobility,
    playerColor,
    board
) {
    const initTmp = board['6;10'].piece;
    board['6;10'].piece = null;
    board['3;3'].piece = initTmp;
    console.log(board);
    const exitCheckMovesArray = [];
    console.log("Careful, you're in check!");
    const allMoves = allPossibleMovesOnBoard(
        dimension,
        mobility,
        playerColor,
        board,
        true
    );

    const fromArray = Object.keys(allMoves);
    if (!allMoves) return null;

    for (from of fromArray) {
        for (move of allMoves[from].moves) {
            // Implementing "leave checked state"

            // Deep copy of board -- See JS meaning online https://www.javascripttutorial.net/object/3-ways-to-copy-objects-in-javascript/
            const hypotheticBoard = JSON.parse(JSON.stringify(board));
            const to = move.move;
            let hypotheticKingPos = playerKing;
            // console.log(from);
            // console.log(hypotheticBoard[from]);
            //console.log(move);
            //console.log(from);

            // Keep in memory king's position
            if (hypotheticBoard[from].piece.type === 'k') {
                hypotheticKingPos = to;
            }

            // Checks if the piece still has special move charges
            if (
                move.isSpecialMove &&
                hypotheticBoard[from].piece.specialMoveCharges === 0
            ) {
                continue;
            }

            // Moves the piece
            const tmp = hypotheticBoard[from].piece;
            hypotheticBoard[from].piece = null;
            hypotheticBoard[to].piece = tmp;

            const ennemyColor = playerColor === 'w' ? 'b' : 'w';

            const hypotheticEnnemyMoves = allPossibleMovesOnBoard(
                dimension,
                mobility,
                ennemyColor,
                hypotheticBoard,
                false
            );

            if (!hypotheticEnnemyMoves.includes(hypotheticKingPos)) {
                exitCheckMovesArray.push({ from, to });
            }
        }
    }
    return exitCheckMovesArray;
}

module.exports = exitCheckMoveList;
