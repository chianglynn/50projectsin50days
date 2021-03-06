// Canvas API: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
// Drawing shapes with canvas: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const sizeEL = document.getElementById('size');
const colorEl = document.getElementById('color');
const clearEl = document.getElementById('clear');

let size = 10;
let color = colorEl.value;
let x;
let y;
let isPressed = false;

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
}

function updateSizeOnScreen() {
    sizeEL.innerText = size;
}

canvas.addEventListener('mousedown', (e) => {
    isPressed = true;
    [x, y] = [e.offsetX, e.offsetY];
})

canvas.addEventListener('mouseup', (e) => {
    isPressed = false;
    x = y = undefined;
})

canvas.addEventListener('mousemove', (e) => {
    if (isPressed) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;
        drawCircle(x2, y2);
        drawLine(x, y, x2, y2);
        [x, y] = [x2, y2];
    }
});

colorEl.addEventListener('change', (e) => color = e.target.value);
increaseBtn.addEventListener('click', () => {
    size >= 50 ? size = 50 : size += 5;
    updateSizeOnScreen();
});
decreaseBtn.addEventListener('click', () => {
    size <= 5 ? size = 5 : size -= 5;
    updateSizeOnScreen();
});
clearEl.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height));