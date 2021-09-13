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
                yCoordAsNumber + parseInt(yMove) <= dimension;

            const playerIsWhiteAndMoveIsOnBoardBehind =
                playerDirection === 1 && yCoordAsNumber + parseInt(yMove) >= 1;

            const playerIsWhiteAndMoveIsOnBoardVertically =
                playerIsWhiteAndMoveIsOnBoardAhead &&
                playerIsWhiteAndMoveIsOnBoardBehind;

            const playerIsBlackAndMoveIsOnBoardAhead =
                playerDirection === -1 && yCoordAsNumber - parseInt(yMove) >= 1;

            const playerIsBlackAndMoveIsOnBoardBehind =
                playerDirection === -1 &&
                yCoordAsNumber - parseInt(yMove) <= dimension;

            const playerIsBlackAndMoveIsOnBoardVertically =
                playerIsBlackAndMoveIsOnBoardAhead &&
                playerIsBlackAndMoveIsOnBoardBehind;

            const moveIsOnBoardHorizontally =
                xCoordAsNumber + parseInt(xMove) <= dimension &&
                xCoordAsNumber + parseInt(xMove) >= 1;

            const moveIsValid =
                (playerIsWhiteAndMoveIsOnBoardVertically ||
                    playerIsBlackAndMoveIsOnBoardVertically) &&
                moveIsOnBoardHorizontally;

            const targetCoord = moveIsValid
                ? `${xCoordAsNumber + parseInt(xMove)};${
                      yCoordAsNumber + parseInt(yMove) * playerDirection
                  }`
                : null;

            console.log(targetCoord);
            if (!targetCoord) {
                return;
            } else {
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
                        `${
                            xCoordAsNumber + parseInt(xMove) * playerDirection
                        };${yCoordAsNumber + parseInt(yMove)}`
                    );
                }
            }
        }

        if (move?.available != 0 && typeof move?.move === 'string') {
            switch (move.move) {
                case 'lineForward':
                    for (let i = 1; i <= dimension; i++) {
                        if (
                            (playerDirection === 1 &&
                                yCoordAsNumber + i <= dimension) ||
                            (playerDirection === -1 && yCoordAsNumber - i >= 1)
                        )
                            possibleMoves.push(
                                `${xCoordAsNumber};${
                                    yCoordAsNumber + i * playerDirection
                                }`
                            );
                    }
                    break;
                case 'lineLeft':
                    for (let i = 1; i <= dimension; i++) {
                        if (xCoordAsNumber - i >= 1)
                            possibleMoves.push(
                                `${xCoordAsNumber - i};${yCoordAsNumber}`
                            );
                    }
                    break;
                case 'lineRight':
                    for (let i = 1; i <= dimension; i++) {
                        if (xCoordAsNumber + i <= dimension)
                            possibleMoves.push(
                                `${xCoordAsNumber + i};${yCoordAsNumber}`
                            );
                    }
                    break;
                case 'lineBackward':
                    for (let i = 1; i <= dimension; i++) {
                        if (
                            (playerDirection === 1 &&
                                yCoordAsNumber - i >= 1) ||
                            (playerDirection === -1 &&
                                yCoordAsNumber + i <= dimension)
                        )
                            possibleMoves.push(
                                `${xCoordAsNumber};${
                                    yCoordAsNumber - i * playerDirection
                                }`
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
                                yCoordAsNumber + i <= dimension) ||
                                (playerDirection === -1 &&
                                    yCoordAsNumber - i >= 1)) &&
                            xCoordAsNumber + i <= dimension
                        )
                            possibleMoves.push(
                                `${xCoordAsNumber + i};${
                                    yCoordAsNumber + i * playerDirection
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
                                yCoordAsNumber - i >= 1) ||
                                (playerDirection === -1 &&
                                    yCoordAsNumber + i <= dimension)) &&
                            xCoordAsNumber + i <= dimension
                        )
                            possibleMoves.push(
                                `${xCoordAsNumber + i};${
                                    yCoordAsNumber - i * playerDirection
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
                                yCoordAsNumber + i <= dimension) ||
                                (playerDirection === -1 &&
                                    yCoordAsNumber - i >= 1)) &&
                            xCoordAsNumber - i >= 1
                        )
                            possibleMoves.push(
                                `${xCoordAsNumber - i};${
                                    yCoordAsNumber + i * playerDirection
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
                                yCoordAsNumber - i >= 1) ||
                                (playerDirection === -1 &&
                                    yCoordAsNumber + i <= dimension)) &&
                            xCoordAsNumber - i >= 1
                        )
                            possibleMoves.push(
                                `${xCoordAsNumber - i};${
                                    yCoordAsNumber - i * playerDirection
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
