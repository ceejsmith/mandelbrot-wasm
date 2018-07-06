#[derive(Clone, Copy)]
pub struct Complex {
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