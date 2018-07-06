import { Image, Complex } from "./wasm_mandelbrot";
import { memory } from "./wasm_mandelbrot_bg"

var canvas = document.getElementById('mandelbrot-canvas');

const width = 600;
const height = 600;

canvas.height = width;
canvas.width = height;

const ctx = canvas.getContext('2d');

const image = Image.new(width, height);

const render = (re_min, re_max, im_min, im_max) => {
    console.log("Rendering (" + re_min.toFixed(3) + ", " + im_min.toFixed(3) + ") to (" + re_max.toFixed(3) + ", " + im_max.toFixed(3) + ")");

    const setPtr = image.calculate(re_min, re_max, im_min, im_max);
    const set = new Uint8Array(memory.buffer, setPtr, width * height);

    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var style = 'rgb(' + Math.min(255, Math.floor(255 * set[x * width + y] / 20)) + ', 0, 0)';
            ctx.fillStyle = style;
            ctx.fillRect(x, y, 1, 1);
        }
    }
}

render(-2.0, 2.0, -2.0, 2.0);

var anchorPoint = null;

canvas.addEventListener('click', e => {
    if (anchorPoint === null) {
        anchorPoint = { re: image.x_to_real(e.offsetX), im: image.y_to_imaginary(e.offsetY) };
    } else {
        let re = image.x_to_real(e.offsetX);
        let im = image.y_to_imaginary(e.offsetY);

        render(Math.min(re, anchorPoint.re), Math.max(re, anchorPoint.re), Math.min(im, anchorPoint.im), Math.max(im, anchorPoint.im))
        anchorPoint = null;
    }
})