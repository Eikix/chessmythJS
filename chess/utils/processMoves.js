// Will be given board dimension, current piece location, and allowed moves array --> returns possible landing tiles.
// Note that currentLoc should be expressed as follows: xNumber;yNumber

function processMoves(
    dimension,
    currentLocation,
    mobility,
    playerColor,
    board
) {
    const playerDirection = playerColor === 'w' ? 1 : -1;
    const possibleMoves = [];
    const reg = /[0-9]+/g;
    const [xCoord, yCoord] = currentLocation.match(reg);
    const xCoordAsNumber = parseInt(xCoord);
    const yCoordAsNumber = parseInt(yCoord);
    mobility.map(move => {
        if (move?.available != 0 && Array.isArray(move?.move)) {
            const xMove = move.move[0];
            const yMove = move.move[1];

            // Declaring conditions to make it clearer. We will need these conditions to generate a legal moves array depending on multiple variables.
            const playerIsWhiteAndMoveIsOnBoardAhead =
                playerDirection === 1 &&
                xCoordAsNumber + parseInt(xMove) <= dimension;

            const playerIsWhiteAndMoveIsOnBoardBehind =
                playerDirection === 1 && xCoordAsNumber + parseInt(xMove) >= 1;

            const playerIsWhiteAndMoveIsOnBoardVertically =
                playerIsWhiteAndMoveIsOnBoardAhead &&
                playerIsWhiteAndMoveIsOnBoardBehind;

            const playerIsBlackAndMoveIsOnBoardAhead =
                playerDirection === -1 && xCoordAsNumber - parseInt(xMove) >= 1;

            const playerIsBlackAndMoveIsOnBoardBehind =
                playerDirection === -1 &&
                xCoordAsNumber - parseInt(xMove) <= dimension;

            const playerIsBlackAndMoveIsOnBoardVertically =
                playerIsBlackAndMoveIsOnBoardAhead &&
                playerIsBlackAndMoveIsOnBoardBehind;

            const moveIsOnBoardHorizontally =
                yCoordAsNumber + parseInt(yMove) <= dimension;

            const targetCoord =
                (playerIsWhiteAndMoveIsOnBoardVertically ||
                    playerIsBlackAndMoveIsOnBoardVertically) &&
                moveIsOnBoardHorizontally
                    ? `${xCoordAsNumber + parseInt(xMove) * playerDirection};${
                          yCoordAsNumber + parseInt(yMove) * playerDirection
                      }`
                    : null;

            console.log(targetCoord);
            if (!targetCoord) return;

            const pieceExistsAndIsAllied =
                board[targetCoord].piece !== null &&
                board[targetCoord].piece.color === playerColor;

            const pieceExistsAndIsEnnemy =
                board[targetCoord].piece !== null &&
                board[targetCoord].piece.color !== playerColor;

            const terrainExistsAtLocation = board[targetCoord].terrain;

            const pieceIsNullButMustCapture =
                board[targetCoord].piece === null && move.mustCapture;

            const targetLocationIsAnObstacle =
                pieceExistsAndIsAllied ||
                (pieceExistsAndIsEnnemy && !move.canCapture) ||
                terrainExistsAtLocation ||
                pieceIsNullButMustCapture;

            if (
                (playerIsWhiteAndMoveIsOnBoardVertically ||
                    playerIsBlackAndMoveIsOnBoardVertically) &&
                moveIsOnBoardHorizontally &&
                !targetLocationIsAnObstacle
            ) {
                possibleMoves.push(
                    `${xCoordAsNumber + parseInt(xMove) * playerDirection};${
                        yCoordAsNumber + parseInt(yMove)
                    }`
                );
            }
        }
        if (move?.available != 0 && typeof move?.move === 'string') {
            switch (move.move) {
                case 'lineForward':
                    for (let i = 1; i <= dimension; i++) {
                        if (
                            (playerDirection === 1 &&
                                xCoordAsNumber + i <= dimension) ||
                            (playerDirection === -1 && xCoordAsNumber - i >= 1)
                        )
                            possibleMoves.push(
                                `${
                                    xCoordAsNumber + i * playerDirection
                                };${yCoord}`
                            );
                    }
                    break;
                case 'lineLeft':
                    for (let i = 1; i <= dimension; i++) {
                        if (yCoordAsNumber - i >= 1)
                            possibleMoves.push(
                                `${xCoord};${yCoordAsNumber - i}`
                            );
                    }
                    break;
                case 'lineRight':
                    for (let i = 1; i <= dimension; i++) {
                        if (yCoordAsNumber + i <= dimension)
                            possibleMoves.push(
                                `${xCoord};${yCoordAsNumber + i}`
                            );
                    }
                    break;
                case 'lineBackward':
                    for (let i = 1; i <= dimension; i++) {
                        if (
                            (playerDirection === 1 &&
                                xCoordAsNumber - i >= 1) ||
                            (playerDirection === -1 &&
                                xCoordAsNumber + i <= dimension)
                        )
                            possibleMoves.push(
                                `${
                                    xCoordAsNumber - i * playerDirection
                                };${yCoord}`
                            );
                    }
                    break;
                case 'diagForwardRight':
                    for (
                        let i = 1;
                        i <= dimension && i >= 1;
                        i = i + playerDirection
                    ) {
                        if (
                            ((playerDirection === 1 &&
                                xCoordAsNumber + i <= dimension) ||
                                (playerDirection === -1 &&
                                    xCoordAsNumber - i >= 1)) &&
                            yCoordAsNumber + i <= dimension
                        )
                            possibleMoves.push(
                                `${xCoordAsNumber + i * playerDirection};${
                                    yCoordAsNumber + i
                                }`
                            );
                    }
                    break;
                case 'diagBackwardRight':
                    for (
                        let i = 1;
                        i <= dimension && i >= 1;
                        i = i - playerDirection
                    ) {
                        if (
                            ((playerDirection === 1 &&
                                xCoordAsNumber - i >= 1) ||
                                (playerDirection === -1 &&
                                    xCoordAsNumber + i <= dimension)) &&
                            yCoordAsNumber + i <= dimension
                        )
                            possibleMoves.push(
                                `${xCoordAsNumber - i * playerDirection};${
                                    yCoordAsNumber + i
                                }`
                            );
                    }
                    break;
                case 'diagForwardLeft':
                    for (
                        let i = 1;
                        i <= dimension && i >= 1;
                        i = i + playerDirection
                    ) {
                        if (
                            ((playerDirection === 1 &&
                                xCoordAsNumber + i <= dimension) ||
                                (playerDirection === -1 &&
                                    xCoordAsNumber - i >= 1)) &&
                            yCoordAsNumber - i >= 1
                        )
                            possibleMoves.push(
                                `${xCoordAsNumber + i * playerDirection};${
                                    yCoordAsNumber - i
                                }`
                            );
                    }
                    break;
                case 'diagBackwardLeft':
                    for (
                        let i = 1;
                        i <= dimension && i >= 1;
                        i = i + playerDirection
                    ) {
                        if (
                            ((playerDirection === 1 &&
                                xCoordAsNumber - i >= 1) ||
                                (playerDirection === -1 &&
                                    xCoordAsNumber + i <= dimension)) &&
                            yCoordAsNumber - i >= 1
                        )
                            possibleMoves.push(
                                `${xCoordAsNumber - i * playerDirection};${
                                    yCoordAsNumber - i
                                }`
                            );
                    }
                    break;
            }
        }
    });

    return possibleMoves;
}

module.exports = processMoves;
