import { image } from "./wasm_mandelbrot";
import { memory } from "./wasm_mandelbrot_bg"

var canvas = document.getElementById('mandelbrot-canvas');

canvas.height = 600;
canvas.width = 600;

const ctx = canvas.getContext('2d');

const setPtr = image();
const set = new Uint8Array(memory.buffer, setPtr, 360000);

for (var x = 0; x < 600; x++) {
    for (var y = 0; y < 600; y++) {
        var style = 'rgb(' + Math.min(255, Math.floor(255 * set[x * 600 + y] / 20)) + ', 0, 0)';
        ctx.fillStyle = style;
        ctx.fillRect(x, y, 1, 1);
    }
}