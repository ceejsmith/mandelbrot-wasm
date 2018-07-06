#![feature(use_extern_macros, wasm_custom_section, wasm_import_module)]

extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;
use std::f32;

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

#[derive(Clone, Copy)]
struct Complex {
    pub re: f32,
    pub im: f32
}

impl Complex {
    pub fn new(re: f32, im: f32) -> Complex {
        Complex { re, im }
    }

    pub fn zero() -> Complex {
        Complex::new(0.0, 0.0)
    }

    pub fn squared(&self) -> Complex {
        Complex::new(
            self.re * self.re - self.im * self.im,
            2.0 * self.re * self.im
        )
    }

    pub fn plus(&self, c: Complex) -> Complex {
        Complex::new(self.re + c.re, self.im + c.im)
    }

    pub fn magnitude(&self) -> f32 {
        (self.re * self.re + self.im * self.im).sqrt()
    }
}

fn iterations(re: f32, im: f32) -> u8 {
    let c: Complex = Complex::new(re, im);
    let mut z = Complex::zero();
    let mut n = 0;

    while z.magnitude() < 2.0 && n < 100 {
        z = z.squared().plus(c);
        n = n + 1;
    }

    n
}