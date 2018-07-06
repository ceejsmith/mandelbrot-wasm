import { Image } from "./wasm_mandelbrot";
import { memory } from "./wasm_mandelbrot_bg"

var canvas = document.getElementById('mandelbrot-canvas');

const width = 600;
const height = 600;

canvas.height = width;
canvas.width = height;

const ctx = canvas.getContext('2d');

const image = Image.new(width, height);

const setPtr = image.calculate(-2.1, 0.6, -1.2, 1.2);
const set = new Uint8Array(memory.buffer, setPtr, width * height);

for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
        var style = 'rgb(' + Math.min(255, Math.floor(255 * set[x * width + y] / 20)) + ', 0, 0)';
        ctx.fillStyle = style;
        ctx.fillRect(x, y, 1, 1);
    }
}