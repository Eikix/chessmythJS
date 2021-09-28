function generatePaths(startX, startY, xMove, yMove, playerColor) {
    // Constructing the arrays to return XthenY path and YthenX path.

    const pathXthenY = [];
    const pathYthenX = [];

    // Save the state inside our function

    let XthenYcurrentX = startX;
    let XthenYcurrentY = startY;

    let YthenXcurrentX = startX;
    let YthenXcurrentY = startY;

    // Defining player direction with player color:
    const playerDirection = playerColor === 'w' ? 1 : -1;

    // Defining direction of x and y movement.
    const xMoveIsPositive = xMove >= 0 ? 1 : -1;
    const yMoveIsPositive = yMove >= 0 ? 1 : -1;
    const yMoveIsAhead = yMoveIsPositive * playerDirection;

    // First: the x axis movement first, then the y axis movement.

    for (let x = 1; x <= xMove * xMoveIsPositive; x++) {
        XthenYcurrentX += 1 * xMoveIsPositive;
        pathXthenY.push(`${XthenYcurrentX};${XthenYcurrentY}`);
    }
    for (let y = 1; y <= yMove * yMoveIsPositive; y++) {
        XthenYcurrentY += 1 * yMoveIsAhead;
        pathXthenY.push(`${XthenYcurrentX};${XthenYcurrentY}`);
    }

    // Second: the y axis movement first, then the x axis movement.

    for (let y = 1; y <= yMove * yMoveIsPositive; y++) {
        YthenXcurrentY += 1 * yMoveIsAhead;
        pathYthenX.push(`${YthenXcurrentX};${YthenXcurrentY}`);
    }

    for (let x = 1; x <= xMove * xMoveIsPositive; x++) {
        YthenXcurrentX += 1 * xMoveIsPositive;
        pathYthenX.push(`${YthenXcurrentX};${YthenXcurrentY}`);
    }

    return [pathXthenY, pathYthenX];
}

module.exports = generatePaths;
