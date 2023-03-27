import type P5 from 'p5';
import CFG from '../config';

export default function createBio(s: P5) {
    const bio = s.createGraphics(CFG.bio.width, CFG.bio.height);
    bio.colorMode(
        CFG.bio.colorMode.colorSpace,
        CFG.bio.colorMode.hueMax,
        CFG.bio.colorMode.saturationMax,
        CFG.bio.colorMode.brightnessMax,
        CFG.bio.colorMode.alphaMax
    );
    s.background(
        CFG.bio.backgroundColor.hue,
        CFG.bio.backgroundColor.saturation,
        CFG.bio.backgroundColor.brightness,
        CFG.bio.backgroundColor.alpha
    );

    return bio;
}
