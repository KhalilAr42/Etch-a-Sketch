const divCanvas = document.querySelector("#canvas");
const inputGridSize = document.querySelector('input[type="range"]');
const buttonGridSetting = document.querySelector("#gridSetting");
const buttonClearCanvas = document.querySelector("#clearCanvas");
const buttonRandomColor = document.querySelector("#randomColor");
const buttonEraser = document.querySelector("#eraser");
const buttonPixelArt = document.querySelector("#pixelArt");
const inputColor = document.querySelector("#color");
const labelForGridSize = document.querySelector('label[for="gridSize"]');

const CANVAS_AREA = divCanvas.offsetWidth * divCanvas.offsetHeight;

let gridSize = 16;
let numberOfSquares = gridSize * gridSize;
let color = "black";
let isColorRandom = false;
let isMouseDown = false;
let isEraser = false;
let isPixelArt = false;

function getGridSquaresDimension(numberOfSquares) {
    return Math.sqrt(CANVAS_AREA / numberOfSquares);
}

function colorSquares(square, color) {
    if (isColorRandom && !isEraser) {
        var randomColor = Math.floor(Math.random() * 16777215).toString(16);
        square.style.backgroundColor = "#" + randomColor;
    } else if (isEraser) {
        square.style.backgroundColor = "white";
    } else {
        square.style.backgroundColor = color;
    }
}

function generateGrid(numberOfSquares) {
    for (let index = 0; index < numberOfSquares; index++) {
        let dimension = getGridSquaresDimension(numberOfSquares);

        const square = document.createElement("div");

        square.draggable = false;
        square.style.width = dimension.toString() + "px";
        square.style.height = dimension.toString() + "px";
        square.id = "square";

        divCanvas.appendChild(square);

        square.addEventListener("mousedown", (event) => {
            event.preventDefault();
            colorSquares(square, color);
            isMouseDown = true;
        });

        square.addEventListener("mouseup", () => (isMouseDown = false));

        square.addEventListener("mouseover", (event) => {
            if (isMouseDown) {
                colorSquares(square, color);
            } else {
                square.removeEventListener("mouseover", colorSquares);
            }
        });
    }
}

divCanvas.addEventListener("mouseleave", () => {
    const squares = document.querySelectorAll("#square");
    squares.forEach((square) => {
        isMouseDown = false;
    });
});

generateGrid(numberOfSquares);

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

inputGridSize.addEventListener("change", (event) => {
    gridSize = event.target.value;
    numberOfSquares = gridSize * gridSize;
    removeAllChildNodes(divCanvas);
    generateGrid(numberOfSquares);
    buttonGridSetting.textContent = "Show grid";
    buttonGridSetting.value = "OFF";
    buttonGridSetting.classList.remove("active");
    labelForGridSize.textContent =
        "Size of the grid :" + gridSize + "x" + gridSize + "";
});

function toggleOutline() {
    const squares = document.querySelectorAll("#square");
    squares.forEach((square) => {
        square.classList.toggle("square");
    });
}

buttonGridSetting.addEventListener("click", (event) => {
    toggleOutline();
    buttonGridSetting.classList.toggle("active");
    if (buttonGridSetting.value == "OFF") {
        buttonGridSetting.value = "ON";
    } else {
        buttonGridSetting.value = "OFF";
    }
});

buttonClearCanvas.addEventListener("click", () => {
    const squares = document.querySelectorAll("#square");
    squares.forEach((square) => {
        square.style.backgroundColor = "white";
    });
});

buttonRandomColor.addEventListener("click", () => {
    if (isEraser || isPixelArt) {
        buttonRandomColor.removeEventListener("click");
    }
    buttonRandomColor.classList.toggle("active");
    if (buttonRandomColor.value == "OFF") {
        buttonRandomColor.value = "ON";
        isColorRandom = true;
    } else {
        buttonRandomColor.value = "OFF";
        isColorRandom = false;
    }
});

buttonEraser.addEventListener("click", () => {
    if (isColorRandom || isPixelArt) {
        buttonEraser.removeEventListener("click");
    }
    buttonEraser.classList.toggle("active");
    if (buttonEraser.value == "OFF") {
        buttonEraser.value = "ON";
        isEraser = true;
    } else {
        buttonEraser.value = "OFF";
        isEraser = false;
    }
});

function generatePixelArt() {
    const squares = document.querySelectorAll("#square");
    squares.forEach((square) => {
        var randomColor = Math.floor(Math.random() * 16777215).toString(16);
        square.style.backgroundColor = "#" + randomColor;
    });
}

buttonPixelArt.addEventListener("click", () => {
    if (isEraser || isColorRandom) {
        buttonPixelArt.removeEventListener("click");
    }

    buttonPixelArt.classList.toggle("active");
    if (buttonPixelArt.value == "OFF") {
        generatePixelArt();
        buttonPixelArt.value = "ON";
        isPixelArt = true;
    } else {
        const squares = document.querySelectorAll("#square");
        squares.forEach((square) => {
            square.style.backgroundColor = "white";
        });
        buttonPixelArt.value = "OFF";
        isPixelArt = false;
    }
});

inputColor.addEventListener("change", (event) => {
    color = event.target.value;
});
