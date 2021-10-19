function checkTargetCoordIsObstacle(
    targetCoord,
    board,
    move,
    playerColor,
    ignoreMustCapture = true
) {
    const pieceExistsAndIsAllied =
        board[targetCoord].piece !== null &&
        board[targetCoord].piece.color === playerColor;

    const pieceExistsAndIsEnnemy =
        board[targetCoord].piece !== null &&
        board[targetCoord].piece.color !== playerColor;

    const terrainExistsAtLocation = board[targetCoord].terrain;

    let pieceIsNullButMustCapture = false;
    if (!ignoreMustCapture)
        pieceIsNullButMustCapture =
            board[targetCoord].piece === null && move.mustCapture;

    const targetLocationIsAnObstacle =
        pieceExistsAndIsAllied ||
        (pieceExistsAndIsEnnemy && !move.canCapture) ||
        terrainExistsAtLocation ||
        pieceIsNullButMustCapture;

    return targetLocationIsAnObstacle;
}

module.exports = checkTargetCoordIsObstacle;
