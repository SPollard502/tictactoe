let freeze = true;

const grid = document.getElementById('grid');
const gridHeader = document.getElementById('grid-header');
const xScoreBox = document.getElementById('X-score-box');
const oScoreBox = document.getElementById('O-score-box');
const alertElement = document.getElementsByClassName('alert')[0];
const wrapper = document.getElementById('wrapper');

function unhidePage() {
    wrapper.className = '';
}

function setAlert(content) {
    alertElement.innerHTML = content;
}

function clearBlocks() {
    for (let child of [...grid.children]) {
        if(child.className.includes('box')) {
            child.remove();
        }
    }
}

function addBlock(e) {
    grid.appendChild(e);
}

function registerBlockClickEvent(b) {
    b.element.addEventListener('click', () => freeze ? null : b.onclick())
}

function createBlockElement(bid) {
    const [v, h] = bid.split('');

    const className = `box box-v-${v} box-h-${h}`;

    const e = document.createElement('div');
    e.className = className;
    e.dataset.state = ""

    return e;
}