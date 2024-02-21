const divCanvas = document.querySelector("#canvas");
const inputGridSize = document.querySelector('input[type="range"]');

let gridSize = 16;
let numberOfSquares = gridSize * gridSize;

function getCanvasArea() {
    return divCanvas.offsetWidth * divCanvas.offsetHeight;
}

function getGridSquaresDimension(numberOfSquares) {
    return Math.sqrt(getCanvasArea() / numberOfSquares);
}

function generateGrid(numberOfSquares) {
    for (let index = 0; index < numberOfSquares; index++) {
        let dimension = getGridSquaresDimension(numberOfSquares);
        const square = document.createElement("div");
        square.style.width = dimension.toString() + "px";
        square.style.height = dimension.toString() + "px";
        divCanvas.appendChild(square);
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

generateGrid(numberOfSquares);

inputGridSize.addEventListener("change", (event) => {
    gridSize = event.target.value;
    numberOfSquares = gridSize * gridSize;
    removeAllChildNodes(divCanvas);
    generateGrid(numberOfSquares);
});

divCanvas.addEventListener("mousemove", (event) => {
    let target = event.target;
    target.style.backgroundColor = "black";
});
