const CFG = {
    sketch: {
        elementId: 'app',
        width: 1280,
        height: 720,
        colorMode: {
            colorSpace: 'hsb',
            hue: {
                max: 360,
            },
            saturation: {
                max: 100,
            },
            brightness: {
                max: 100,
            },
            alpha: {
                max: 100,
            },
        },
        background: {
            color: {
                hue: 0,
                saturation: 0,
                brightness: 80,
                alpha: 100,
            },
        },
    },
    bio: {
        width: 720,
        height: 720,
        colorMode: {
            colorSpace: 'hsb',
            hue: {
                max: 360,
            },
            saturation: {
                max: 100,
            },
            brightness: {
                max: 100,
            },
            alpha: {
                max: 100,
            },
        },
        background: {
            color: {
                hue: 0,
                saturation: 0,
                brightness: 0,
                alpha: 100,
            },
        },
    },
    creatures: {
        population: {
            size: {
                init: 20,
            },
        },
    },
} as const;

export default CFG;
