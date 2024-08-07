// get html's elements
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// constant string
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;
let pencilMode = ""
const DRAW = "draw"

// canvas property
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

function startDraw(event) {
    pencilMode = DRAW;
    if (pencilMode === DRAW) {
        ctx.moveTo(event.offsetX, event.offsetY);
        moveMouse(event);
    }
}

function moveMouse(event) {
    if (pencilMode === DRAW) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        ctx.moveTo(event.offsetX, event.offsetY);
    }
}

function endDraw(event) {
    pencilMode = "";
}

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", moveMouse);
canvas.addEventListener("mouseup", endDraw);