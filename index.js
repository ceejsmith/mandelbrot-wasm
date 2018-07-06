import { iterations } from "./wasm_mandelbrot";

var canvas = document.getElementById('mandelbrot-canvas');

canvas.height = 600;
canvas.width = 600;

const ctx = canvas.getContext('2d');

for (var x = 0; x < 600; x++) {
    for (var y = 0; y < 600; y++) {
        var iters = iterations((x - 300) / 150, (y - 300) / 150);
        var style = 'rgb(' + Math.min(255, Math.floor(255 * iters / 20)) + ', 0, 0)';
        ctx.fillStyle = style;
        ctx.fillRect(x, y, 1, 1);
    }
}