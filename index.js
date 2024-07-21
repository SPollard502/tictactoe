let boxes = {};
let xTurn = false;
let xStart = false;

const scores = {
    "X": 0,
    "O": 0,
    "DRAW": 0
}

function currentTurn(capital) {
    let s = xTurn ? 'x' : 'o';
    return capital ? s.toUpperCase() : s;
}

function setHoverPromptLabels() {
    grid.className = `turn-${currentTurn()}`;
    gridHeader.className = `turn-${currentTurn()}`;

    for (let b of Object.values(boxes)) {
        if (b.state == '') {
            b.setLabel(xTurn ? `x` : `o`);
        }
    }
}

function takeTurn(_xTurn = !xTurn) {
    xTurn = _xTurn

    const draw_score = scores['DRAW']/2;

    xScoreBox.innerText = (scores['X'] + draw_score).toFixed(1);
    oScoreBox.innerText = (scores['O'] + draw_score).toFixed(1);

    if (xTurn) xScoreBox.style.backgroundColor 

    setHoverPromptLabels();
}

function gameOver(winState) {
    setAlert(resultLabels[winState]);
    grid.className += ` turn-freeze`;
    gridHeader.className += ` turn-freeze`;
    if(winState == "DRAW") {
        grid.className += ` turn-draw`;
        gridHeader.className += ` turn-draw`;
    }
    scores[winState]++;
    freeze = true;

    setTimeout(() => {
        init();
        freeze = false;
    }, 3000);
}

function clearRound() {
    for(let b of Object.values(boxes)) {
        b.element.remove();
    }
    boxes = {};
}

function spawnBlocks() {
    for (let bid of dlist) {
        boxes[bid] = new CBox({
            bid,
            boxes,
            _gameOver: gameOver,
            _takeTurn: takeTurn,
            _currentTurn: currentTurn
        });
    }
}

function init() {
    clearRound()

    xStart = !xStart;
    takeTurn(xStart);

    spawnBlocks();

    setHoverPromptLabels();
}

setTimeout(() => {
    init();
    freeze = false;
    unhidePage();
}, 3000);