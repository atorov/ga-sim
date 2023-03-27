const CFG = {
    sketch: {
        elementId: 'app',
        width: 1280,
        height: 720,
        colorMode: {
            colorSpace: 'hsb',
            hueMax: 360,
            saturationMax: 100,
            brightnessMax: 100,
            alphaMax: 100,
        },
        backgroundColor: {
            hue: 0,
            saturation: 0,
            brightness: 0,
            alpha: 100,
        },
    },
    bio: {
        width: 1280,
        height: 720,
        colorMode: {
            colorSpace: 'hsb',
            hueMax: 360,
            saturationMax: 100,
            brightnessMax: 100,
            alphaMax: 100,
        },
        backgroundColor: {
            hue: 0,
            saturation: 0,
            brightness: 0,
            alpha: 100,
        },
    },
    creature: {
        live: {
            min: 250,
            max: 1000,
            decStep: 0.1,
        },
    },
    population: {
        size: {
            max: 20,
        },
    },
    food: {
        live: {
            min: 500,
            max: 1000,
            decStep: 1,
        },
    },
    foodArr: {
        size: {
            max: 10,
        },
    },
} as const;

export default CFG;
