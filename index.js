const width = 10;
const boardOptions = {backline: 'rnjbqkbjnr', frontline:'psppppppsp', width:width}

const Chess = require("./chess/Chess");

const chess = new Chess(boardOptions);

console.log(chess.getBoard());