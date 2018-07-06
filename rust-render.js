import { Image, Complex } from "./wasm_mandelbrot";
import { memory } from "./wasm_mandelbrot_bg";

const renderWithRust = canvas => {
    const width = canvas.width;
    const height = canvas.height;

    const ctx = canvas.getContext('2d');
    const mandelImage = ctx.getImageData(0, 0, width, height);
    
    const rustImage = Image.new(width, height);
    
    const render = (re_min, re_max, im_min, im_max) => {
        console.log("Rendering (" + re_min.toFixed(3) + ", " + im_min.toFixed(3) + ") to (" + re_max.toFixed(3) + ", " + im_max.toFixed(3) + ")");
    
        const setPtr = rustImage.calculate(re_min, re_max, im_min, im_max);
        const set = new Uint8ClampedArray(memory.buffer, setPtr, 4 * width * height);
    
        mandelImage.data.set(set);
    
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
};

export { renderWithRust };
