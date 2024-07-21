class CBox {
    horizontal;
    vertical;
    element;
    winConditions;
    boxes;
    state = "";
    _takeTurn;
    _gameOver;
    _currentTurn;

    constructor({
        bid,
        boxes,
        _takeTurn,
        _gameOver,
        _currentTurn
    }) {
        this.bid = bid;
        this.boxes = boxes;
        this._takeTurn = _takeTurn;
        this._gameOver = _gameOver;
        this._currentTurn = _currentTurn;

        [this.vertical, this.horizontal] = bid.split('');

        this.setWinConditions();

        this.createElement();
    }

    createElement() {
        this.element = createBlockElement(this.bid);
        this.setLabel(this._currentTurn());
        registerBlockClickEvent(this);

        addBlock(this.element);
    }

    setLabel(l) {
        this.element.innerText = l;
    }

    onclick() {
        if (this.state != "") return;

        this.state = this._currentTurn(true);
        this.element.dataset.state = this.state;
        this.element.innerText = this.state.toLowerCase();

        if (!this.evaluateResult()) this._takeTurn();
    }

    setWinConditions() {
        this.winConditions = [
            verticalPositions.map(v => v + this.horizontal),
            horizontalPositions.map(h => this.vertical + h),
            ...diagonalWinConditions.filter(wc => wc.includes(this.bid))
        ]
    }

    evaluateResult() {
        const isWin = this.winConditions.map(
            wc => wc.map(
                cid => this.boxes[cid].state
            )
        ).filter(
            wc => wc.every(c => c == 'X') || wc.every(c => c == 'O')
        ).map(
            r => r[0][0]
        )[0] || '';

        if (isWin) {
            this._gameOver(isWin);
            return true;
        }
        
        const isDraw = Object.values(this.boxes).map(b => b.state).filter(s => s).length == 9;

        if (isDraw) {
            this._gameOver("DRAW");
            return true;
        }

        return '';
    }
}