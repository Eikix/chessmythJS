export default function checkTargetCoordIsCapturable(targetCoord, board, move, playerColor) {
	const pieceExistsAndIsEnnemy =
		board[targetCoord].piece !== null && board[targetCoord].piece.color !== playerColor;

	const pieceIsEnnemyAndCapturable = pieceExistsAndIsEnnemy && move.canCapture;

	return pieceIsEnnemyAndCapturable;
}
