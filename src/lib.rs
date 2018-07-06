#![feature(use_extern_macros, wasm_custom_section, wasm_import_module)]

use std::f32;

extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

mod complex;
use complex::Complex;

#[wasm_bindgen]
pub fn image() -> *const u8 {
    let mut vec = Vec::with_capacity(360000);
    for x in 0..600 {
        for y in 0..600 {
            let xf = x as f32;
            let yf = y as f32;
            vec.push(iterations((xf - 300.0) / 150.0, (yf - 300.0) / 150.0));
        }
    }
    vec.as_ptr()
}

fn iterations(re: f32, im: f32) -> u8 {
    let c = Complex::new(re, im);
    let mut z = Complex::zero();
    let mut n = 0;

    while z.magnitude() < 2.0 && n < 100 {
        z = z.squared().plus(c);
        n = n + 1;
    }

    n
}