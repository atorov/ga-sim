import P5 from 'p5';
import CFG from '../config';
import Creature from '../Creature';

export function cleanPopulation(population: Creature[]) {
    return population.filter((it) => it.live > CFG.creature.live.min);
}

function createCreature(s: P5) {
    return new Creature(s);
}

export function createPopulation(s: P5, popSize: number) {
    return Array(popSize)
        .fill(null)
        .map(() => createCreature(s));
}

export function increasePopulation(s: P5, population: Creature[]) {
    return [...population, createCreature(s)];
}
