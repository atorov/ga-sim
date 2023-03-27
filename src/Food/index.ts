import { nanoid } from 'nanoid';
import type P5 from 'p5';
import CFG from '../config';

export default class Food {
    private s: P5;
    private size: number;

    private updateLive() {
        this.live -= CFG.food.live.decStep;
    }

    private updateSize() {
        this.size = (this.live / this.maxDistance) * 25;
    }

    public id: string;
    public maxDistance: number;
    public pos: P5.Vector;
    public live: number;

    constructor(s: P5) {
        this.s = s;
        this.id = nanoid();
        this.maxDistance = (this.s.width ** 2 + this.s.height ** 2) ** 0.5;
        this.pos = this.s.createVector(
            this.s.random(this.s.width),
            this.s.random(this.s.height)
        );
        this.live = this.s.random(CFG.food.live.min, CFG.food.live.max);
        this.size = 0;
    }

    public draw() {
        this.s.noStroke();
        this.s.fill(90, 100, 100, 50);
        this.s.circle(this.pos.x, this.pos.y, this.size);
    }

    public update() {
        this.updateLive();
        this.updateSize();
    }
}
