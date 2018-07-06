#![feature(use_extern_macros, wasm_custom_section, wasm_import_module)]

use std::f32;

extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

mod complex;
use complex::Complex;

#[wasm_bindgen]
pub struct Image {
    width_px: u32,
    height_px: u32,
    re_min: f32,
    re_max: f32,
    im_min: f32,
    im_max: f32,
    buffer: Vec<u8>
}

#[wasm_bindgen]
impl Image {
    pub fn new(width_px: u32, height_px: u32) -> Image {
        let buffer = Vec::with_capacity((width_px * height_px) as usize);
        Image {
            width_px,
            height_px,
            re_min: 0.0,
            re_max: 0.0,
            im_min: 0.0,
            im_max: 0.0,
            buffer
        }
    }

    pub fn calculate(&mut self, re_min: f32, re_max: f32, im_min: f32, im_max: f32) -> *const u8 {
        self.re_min = re_min;
        self.re_max = re_max;
        self.im_min = im_min;
        self.im_max = im_max;

        let mut buffer = Vec::with_capacity((self.width_px * self.height_px) as usize);
        for x in 0..self.width_px {
            for y in 0..self.height_px {
                buffer.push(iterations(self.px_to_complex(x, y)));
            }
        }
        self.buffer = buffer;
        self.buffer.as_ptr()
    }

    pub fn x_to_real(&self, x: u32) -> f32 {
        let re_range = self.re_max - self.re_min;
        self.re_min + (re_range * (x as f32) / (self.width_px as f32))
    }

    pub fn y_to_imaginary(&self, y: u32) -> f32 {
        let im_range = self.im_max - self.im_min;
        self.im_min + (im_range * (y as f32) / (self.height_px as f32))
    }

    fn px_to_complex(&self, x: u32, y: u32) -> Complex {
        Complex { re: self.x_to_real(x), im: self.y_to_imaginary(y) }
    }
}

fn iterations(c: Complex) -> u8 {
    let mut z = Complex::zero();
    let mut n = 0;

    while z.magnitude() < 2.0 && n < 100 {
        z = z.squared().plus(c);
        n = n + 1;
    }

    n
}