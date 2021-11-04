export default function generatePaths(startX, startY, xMove, yMove, playerColor) {
	// Constructing the arrays to return XthenY path and YthenX path. This encapsulates the case where the piece does not move in diagonal but rather first on either one of the X and Y axis. For instance, the Knight in standard chess does not move diagonally. It first advances on the Y axis and then moves along the X axis.

	const pathXthenY = [];
	const pathYthenX = [];
	const diagPath = [];

	const DEBUG = false;
	// Save the state inside our function

	let XthenYcurrentX = startX;
	let XthenYcurrentY = startY;

	let YthenXcurrentX = startX;
	let YthenXcurrentY = startY;

	let diagCurrentX = startX;
	let diagCurrentY = startY;

	// Defining player direction with player color:
	const playerDirection = playerColor === 'w' ? 1 : -1;

	// Defining direction of x and y movement.
	const xMoveIsPositive = xMove >= 0 ? 1 : -1;
	const yMoveIsPositive = yMove >= 0 ? 1 : -1;
	const yMoveIsAhead = yMoveIsPositive * playerDirection;

	// First: the x axis movement first, then the y axis movement.
	if (Math.abs(xMove) != Math.abs(yMove)) {
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
	} else {
		for (let x = 1; x <= xMove * xMoveIsPositive; x++) {
			diagCurrentX += 1 * xMoveIsPositive;
			diagCurrentY += 1 * yMoveIsAhead;
			diagPath.push(`${diagCurrentX};${diagCurrentY}`);
		}
		if (DEBUG) console.log(diagPath);
		return diagPath;
	}
}
