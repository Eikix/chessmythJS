module.exports = {
    /* Mobility is an array of objects containing allowed moves: e.g. [
        {
            move: Array || String, example:  [1, 2] // "lineForward" (means all line long) // "diagForwardRight" (means all diag long rightside in front) // [-1, -2] // etc. (diagBackwardLeft, lineBackward) //


            available: String, example: "firstTurn", "always"
            captureMove:  Array || String, example: [1, 1], etc.
        }  
    ] */
    p: [
        {
            move: [2, 0],
            available: 1,
            canCapture: false,
            mustCapture: false,
        },
        {
            move: [1, 0],
            available: -1,
            canCapture: false,
            mustCapture: false,
        },
        {
            move: [1, 1],
            available: -1,
            canCapture: true,
            mustCapture: true,
        },
    ],
    r: [
        {
            move: 'lineForward',
            available: -1,
            canCapture: true,
            mustCapture: false,
        },
        {
            move: 'lineBackward',
            available: -1,
            canCapture: true,
            mustCapture: false,
        },
    ],
    n: [
        {
            move: [2, 1],
            available: -1,
            canCapture: true,
            mustCapture: false,
        },
        {
            move: [1, 2],
            available: -1,
            canCapture: true,
            mustCapture: false,
        },
        {
            move: [-1, -2],
            available: -1,
            canCapture: true,
            mustCapture: false,
        },
        {
            move: [-2, -1],
            available: -1,
            canCapture: true,
            mustCapture: false,
        },
    ],
    b: [
        {
            move: 'diagForwardRight',
            available: -1,
            canCapture: true,
            mustCapture: false,
        },
        {
            move: 'diagForwardLeft',
            available: -1,
            canCapture: true,
            mustCapture: false,
        },
        {
            move: 'diagBackwardRight',
            available: -1,
            canCapture: true,
            mustCapture: false,
        },
        {
            move: 'diagBackwardLeft',
            available: -1,
            canCapture: true,
            mustCapture: false,
        },
    ],
    q: [
        {
            move: 'diagForwardRight',
            available: -1,
            canCapture: true,
            mustCapture: false,
        },
        {
            move: 'diagForwardLeft',
            available: -1,
            canCapture: true,
            mustCapture: false,
        },
        {
            move: 'diagBackwardRight',
            available: -1,
            canCapture: true,
            mustCapture: false,
        },
        {
            move: 'diagBackwardLeft',
            available: -1,
            canCapture: true,
            mustCapture: false,
        },
        {
            move: 'lineForward',
            available: -1,
            canCapture: true,
            mustCapture: false,
        },
        {
            move: 'lineBackward',
            available: -1,
            canCapture: true,
            mustCapture: false,
        },
    ],
    k: [
        {
            move: [1, 0],
            available: -1,
            canCapture: true,
            mustCapture: false,
        },
        {
            move: [0, 1],
            available: -1,
            canCapture: true,
            mustCapture: false,
        },
        {
            move: [-1, 0],
            available: -1,
            canCapture: true,
            mustCapture: false,
        },
        {
            move: [0, -1],
            available: -1,
            canCapture: true,
            mustCapture: false,
        },
    ],
};
