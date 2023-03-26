// 1
import 'normalize.css';
// 2
// import '@picocss/pico';
// 3
import P5 from 'p5';

// const myp5 =
new P5((p: P5) => {
    p.setup = () => {
        p.createCanvas(800, 600);
    };

    p.draw = () => {
        p.background(0);
        p.fill(255);
        p.rect(p.width / 2 - 25, p.height / 2 - 25, 50, 50);
    };
});
