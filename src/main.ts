import P5 from 'p5';
import CFG from './config';
import createBio from './create-bio';
import type Creature from './Creature';
import type Food from './Food';
import { cleanFoodArr, createFoodArr, increaseFoodArr } from './food-arr';
import {
    cleanPopulation,
    createPopulation,
    increasePopulation,
} from './population';

const el = document.getElementById(CFG.sketch.elementId);

const s = new P5((p5: P5) => {
    let bio: P5.Graphics;
    let foodArr: Food[];
    let population: Creature[];

    p5.setup = () => {
        s.createCanvas(CFG.sketch.width, CFG.sketch.height);
        s.colorMode(
            CFG.sketch.colorMode.colorSpace,
            CFG.sketch.colorMode.hueMax,
            CFG.sketch.colorMode.saturationMax,
            CFG.sketch.colorMode.brightnessMax,
            CFG.sketch.colorMode.alphaMax
        );
        s.background(
            CFG.sketch.backgroundColor.hue,
            CFG.sketch.backgroundColor.saturation,
            CFG.sketch.backgroundColor.brightness,
            CFG.sketch.backgroundColor.alpha
        );

        bio = createBio(s);
        foodArr = createFoodArr(bio, CFG.foodArr.size.max);
        population = createPopulation(bio, CFG.population.size.max);
    };

    p5.draw = () => {
        s.background(
            CFG.sketch.backgroundColor.hue,
            CFG.sketch.backgroundColor.saturation,
            CFG.sketch.backgroundColor.brightness,
            CFG.sketch.backgroundColor.alpha
        );

        bio.background(
            CFG.bio.backgroundColor.hue,
            CFG.bio.backgroundColor.saturation,
            CFG.bio.backgroundColor.brightness,
            CFG.bio.backgroundColor.alpha
        );

        foodArr.forEach((it) => {
            it.update();
        });
        foodArr.forEach((it) => {
            it.draw();
        });

        population.forEach((it) => {
            it.update(population, foodArr);
        });
        population.forEach((it) => {
            it.draw();
        });

        s.image(bio, 0, 0, CFG.sketch.width, CFG.sketch.height);

        foodArr = cleanFoodArr(foodArr);
        if (foodArr.length < CFG.foodArr.size.max) {
            foodArr = increaseFoodArr(bio, foodArr);
        }

        population = cleanPopulation(population);
        if (population.length < CFG.population.size.max) {
            population = increasePopulation(bio, population);
        }
    };
}, el ?? undefined);
