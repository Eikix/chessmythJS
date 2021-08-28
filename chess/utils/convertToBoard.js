/* This function is solely aimed at converting a board specification into a board mapping in the form of an object.
example:
    const boardOptions = {
        backline: 'rnjbqkbjnr',
        frontline: 'psppppppsp',
        width: 10,
    };
will turn into a 10x10 board

*/

function convertBoardOptionsToInitialBoard(boardOptions) {
    const board = {};

    const backline = boardOptions?.backline;
    const frontline = boardOptions?.frontline;
    const width = boardOptions?.width;
    const terrain = boardOptions?.terrain || []; // An Array of where terrain is located
    const mana = boardOptions?.mana || []; // An Array of where Mana is located

    // Nomansland assortment //
    for (let x = 1; x <= width; x++) {
        for (let y = 1; y <= width; y++) {
            const coord = `${x};${y}`;
            board[coord] = {
                piece: null,
                terrain: false,
                mana: false,
            };
            if (terrain.includes(coord)) board[coord].terrain = true;
            if (mana.includes(coord)) board[coord].mana = true;
        }
    }

    // Backline Assortment //
    backline.split('');
    for (let i = 1; i <= width; i++) {
        const coordPlayerOne = `1;${i}`;
        const coordPlayerTwo = `${width};${i}`;
        board[coordPlayerOne].piece = backline[i - 1];
        board[coordPlayerTwo].piece = backline[i - 1];
    }

    // Frontline Assortment
    if (frontline === 'p') {
        for (let i = 1; i <= width; i++) {
            const coordPlayerOne = `2;${i}`;
            const coordPlayerTwo = `${width - 1};${i}`;
            board[coordPlayerOne].piece = 'p';
            board[coordPlayerTwo].piece = 'p';
        }
    } else {
        frontlineArray = frontline.split('');
        for (let i = 1; i <= width; i++) {
            const coordPlayerOne = `2;${i}`;
            const coordPlayerTwo = `${width - 1};${i}`;
            board[coordPlayerOne].piece = frontlineArray[i - 1];
            board[coordPlayerTwo].piece = frontlineArray[i - 1];
        }
    }

    return board;
}

module.exports = convertBoardOptionsToInitialBoard;
