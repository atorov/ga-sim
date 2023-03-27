import { nanoid } from 'nanoid';
import type P5 from 'p5';
import CFG from '../config';
import type Food from '../Food';

export default class Creature {
    private s: P5;
    private id: string;
    private maxDistance: number;
    private pos: P5.Vector;
    private af: P5.Vector;
    private acm: P5.Vector;
    private dcm: P5.Vector;
    private rm: P5.Vector;
    private dir: P5.Vector;
    private size: number;

    private gsex: number;

    public live: number;

    constructor(s: P5) {
        this.s = s;
        this.id = nanoid();
        this.maxDistance = (this.s.width ** 2 + this.s.height ** 2) ** 0.5;
        this.pos = this.s.createVector(
            this.s.random(this.s.width),
            this.s.random(this.s.height)
        );
        this.af = this.s.createVector(0, 0);
        this.acm = this.s.createVector(0, 0);
        this.dcm = this.s.createVector(0, 0);
        this.rm = this.s.createVector(0, 0);
        this.dir = this.s.createVector(0, 0);
        this.live = this.s.random(CFG.creature.live.min, CFG.creature.live.max);
        this.size = 0;

        this.gsex = this.s.round(this.s.random());
    }

    private findClosestFood(foodArr: Food[]) {
        const fa = foodArr.map((it) => ({
            id: it.id,
            dist: it.pos.dist(this.pos) + it.maxDistance - it.live,
        }));
        fa.sort((a, b) => Math.sign(a.dist - b.dist));
        return foodArr.find((it) => it.id === fa[0]?.id);
    }

    private findClosestMate(population: Creature[]) {
        const pop = population.map((it) => ({
            id: it.id,
            dist: it.pos.dist(this.pos) + it.maxDistance - it.live,
        }));
        pop.sort((a, b) => Math.sign(a.dist - b.dist));
        return population.find((it) => it.id === pop[0]?.id);
    }

    private updateAcm(population: Creature[]) {
        const pop = population
            .filter((it) => it.id !== this.id)
            .filter((it) => it.gsex !== this.gsex);
        const closest = this.findClosestMate(pop);
        if (!closest) {
            this.acm = this.s.createVector(0, 0);
        } else {
            const dist = this.pos.dist(closest.pos);
            const mag = this.s.constrain((10 * dist) / this.maxDistance, 0, 2);
            this.acm = closest.pos.copy().sub(this.pos).setMag(mag);
        }
    }

    private updateAf(foodArr: Food[]) {
        const closest = this.findClosestFood(foodArr);
        if (!closest) {
            this.acm = this.s.createVector(0, 0);
        } else {
            const dist = this.pos.dist(closest.pos);
            const amp = 50 - this.size;
            const mag = this.s.constrain(
                ((amp * dist) / this.maxDistance) ** 2,
                0,
                0.25
            );
            this.af = closest.pos.copy().sub(this.pos).setMag(mag);
        }
    }

    private updateDcm(population: Creature[]) {
        const pop = population.filter((it) => it.id !== this.id);
        const closest = this.findClosestMate(pop);
        if (!closest) {
            this.dcm = this.s.createVector(0, 0);
        } else {
            const dist = this.pos.dist(closest.pos);
            const ampSize = closest.size;
            const ampGsex = this.gsex !== closest.gsex ? 1 : 100;
            const amp = ampSize + ampGsex;
            const mag = -this.s.constrain(
                ((amp * this.maxDistance) / dist) ** 2,
                0,
                0.2
            );
            this.dcm = closest.pos.copy().sub(this.pos).setMag(mag);
        }
    }

    private updateDir() {
        this.dir = this.s
            .createVector(0, 0)
            .add(this.af)
            .add(this.acm)
            .add(this.dcm)
            .add(this.rm);
    }

    private updateLive() {
        this.live -= CFG.creature.live.decStep;
    }

    private updateRm() {
        this.rm = this.s
            .createVector(this.s.random(-0.5, 0.5), this.s.random(-0.5, 0.5))
            .normalize();
    }

    private updateSize() {
        this.size = (this.live / this.maxDistance) * 25;
    }

    public draw() {
        this.s.strokeWeight(0.5);
        this.s.stroke(120, 100, 100, 100);
        this.s.line(
            this.pos.x,
            this.pos.y,
            this.pos.x + this.af.x * 100,
            this.pos.y + this.af.y * 100
        );

        this.s.strokeWeight(0.75);
        this.s.stroke(210, 100, 100, 100);
        this.s.line(
            this.pos.x,
            this.pos.y,
            this.pos.x + this.acm.x * 100,
            this.pos.y + this.acm.y * 100
        );

        this.s.strokeWeight(0.75);
        this.s.stroke(0, 100, 100, 100);
        this.s.line(
            this.pos.x,
            this.pos.y,
            this.pos.x + this.dcm.x * 100,
            this.pos.y + this.dcm.y * 100
        );

        this.s.strokeWeight(0.5);
        this.s.stroke(0, 0, 100, 100);
        this.s.line(
            this.pos.x,
            this.pos.y,
            this.pos.x + this.rm.x * 33,
            this.pos.y + this.rm.y * 33
        );

        this.s.strokeWeight(1);
        this.s.stroke(0, 0, 100, 100);
        this.s.line(
            this.pos.x,
            this.pos.y,
            this.pos.x + this.dir.x * 100,
            this.pos.y + this.dir.y * 100
        );

        this.s.strokeWeight(2);
        if (this.gsex === 1) {
            this.s.stroke(180, 100, 100, 100);
        } else {
            this.s.stroke(300, 100, 100, 100);
        }
        this.s.noFill();
        this.s.circle(this.pos.x, this.pos.y, this.size);
    }

    public update(population: Creature[], foodArr: Food[]) {
        this.updateLive();
        this.updateSize();

        this.updateAf(foodArr);
        this.updateAcm(population);
        this.updateDcm(population);
        this.updateRm();
        this.updateDir();

        this.pos.add(this.dir);

        if (this.pos.x < 0) {
            this.pos = this.s.createVector(0, this.pos.y);
        } else if (this.pos.x > this.s.width) {
            this.pos = this.s.createVector(this.s.width, this.pos.y);
        }
        if (this.pos.y < 0) {
            this.pos = this.s.createVector(this.pos.x, 0);
        } else if (this.pos.y > this.s.height) {
            this.pos = this.s.createVector(this.pos.x, this.s.height);
        }
    }
}
