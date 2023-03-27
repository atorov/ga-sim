import { nanoid } from 'nanoid';
import type P5 from 'p5';
import CFG from '../config';

export type Creature = {
    id: string;
    s: P5;
    age: number;
    color: P5.Color;
    dir: P5.Vector;
    maxDist: number;
    pos: P5.Vector;
    size: number;
};

function createCreature(s: P5): Creature {
    const maxDist = s.dist(0, 0, s.width, s.height);
    return {
        id: nanoid(),
        s,
        age: 0,
        color: s.color(s.random(CFG.bio.colorMode.hue.max), 100, 100, 100),
        dir: s.createVector(0, 0),
        maxDist,
        pos: s.createVector(s.random(s.width), s.random(s.height)),
        size: (maxDist / 75) * (s.random() + 0.5),
    };
}

export function createPopulation(s: P5, size: number): Creature[] {
    return Array(size)
        .fill(null)
        .map(() => createCreature(s));
}

export function drawCreatures(population: Creature[]) {
    population.forEach((it) => {
        // horn
        it.s.strokeWeight(1);
        it.s.stroke(
            it.s.hue(it.color),
            it.s.saturation(it.color),
            it.s.brightness(it.color),
            it.s.alpha(it.color) * 0.5
        );
        it.s.line(
            it.pos.x,
            it.pos.y,
            it.pos.x + it.dir.x * it.size,
            it.pos.y + it.dir.y * it.size
        );

        // antennas
        const adir = it.dir
            .copy()
            .rotate(it.s.PI / 16)
            .setMag(2 * it.size);
        it.s.line(it.pos.x, it.pos.y, it.pos.x + adir.x, it.pos.y + adir.y);
        adir.rotate(-it.s.PI / 8);
        it.s.line(it.pos.x, it.pos.y, it.pos.x + adir.x, it.pos.y + adir.y);

        // body
        it.s.strokeWeight(it.size / 4);
        it.s.stroke(
            (it.s.hue(it.color) + 15) % CFG.bio.colorMode.hue.max,
            it.s.saturation(it.color) * 0.75,
            it.s.brightness(it.color) * 0.75,
            it.s.alpha(it.color) * 0.75
        );
        it.s.fill(it.color);
        it.s.circle(it.pos.x, it.pos.y, it.size);

        // tail #4
        const ndir = it.dir
            .copy()
            .rotate(it.s.PI)
            .setMag(2 * it.size);
        it.s.noStroke();
        it.s.fill(
            (it.s.hue(it.color) + 60) % CFG.bio.colorMode.hue.max,
            it.age % 60 > 45
                ? it.s.saturation(it.color) * 0.5
                : it.s.saturation(it.color),
            it.s.brightness(it.color),
            it.s.alpha(it.color) * 0.3
        );
        it.s.circle(it.pos.x + ndir.x, it.pos.y + ndir.y, it.size / 2);

        // tail #3
        ndir.setMag(1.5 * it.size);
        it.s.fill(
            (it.s.hue(it.color) + 45) % CFG.bio.colorMode.hue.max,
            it.age % 60 > 30 && it.age % 60 <= 45
                ? it.s.saturation(it.color) * 0.5
                : it.s.saturation(it.color),
            it.s.brightness(it.color),
            it.s.alpha(it.color) * 0.4
        );
        it.s.circle(it.pos.x + ndir.x, it.pos.y + ndir.y, (it.size * 2) / 3);

        // tail #2
        ndir.setMag(it.size);
        it.s.fill(
            (it.s.hue(it.color) + 30) % CFG.bio.colorMode.hue.max,
            it.age % 60 > 15 && it.age % 60 <= 30
                ? it.s.saturation(it.color) * 0.5
                : it.s.saturation(it.color),
            it.s.brightness(it.color),
            it.s.alpha(it.color) * 0.6
        );
        it.s.circle(it.pos.x + ndir.x, it.pos.y + ndir.y, (it.size * 3) / 4);

        // tail #1
        ndir.setMag(it.size / 2);
        it.s.fill(
            (it.s.hue(it.color) + 15) % CFG.bio.colorMode.hue.max,
            it.age % 60 > 0 && it.age % 60 <= 15
                ? it.s.saturation(it.color) * 0.5
                : it.s.saturation(it.color),
            it.s.brightness(it.color),
            it.s.alpha(it.color) * 0.8
        );
        it.s.circle(it.pos.x + ndir.x, it.pos.y + ndir.y, (it.size * 4) / 5);

        // head
        ndir.rotate(it.s.PI);
        it.s.fill(
            (it.s.hue(it.color) + 30) % CFG.bio.colorMode.hue.max,
            it.s.saturation(it.color),
            it.s.brightness(it.color),
            it.s.alpha(it.color) * 0.8
        );
        it.s.circle(it.pos.x + ndir.x, it.pos.y + ndir.y, it.size / 2);
    });
}

function moveCreature(creature: Creature, idx: number) {
    const mr = creature.s.createVector(
        creature.s.noise(idx, 0, creature.age / 100) - 0.5,
        creature.s.noise(0, idx, creature.age / 100) - 0.5
    );

    creature.dir.add(mr);

    const mag = creature.s.constrain(
        creature.dir.mag(),
        -creature.size / 10,
        creature.size / 10
    );
    creature.dir.setMag(mag);

    creature.pos.add(creature.dir);
    if (creature.pos.x < 0) {
        creature.pos.set(0, creature.pos.y);
        creature.dir.setMag(0);
    } else if (creature.pos.x > creature.s.width) {
        creature.pos.set(creature.s.width, creature.pos.y);
        creature.dir.setMag(0);
    }
    if (creature.pos.y < 0) {
        creature.pos.set(creature.pos.x, 0);
        creature.dir.setMag(0);
    } else if (creature.pos.y > creature.s.height) {
        creature.pos.set(creature.pos.x, creature.s.height);
        creature.dir.setMag(0);
    }
}

export function updateCreatures(population: Creature[]) {
    population.forEach((it, idx) => {
        it.age++;
        moveCreature(it, idx);
    });
}
