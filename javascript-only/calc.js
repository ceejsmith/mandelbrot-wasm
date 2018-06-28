var canvas = document.getElementById('mandelbrot-canvas');

canvas.height = 600;
canvas.width = 600;

const ctx = canvas.getContext('2d');

const next = (z, c) => {
    return { re: c.re + z.re * z.re - z.im * z.im, im: c.im + 2 * z.re * z.im }
}

const mag = z => Math.sqrt(z.re * z.re + z.im * z.im)

const maxIter = 500;

const isIn = c => {
    var i = 0;
    var z = { re: 0, im: 0 }
    while (mag(z) < 2 && i < maxIter) {
        i++;
        z = next(z, c)
    }
    return i;
}

for (var x = 0; x < 600; x++) {
    for (var y = 0; y < 600; y++) {
        var z = { re: (x - 300) / 150, im: (y - 300) / 150 };
        var iters = isIn(z)
        if (iters < maxIter) {
            var style = 'rgb(' + Math.min(255, Math.floor(255 * iters / 20)) + ', 0, 0)';
            ctx.fillStyle = style;
            ctx.fillRect(x, y, 1, 1);
        }
    }
}