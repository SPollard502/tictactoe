
const verticalPositions = 'tcb'.split('');
const horizontalPositions = 'lcr'.split('');

const dlist = verticalPositions.map(v => horizontalPositions.map(h => v+h)).flat();

const dmap = {};

const diagonalWinConditions = [
    ['tl', 'cc', 'br'],
    ['bl', 'cc', 'tr']
]
const resultLabels = {
    "X": "Crosses won the round!",
    "O": "Noughts won the round!",
    "DRAW": "It's a draw!"
}