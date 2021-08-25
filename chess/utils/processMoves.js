// Will be given board dimension, current piece location, and allowed moves array --> returns possible landing tiles.

function processMoves(dimension, currentLocation, mobility) {
    const possibleMoves = [];
    mobility.map(move => {
        if (move.available != 0) {
            const xMove = move.move[0];
            const yMove = move.move[1];
        }
    });
}

module.exports = processMoves;
