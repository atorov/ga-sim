import type P5 from 'p5';
import CFG from '../config';
import Food from '../Food';

export function cleanFoodArr(foodArr: Food[]) {
    return foodArr.filter((it) => it.live > CFG.food.live.min);
}

function createFood(s: P5) {
    return new Food(s);
}

export function createFoodArr(s: P5, faSize: number) {
    return Array(faSize)
        .fill(null)
        .map(() => createFood(s));
}

export function increaseFoodArr(s: P5, foodArr: Food[]) {
    return [...foodArr, createFood(s)];
}
