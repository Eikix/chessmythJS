// Will be given board dimension, current piece location, and allowed moves array --> returns possible landing tiles.
// Note that currentLoc should be expressed as follows: xNumber;yNumber

const generatePaths = require('./generatePaths');

function processMoves(
    dimension,
    currentLocation,
    mobility,
    playerColor,
    board
) {
    // Checks if player is white, i.e. pieces advancing from 1 to 10, or black, going from 10 to 1.
    const playerDirection = playerColor === 'w' ? 1 : -1;
    const possibleMoves = [];
    // A regex to capture coordinates in the shape: X;Y.
    const reg = /[0-9]+/g;
    const [xCoord, yCoord] = currentLocation.match(reg);
    const xCoordAsNumber = parseInt(xCoord);
    const yCoordAsNumber = parseInt(yCoord);

    mobility.map(move => {
        if (Array.isArray(move?.move)) {
            if (
                move.isSpecialMove &&
                board[currentLocation].piece.specialMoveCharges === 0
            ) {
                return;
            }
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

            if (!targetCoord) {
                return;
            } else {
                const [pathXthenY, pathYthenX] = generatePaths(
                    xCoordAsNumber,
                    yCoordAsNumber,
                    xMove,
                    yMove
                );

                console.log(pathXthenY, pathYthenX);

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

                const flag =
                    pieceExistsAndIsEnnemy && move.canCapture
                        ? 'capture'
                        : 'move';

                if (
                    (playerIsWhiteAndMoveIsOnBoardVertically ||
                        playerIsBlackAndMoveIsOnBoardVertically) &&
                    moveIsOnBoardHorizontally &&
                    !targetLocationIsAnObstacle
                ) {
                    possibleMoves.push({
                        move: `${xCoordAsNumber + parseInt(xMove)};${
                            yCoordAsNumber + parseInt(yMove) * playerDirection
                        }`,
                        flag: flag,
                        isSpecialMove: move.isSpecialMove,
                    });
                }
            }
        }

        if (typeof move?.move === 'string') {
            if (
                move.isSpecialMove &&
                board[currentLocation].piece.specialMoveCharges === 0
            ) {
                return;
            }
            switch (move.move) {
                case 'lineForward':
                    for (let i = 1; i <= dimension; i++) {
                        if (
                            (playerDirection === 1 &&
                                yCoordAsNumber + i <= dimension) ||
                            (playerDirection === -1 && yCoordAsNumber - i >= 1)
                        ) {
                            const targetCoord = `${xCoordAsNumber};${
                                yCoordAsNumber + i * playerDirection
                            }`;
                            const pieceExistsAndIsAllied =
                                board[targetCoord].piece !== null &&
                                board[targetCoord].piece.color === playerColor;

                            const pieceExistsAndIsEnnemy =
                                board[targetCoord].piece !== null &&
                                board[targetCoord].piece.color !== playerColor;

                            const terrainExistsAtLocation =
                                board[targetCoord].terrain;

                            const pieceIsNullButMustCapture =
                                board[targetCoord].piece === null &&
                                move.mustCapture;

                            const targetLocationIsAnObstacle =
                                pieceExistsAndIsAllied ||
                                (pieceExistsAndIsEnnemy && !move.canCapture) ||
                                terrainExistsAtLocation ||
                                pieceIsNullButMustCapture;

                            const flag =
                                pieceExistsAndIsEnnemy && move.canCapture
                                    ? 'capture'
                                    : 'move';

                            if (!targetLocationIsAnObstacle) {
                                possibleMoves.push({
                                    move: `${xCoordAsNumber};${
                                        yCoordAsNumber + i * playerDirection
                                    }`,
                                    flag: flag,
                                    isSpecialMove: move.isSpecialMove,
                                });
                                if (
                                    pieceExistsAndIsEnnemy &&
                                    move.canCapture &&
                                    !move.canJumpOver
                                )
                                    break;
                            } else {
                                break;
                            }
                        }
                    }
                    break;
                case 'lineLeft':
                    for (let i = 1; i <= dimension; i++) {
                        if (xCoordAsNumber - i >= 1) {
                            const targetCoord = `${
                                xCoordAsNumber - i
                            };${yCoordAsNumber}`;
                            const pieceExistsAndIsAllied =
                                board[targetCoord].piece !== null &&
                                board[targetCoord].piece.color === playerColor;

                            const pieceExistsAndIsEnnemy =
                                board[targetCoord].piece !== null &&
                                board[targetCoord].piece.color !== playerColor;

                            const terrainExistsAtLocation =
                                board[targetCoord].terrain;

                            const pieceIsNullButMustCapture =
                                board[targetCoord].piece === null &&
                                move.mustCapture;

                            const targetLocationIsAnObstacle =
                                pieceExistsAndIsAllied ||
                                (pieceExistsAndIsEnnemy && !move.canCapture) ||
                                terrainExistsAtLocation ||
                                pieceIsNullButMustCapture;

                            const flag =
                                pieceExistsAndIsEnnemy && move.canCapture
                                    ? 'capture'
                                    : 'move';

                            if (!targetLocationIsAnObstacle) {
                                possibleMoves.push({
                                    move: `${
                                        xCoordAsNumber - i
                                    };${yCoordAsNumber}`,
                                    flag: flag,
                                    isSpecialMove: move.isSpecialMove,
                                });
                                if (pieceExistsAndIsEnnemy && move.canCapture)
                                    break;
                            } else {
                                break;
                            }
                        }
                    }
                    break;
                case 'lineRight':
                    for (let i = 1; i <= dimension; i++) {
                        if (xCoordAsNumber + i <= dimension) {
                            const targetCoord = `${
                                xCoordAsNumber + i
                            };${yCoordAsNumber}`;
                            const pieceExistsAndIsAllied =
                                board[targetCoord].piece !== null &&
                                board[targetCoord].piece.color === playerColor;

                            const pieceExistsAndIsEnnemy =
                                board[targetCoord].piece !== null &&
                                board[targetCoord].piece.color !== playerColor;

                            const terrainExistsAtLocation =
                                board[targetCoord].terrain;

                            const pieceIsNullButMustCapture =
                                board[targetCoord].piece === null &&
                                move.mustCapture;

                            const targetLocationIsAnObstacle =
                                pieceExistsAndIsAllied ||
                                (pieceExistsAndIsEnnemy && !move.canCapture) ||
                                terrainExistsAtLocation ||
                                pieceIsNullButMustCapture;

                            const flag =
                                pieceExistsAndIsEnnemy && move.canCapture
                                    ? 'capture'
                                    : 'move';

                            if (!targetLocationIsAnObstacle) {
                                possibleMoves.push({
                                    move: `${
                                        xCoordAsNumber + i
                                    };${yCoordAsNumber}`,
                                    flag: flag,
                                    isSpecialMove: move.isSpecialMove,
                                });
                                if (pieceExistsAndIsEnnemy && move.canCapture)
                                    break;
                            } else {
                                break;
                            }
                        }
                    }
                    break;
                case 'lineBackward':
                    for (let i = 1; i <= dimension; i++) {
                        if (
                            (playerDirection === 1 &&
                                yCoordAsNumber - i >= 1) ||
                            (playerDirection === -1 &&
                                yCoordAsNumber + i <= dimension)
                        ) {
                            const targetCoord = `${xCoordAsNumber};${
                                yCoordAsNumber - i * playerDirection
                            }`;
                            const pieceExistsAndIsAllied =
                                board[targetCoord].piece !== null &&
                                board[targetCoord].piece.color === playerColor;

                            const pieceExistsAndIsEnnemy =
                                board[targetCoord].piece !== null &&
                                board[targetCoord].piece.color !== playerColor;

                            const terrainExistsAtLocation =
                                board[targetCoord].terrain;

                            const pieceIsNullButMustCapture =
                                board[targetCoord].piece === null &&
                                move.mustCapture;

                            const targetLocationIsAnObstacle =
                                pieceExistsAndIsAllied ||
                                (pieceExistsAndIsEnnemy && !move.canCapture) ||
                                terrainExistsAtLocation ||
                                pieceIsNullButMustCapture;

                            const flag =
                                pieceExistsAndIsEnnemy && move.canCapture
                                    ? 'capture'
                                    : 'move';

                            if (!targetLocationIsAnObstacle) {
                                possibleMoves.push({
                                    move: `${xCoordAsNumber};${
                                        yCoordAsNumber - i * playerDirection
                                    }`,
                                    flag: flag,
                                    isSpecialMove: move.isSpecialMove,
                                });
                                if (pieceExistsAndIsEnnemy && move.canCapture)
                                    break;
                            } else {
                                break;
                            }
                        }
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
                        ) {
                            const targetCoord = `${xCoordAsNumber + i};${
                                yCoordAsNumber + i * playerDirection
                            }`;
                            const pieceExistsAndIsAllied =
                                board[targetCoord].piece !== null &&
                                board[targetCoord].piece.color === playerColor;

                            const pieceExistsAndIsEnnemy =
                                board[targetCoord].piece !== null &&
                                board[targetCoord].piece.color !== playerColor;

                            const terrainExistsAtLocation =
                                board[targetCoord].terrain;

                            const pieceIsNullButMustCapture =
                                board[targetCoord].piece === null &&
                                move.mustCapture;

                            const targetLocationIsAnObstacle =
                                pieceExistsAndIsAllied ||
                                (pieceExistsAndIsEnnemy && !move.canCapture) ||
                                terrainExistsAtLocation ||
                                pieceIsNullButMustCapture;

                            const flag =
                                pieceExistsAndIsEnnemy && move.canCapture
                                    ? 'capture'
                                    : 'move';

                            if (!targetLocationIsAnObstacle) {
                                possibleMoves.push({
                                    move: `${xCoordAsNumber + i};${
                                        yCoordAsNumber + i * playerDirection
                                    }`,
                                    flag: flag,
                                    isSpecialMove: move.isSpecialMove,
                                });
                                if (pieceExistsAndIsEnnemy && move.canCapture)
                                    break;
                            } else {
                                break;
                            }
                        }
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
                        ) {
                            const targetCoord = `${xCoordAsNumber + i};${
                                yCoordAsNumber - i * playerDirection
                            }`;
                            const pieceExistsAndIsAllied =
                                board[targetCoord].piece !== null &&
                                board[targetCoord].piece.color === playerColor;

                            const pieceExistsAndIsEnnemy =
                                board[targetCoord].piece !== null &&
                                board[targetCoord].piece.color !== playerColor;

                            const terrainExistsAtLocation =
                                board[targetCoord].terrain;

                            const pieceIsNullButMustCapture =
                                board[targetCoord].piece === null &&
                                move.mustCapture;

                            const targetLocationIsAnObstacle =
                                pieceExistsAndIsAllied ||
                                (pieceExistsAndIsEnnemy && !move.canCapture) ||
                                terrainExistsAtLocation ||
                                pieceIsNullButMustCapture;

                            const flag =
                                pieceExistsAndIsEnnemy && move.canCapture
                                    ? 'capture'
                                    : 'move';

                            if (!targetLocationIsAnObstacle) {
                                possibleMoves.push({
                                    move: `${xCoordAsNumber + i};${
                                        yCoordAsNumber - i * playerDirection
                                    }`,
                                    flag: flag,
                                    isSpecialMove: move.isSpecialMove,
                                });
                                if (pieceExistsAndIsEnnemy && move.canCapture)
                                    break;
                            } else {
                                break;
                            }
                        }
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
                        ) {
                            const targetCoord = `${xCoordAsNumber - i};${
                                yCoordAsNumber + i * playerDirection
                            }`;
                            const pieceExistsAndIsAllied =
                                board[targetCoord].piece !== null &&
                                board[targetCoord].piece.color === playerColor;

                            const pieceExistsAndIsEnnemy =
                                board[targetCoord].piece !== null &&
                                board[targetCoord].piece.color !== playerColor;

                            const terrainExistsAtLocation =
                                board[targetCoord].terrain;

                            const pieceIsNullButMustCapture =
                                board[targetCoord].piece === null &&
                                move.mustCapture;

                            const targetLocationIsAnObstacle =
                                pieceExistsAndIsAllied ||
                                (pieceExistsAndIsEnnemy && !move.canCapture) ||
                                terrainExistsAtLocation ||
                                pieceIsNullButMustCapture;

                            const flag =
                                pieceExistsAndIsEnnemy && move.canCapture
                                    ? 'capture'
                                    : 'move';

                            if (!targetLocationIsAnObstacle) {
                                possibleMoves.push({
                                    move: `${xCoordAsNumber - i};${
                                        yCoordAsNumber + i * playerDirection
                                    }`,
                                    flag: flag,
                                    isSpecialMove: move.isSpecialMove,
                                });
                                if (pieceExistsAndIsEnnemy && move.canCapture)
                                    break;
                            } else {
                                break;
                            }
                        }
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
                        ) {
                            const targetCoord = `${xCoordAsNumber - i};${
                                yCoordAsNumber - i * playerDirection
                            }`;
                            const pieceExistsAndIsAllied =
                                board[targetCoord].piece !== null &&
                                board[targetCoord].piece.color === playerColor;

                            const pieceExistsAndIsEnnemy =
                                board[targetCoord].piece !== null &&
                                board[targetCoord].piece.color !== playerColor;

                            const terrainExistsAtLocation =
                                board[targetCoord].terrain;

                            const pieceIsNullButMustCapture =
                                board[targetCoord].piece === null &&
                                move.mustCapture;

                            const targetLocationIsAnObstacle =
                                pieceExistsAndIsAllied ||
                                (pieceExistsAndIsEnnemy && !move.canCapture) ||
                                terrainExistsAtLocation ||
                                pieceIsNullButMustCapture;

                            const flag =
                                pieceExistsAndIsEnnemy && move.canCapture
                                    ? 'capture'
                                    : 'move';

                            if (!targetLocationIsAnObstacle) {
                                possibleMoves.push({
                                    move: `${xCoordAsNumber - i};${
                                        yCoordAsNumber - i * playerDirection
                                    }`,
                                    flag: flag,
                                    isSpecialMove: move.isSpecialMove,
                                });
                                if (pieceExistsAndIsEnnemy && move.canCapture)
                                    break;
                            } else {
                                break;
                            }
                        }
                    }
                    break;
            }
        }
    });

    return possibleMoves;
}

module.exports = processMoves;
