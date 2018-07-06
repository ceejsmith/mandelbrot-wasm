import { renderWithJs } from "./javascript-render";
import { renderWithRust } from "./rust-render";

var canvas = document.getElementById('mandelbrot-canvas');

const width = 600;
const height = 600;

canvas.height = width;
canvas.width = height;

console.log("Rendering with pure JavaScript");
let startJs = performance.now();
renderWithJs(canvas);
let endJs = performance.now();
console.log("JavaScript rendering took " + (endJs - startJs) + "ms");

setTimeout(() => {
    console.log("Rendering with Rust compiled to Wasm");
    let startRust = performance.now();
    renderWithRust(canvas);
    let endRust = performance.now();
    console.log("Rust rendering took " + (endRust - startRust) + "ms");
}, 1000);