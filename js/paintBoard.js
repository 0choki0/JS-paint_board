// get html's elements
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const color = document.querySelector("input#color");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const eraser = document.querySelector("img#eraser");
let lineWidth = document.querySelector("#line-width");
const clear = document.querySelector("#clear");
const saveImg = document.querySelector("#saveImg");
const loadImg = document.querySelector("#loadImg");

// constant string
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

// canvas property
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
let isPainting = false;


// move pos to downed
function startPainting(event) {
    isPainting = true;
    ctx.moveTo(event.offsetX, event.offsetY);
}

// move mouse
function onMove(event) {
    if (isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
    }
    ctx.moveTo(event.offsetX, event.offsetY);
}

// painting end
function endPainting(event) {
    isPainting = false;
    clicking = false;
    ctx.beginPath();
}

// color change
function colorChange(event) {
    const color = event.target.value;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

// color list click
function colorClick(event) {
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}

// 지우개 활성화
function eraserMode(event) {
    event.target.value = "#FFFFFF";
    colorChange(event)
}

// clear board
function clearBoard() {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.beginPath();
}

// change line width
function lineWidthChange(event) {
    lineWidth.value = event.target.value;
    ctx.lineWidth = lineWidth.value;
}

// save image
function saveImage(event) {
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "drawing.png";
    a.click();
}

// load image
function loadImage(event) {
    let file = document.querySelector("input#loadfile");
    file.click();
    file.addEventListener("change", changeImage);
}

// change image
function changeImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (temp) => {
        const img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        };
        img.src = temp.target.result;
    };
}


canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mouseup", endPainting);
canvas.addEventListener("mouseleave", endPainting);
color.addEventListener("change", colorChange);
eraser.addEventListener("click", eraserMode);
colorOptions.forEach((color) => color.addEventListener("click", colorClick));
lineWidth.addEventListener("change", lineWidthChange);
clear.addEventListener("click", clearBoard);
saveImg.addEventListener("click", saveImage);
loadImg.addEventListener("click", loadImage);

// 저장, 불러오기

