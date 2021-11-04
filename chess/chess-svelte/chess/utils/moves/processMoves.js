// Will be given board dimension, current piece location, and allowed moves array --> returns possible landing tiles.
// Note that currentLoc should be expressed as follows: xNumber;yNumber

import checkTargetCoordIsCapturable from '../helpers/checkTargetCoordIsCapturable';
import checkTargetCoordIsObstacle from '../helpers/checkTargetCoordIsObstacle';
import generatePaths from '../helpers/generatePaths';
const DEBUG = false;

export default function processMoves(
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
            // This checks if the piece's movement is on board.
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

            // If the move isn't valid, targetCoord (the wanted coord to land on) is given the value null.
            // This if statements allows for exiting the current context of .map() and go to the next movement.
            if (!targetCoord) {
                return;
            } else {
                // This is made to spot obstacles on the way. Since any [X, Y] movement has two possible ways of occurring (it has more but we don't account for them)
                // Path X then Y means the piece moves along the X axis then the Y axis and vice versa for Path Y then X.
                if (Math.abs(xMove) != Math.abs(yMove)) {
                    const [pathXthenY, pathYthenX] = generatePaths(
                        xCoordAsNumber,
                        yCoordAsNumber,
                        xMove,
                        yMove,
                        playerColor
                    );

                    if (DEBUG) console.log(pathXthenY, pathYthenX);
                    const obstacleOnPathXthenY = [];
                    const obstacleOnPathYthenX = [];

                    for (let coordXthenY of pathXthenY) {
                        obstacleOnPathXthenY.push(
                            checkTargetCoordIsObstacle(
                                coordXthenY,
                                board,
                                move,
                                playerColor
                            )
                        );
                    }

                    for (let coordYthenX of pathYthenX) {
                        obstacleOnPathYthenX.push(
                            checkTargetCoordIsObstacle(
                                coordYthenX,
                                board,
                                move,
                                playerColor
                            )
                        );
                    }
                    if (DEBUG)
                        console.log(obstacleOnPathXthenY, obstacleOnPathYthenX);

                    // This if statement is made to check if there are obstacles on both paths.
                    // That means our piece cannot dodge them unless it can jump over (move.canJumpOver property).

                    if (
                        obstacleOnPathYthenX.includes(true) &&
                        obstacleOnPathXthenY.includes(true) &&
                        !move.canJumpOver
                    ) {
                        return;
                    }
                }
                if (Math.abs(xMove) === Math.abs(yMove)) {
                    const diagPath = generatePaths(
                        xCoordAsNumber,
                        yCoordAsNumber,
                        xMove,
                        yMove,
                        playerColor
                    );

                    if (DEBUG) console.log(pathXthenY, pathYthenX);
                    const obstacleOnPathDiag = [];

                    for (let tile of diagPath) {
                        obstacleOnPathDiag.push(
                            checkTargetCoordIsObstacle(
                                tile,
                                board,
                                move,
                                playerColor
                            )
                        );
                    }
                    if (DEBUG)
                        console.log(obstacleOnPathXthenY, obstacleOnPathYthenX);

                    // This if statement is made to check if there are obstacles on both paths.
                    // That means our piece cannot dodge them unless it can jump over (move.canJumpOver property).

                    if (
                        obstacleOnPathDiag.includes(true) &&
                        !move.canJumpOver
                    ) {
                        return;
                    }
                }

                const capturableEnnemyOnTargetCoord =
                    checkTargetCoordIsCapturable(
                        targetCoord,
                        board,
                        move,
                        playerColor
                    );
                const flag = capturableEnnemyOnTargetCoord ? 'capture' : 'move';

                // Even if the piece can jump over, we still need to check if target coord is itself an obstacle.
                const targetCoordIsAnObstacle = checkTargetCoordIsObstacle(
                    targetCoord,
                    board,
                    move,
                    playerColor,
                    false
                );
                if (!targetCoordIsAnObstacle) {
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
                    for (let i = 1; i <= dimension && i >= 1; i++) {
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
                    for (let i = 1; i <= dimension && i >= 1; i++) {
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
                    for (let i = 1; i <= dimension && i >= 1; i++) {
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
                    for (let i = 1; i <= dimension && i >= 1; i++) {
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

