/* This function is solely aimed at converting a board specification into a board mapping in the form of an object.
example:
    const boardOptions = {
        backline: 'rnjbqkbjnr',
        frontline: 'psppppppsp',
        width: 10,
    };
will turn into a 10x10 board

*/

function convertStringToBoard(boardOptions, piecesAndMoves) {
	const board = {};
	const wBackline = boardOptions?.w;
	const bBackline = boardOptions?.b;
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
				mana: false
			};
			if (terrain.includes(coord)) board[coord].terrain = true;
			if (mana.includes(coord)) board[coord].mana = true;
		}
	}

	// Backline Assortment //
	wBackline.split('');
	bBackline.split('');
	for (let i = 1; i <= width; i++) {
		const coordPlayerOne = `${i};1`;
		const coordPlayerTwo = `${i};${width}`;
		board[coordPlayerOne].piece = {
			type: wBackline[i - 1],
			color: 'w',
			specialMoveCharges: -1
		};
		board[coordPlayerTwo].piece = {
			type: bBackline[i - 1],
			color: 'b',
			specialMoveCharges: -1
		};
		for (let move of piecesAndMoves[wBackline[i - 1]]) {
			if (move.isSpecialMove) {
				board[coordPlayerOne].piece = {
					type: wBackline[i - 1],
					color: 'w',
					specialMoveCharges: move.available
				};
				break;
			}
		}
		for (let move of piecesAndMoves[bBackline[i - 1]]) {
			if (move.isSpecialMove) {
				board[coordPlayerOne].piece = {
					type: bBackline[i - 1],
					color: 'b',
					specialMoveCharges: move.available
				};
				break;
			}
		}
	}

	// Frontline Assortment
	if (frontline === 'p') {
		for (let i = 1; i <= width; i++) {
			const coordPlayerOne = `${i};2`;
			const coordPlayerTwo = `${i};${width - 1}`;
			board[coordPlayerOne].piece = {
				type: 'p',
				color: 'w',
				specialMoveCharges: 1
			};
			board[coordPlayerTwo].piece = {
				type: 'p',
				color: 'b',
				specialMoveCharges: 1
			};
		}
	} else {
		frontline.split('');
		for (let i = 1; i <= width; i++) {
			const coordPlayerOne = `${i};2`;
			const coordPlayerTwo = `${i};${width - 1}`;
			board[coordPlayerOne].piece = {
				type: frontline[i - 1],
				color: 'w',
				specialMoveCharges: -1
			};
			board[coordPlayerTwo].piece = {
				type: frontline[i - 1],
				color: 'b',
				specialMoveCharges: -1
			};
			for (let move of piecesAndMoves[frontline[i - 1]]) {
				if (move.isSpecialMove) {
					board[coordPlayerOne].piece = {
						type: frontline[i - 1],
						color: 'w',
						specialMoveCharges: move.available
					};
					board[coordPlayerTwo].piece = {
						type: frontline[i - 1],
						color: 'b',
						specialMoveCharges: move.available
					};
					break;
				}
			}
		}
	}

	return board;
}

export default convertStringToBoard;
