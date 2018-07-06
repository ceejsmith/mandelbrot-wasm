#![feature(use_extern_macros, wasm_custom_section, wasm_import_module)]

use std::f32;

extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

mod complex;
use complex::Complex;

#[wasm_bindgen]
extern {
    #[wasm_bindgen(js_namespace = console)]
    fn log(message: &str);
}

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
    pub fn new(width_px: u32, height_px: u32, re_min: f32, re_max: f32, im_min: f32, im_max: f32) -> Image {
        log("In Image constructor");
        let buffer = Vec::with_capacity((width_px * height_px) as usize);
        Image {
            width_px,
            height_px,
            re_min,
            re_max,
            im_min,
            im_max,
            buffer
        }
    }

    pub fn calculate(&mut self) -> *const u8 {
        let mut buffer = Vec::with_capacity((self.width_px * self.height_px) as usize);
        for x in 0..self.width_px {
            for y in 0..self.height_px {
                buffer.push(iterations(self.px_to_complex(x, y)));
            }
        }
        self.buffer = buffer;
        self.buffer.as_ptr()
    }

    fn px_to_complex(&self, x: u32, y: u32) -> Complex {
        let re_range = self.re_max - self.re_min;
        let im_range = self.im_max - self.im_min;

        Complex::new(
            self.re_min + (re_range * (x as f32) / (self.width_px as f32)),
            self.im_min + (im_range * (y as f32) / (self.height_px as f32))
        )
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