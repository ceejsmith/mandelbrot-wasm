import { Image, Complex } from "./wasm_mandelbrot";
import { memory } from "./wasm_mandelbrot_bg"

var canvas = document.getElementById('mandelbrot-canvas');

const width = 600;
const height = 600;

canvas.height = width;
canvas.width = height;

const ctx = canvas.getContext('2d');
const mandelImage = ctx.getImageData(0, 0, width, height);
const mandelPixels = mandelImage.data;

const rustImage = Image.new(width, height);

const render = (re_min, re_max, im_min, im_max) => {
    console.log("Rendering (" + re_min.toFixed(3) + ", " + im_min.toFixed(3) + ") to (" + re_max.toFixed(3) + ", " + im_max.toFixed(3) + ")");

    const setPtr = rustImage.calculate(re_min, re_max, im_min, im_max);
    const set = new Uint8Array(memory.buffer, setPtr, width * height);

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const red = Math.min(255, Math.floor(255 * set[x * width + y] / 20));
            const offset = 4 * (y * width + x)
            mandelPixels[offset] = red;
            mandelPixels[offset + 3] = 255;            
        }
    }

    ctx.putImageData(mandelImage, 0, 0);
}

render(-2.0, 2.0, -2.0, 2.0);

var anchorPoint = null;

canvas.addEventListener('click', e => {
    if (anchorPoint === null) {
        anchorPoint = { re: rustImage.x_to_real(e.offsetX), im: rustImage.y_to_imaginary(e.offsetY) };
    } else {
        let re = rustImage.x_to_real(e.offsetX);
        let im = rustImage.y_to_imaginary(e.offsetY);

        render(Math.min(re, anchorPoint.re), Math.max(re, anchorPoint.re), Math.min(im, anchorPoint.im), Math.max(im, anchorPoint.im))
        anchorPoint = null;
    }
})