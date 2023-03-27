import P5 from 'p5';
import CFG from './config';

const el = document.getElementById(CFG.sketch.elementId);

const s = new P5((p5: P5) => {
    let bio: P5.Graphics;

    p5.setup = () => {
        s.createCanvas(CFG.sketch.width, CFG.sketch.height);
        s.colorMode(
            CFG.sketch.colorMode.colorSpace,
            CFG.sketch.colorMode.hue.max,
            CFG.sketch.colorMode.saturation.max,
            CFG.sketch.colorMode.brightness.max,
            CFG.sketch.colorMode.alpha.max
        );
        s.background(
            CFG.sketch.background.color.hue,
            CFG.sketch.background.color.saturation,
            CFG.sketch.background.color.brightness,
            CFG.sketch.background.color.alpha
        );

        bio = s.createGraphics(CFG.bio.width, CFG.bio.height);
        bio.colorMode(
            CFG.bio.colorMode.colorSpace,
            CFG.bio.colorMode.hue.max,
            CFG.bio.colorMode.saturation.max,
            CFG.bio.colorMode.brightness.max,
            CFG.bio.colorMode.alpha.max
        );
        bio.background(
            CFG.bio.background.color.hue,
            CFG.bio.background.color.saturation,
            CFG.bio.background.color.brightness,
            CFG.bio.background.color.alpha
        );
    };

    p5.draw = () => {
        s.background(
            CFG.sketch.background.color.hue,
            CFG.sketch.background.color.saturation,
            CFG.sketch.background.color.brightness,
            CFG.sketch.background.color.alpha
        );

        bio.background(
            CFG.bio.background.color.hue,
            CFG.bio.background.color.saturation,
            CFG.bio.background.color.brightness,
            CFG.bio.background.color.alpha
        );

        s.image(bio, 0, 0, CFG.sketch.width, CFG.sketch.height);
    };
}, el ?? undefined);
