const divCanvas = document.querySelector("#canvas");
const inputGridSize = document.querySelector('input[type="range"]');
const buttonGridSetting = document.querySelector("#gridSetting");
const buttonClearCanvas = document.querySelector("#clearCanvas");

let gridSize = 16;
let numberOfSquares = gridSize * gridSize;
let color = "black";

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
        square.id = "square";
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

function colorSquare(square, color) {
    square.style.backgroundColor = color;
}

divCanvas.addEventListener("mousedown", (event) => {
    event.preventDefault();
    let target = event.target;
    colorSquare(target, color);
    divCanvas.addEventListener("mousemove", (event) =>
        mouseMoveHandler(event, color)
    );
    divCanvas.addEventListener("mouseup", function () {
        divCanvas.removeEventListener("mousemove", mouseMoveHandler);
    });
});

function mouseMoveHandler(event, color) {
    if (event.buttons === 1) {
        event.target.style.backgroundColor = color;
    }
}

inputGridSize.addEventListener("change", (event) => {
    gridSize = event.target.value;
    numberOfSquares = gridSize * gridSize;
    removeAllChildNodes(divCanvas);
    generateGrid(numberOfSquares);
    buttonGridSetting.textContent = "Show grid";
    buttonGridSetting.value = "OFF";
});

function toggleOutline() {
    const squares = document.querySelectorAll("#square");
    squares.forEach((square) => {
        square.classList.toggle("square");
    });
}

buttonGridSetting.addEventListener("click", (event) => {
    toggleOutline();
    if (buttonGridSetting.value == "OFF") {
        buttonGridSetting.textContent = "Remove grid";
        buttonGridSetting.value = "ON";
    } else {
        buttonGridSetting.textContent = "Show grid";
        buttonGridSetting.value = "OFF";
    }
});

buttonClearCanvas.addEventListener("click", () => {
    const squares = document.querySelectorAll("#square");
    squares.forEach((square) => {
        square.style.backgroundColor = "white";
    });
});
