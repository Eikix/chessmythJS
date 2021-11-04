const piecesToMoves = {
	/* Mobility is an array of objects containing allowed moves: e.g. [
        {
            move: Array || String, example:  [1, 2] // "lineForward" (means all line long) // "diagForwardRight" (means all diag long rightside in front) // [-1, -2] // etc. (diagBackwardLeft, lineBackward) //


            available: String, example: "firstTurn", "always"
            captureMove:  Array || String, example: [1, 1], etc.
        }  
    ] */
	// Mage de Feu - Faction de base
	f: [
		{
			move: [1, 0],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: true
		},
		{
			move: [-1, 0],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: true
		},
		{
			move: [1, -1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: true
		},
		{
			move: [-1, -1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: true
		},
		{
			move: [0, -1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: true
		},
		{
			move: [0, 1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: true
		},
		{
			move: [0, 2],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: true
		},
		{
			move: [-1, 2],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: true
		},
		{
			move: [-2, 2],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: true
		},
		{
			move: [1, 2],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: true
		},
		{
			move: [2, 2],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: true
		}
	],
	// Chariot à Viandes - Mort-Vivants
	v: [
		{
			move: 'lineForward',
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: 'lineLeft',
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: 'lineRight',
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [-1, -1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [1, -1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [2, -2],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [-2, -2],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		}
	],
	// Bélier - Nains
	d: [
		{
			move: [-1, 0],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [1, 0],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [0, -1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: 'lineForward',
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		}
	],
	// Ranger Elfe - Elfes
	e: [
		{
			move: [0, -1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [-1, -1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [-2, -2],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [1, -1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [2, -2],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [1, 0],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [-1, 0],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [0, 1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [-1, 1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [-2, 2],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [-3, 3],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [1, 1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [2, 2],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [3, 3],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		}
	],
	// Matriarche Succube - Démons
	m: [
		{
			move: [0, -1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [-1, -1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [1, -1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [-1, 0],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [-2, 0],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [1, 0],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [2, 0],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [0, 1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [0, 2],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [-1, 1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [-2, 2],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [1, 1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [2, 2],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		}
	],
	// Mage foudre - Anges
	a: [
		{
			move: [0, -1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: true
		},
		{
			move: [-1, -1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: true
		},
		{
			move: [-2, -1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: true
		},
		{
			move: [1, -1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: true
		},
		{
			move: [2, -1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: true
		},
		{
			move: [-1, 1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: true
		},
		{
			move: [-2, 1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: true
		},
		{
			move: [-2, 2],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: true
		},
		{
			move: [-1, 2],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: true
		},
		{
			move: [-3, 3],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: true
		},
		{
			move: [1, 1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: true
		},
		{
			move: [1, 2],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: true
		},
		{
			move: [2, 1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: true
		},
		{
			move: [2, 2],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: true
		},
		{
			move: [3, 3],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: true
		}
	],
	// Démolisseur - Orcs
	o: [
		{
			move: [-1, 0],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [1, 0],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [0, 1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [-1, 1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [-2, 1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [-3, 1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [-4, 1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [1, 1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [2, 1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [3, 1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [4, 1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		}
	],
	// Super pions
	s: [
		{
			move: [0, 3],
			available: 1,
			isSpecialMove: true,
			canCapture: false,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [0, 2],
			available: -1,
			isSpecialMove: false,
			canCapture: false,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [0, 1],
			available: -1,
			isSpecialMove: false,
			canCapture: false,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [1, 1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: true,
			canJumpOver: false
		},
		{
			move: [2, 2],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: true,
			canJumpOver: false
		},
		{
			move: [-1, 1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: true,
			canJumpOver: false
		},
		{
			move: [-2, 2],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: true,
			canJumpOver: false
		}
	],
	p: [
		{
			move: [0, 2],
			available: 1,
			isSpecialMove: true,
			canCapture: false,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [0, 1],
			isSpecialMove: false,
			available: -1,
			canCapture: false,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [1, 1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: true,
			canJumpOver: false
		},
		{
			move: [-1, 1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: true,
			canJumpOver: false
		}
	],
	r: [
		{
			move: 'lineForward',
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: 'lineBackward',
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: 'lineLeft',
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: 'lineRight',
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		}
	],
	n: [
		{
			move: [1, 2],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: true
		},
		{
			move: [-1, 2],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: true
		},
		{
			move: [2, 1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: true
		},
		{
			move: [-2, 1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: true
		},
		{
			move: [-2, -1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: true
		},
		{
			move: [2, -1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: true
		},
		{
			move: [-1, -2],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: true
		},
		{
			move: [1, -2],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: true
		}
	],
	b: [
		{
			move: 'diagForwardRight',
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: 'diagForwardLeft',
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: 'diagBackwardRight',
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: 'diagBackwardLeft',
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		}
	],
	q: [
		{
			move: 'diagForwardRight',
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: 'diagForwardLeft',
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: 'diagBackwardRight',
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: 'diagBackwardLeft',
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: 'lineForward',
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: 'lineBackward',
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: 'lineLeft',
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: 'lineRight',
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		}
	],
	k: [
		{
			move: [1, 0],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [0, 1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [-1, 0],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [0, -1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [-1, -1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [1, -1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [-1, 1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		},
		{
			move: [1, 1],
			available: -1,
			isSpecialMove: false,
			canCapture: true,
			mustCapture: false,
			canJumpOver: false
		}
	]
};

export default piecesToMoves;
