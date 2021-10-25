function isCheck(allPossibleMoves, kingPosition) {
    if (allPossibleMoves.includes(kingPosition)) {
        return true;
    } else {
        return false;
    }
}

module.exports = isCheck;
