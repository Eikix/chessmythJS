function checkTargetCoordIsObstacle(targetCoord, board, move, playerColor) {
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

    return targetLocationIsAnObstacle;
}

module.exports = checkTargetCoordIsObstacle;
