import {RGBA} from './rgba';

export interface RGBColor {
    readonly r: number;
    readonly g: number;
    readonly b: number;
}

export interface RGBAColor {
    readonly r: number;
    readonly g: number;
    readonly b: number;
    readonly a: number;
}

export class Colorikeet {
    private constructor(private color: RGBA) {}

    public static fromString(input: string): Colorikeet {
        return new Colorikeet(RGBA.fromHexString(input));
    }

    public get rgb(): RGBColor {
        const {r, g, b} = this.color;
        return {r, g, b};
    }

    public get rgba(): RGBAColor {
        const {r, g, b, a} = this.color;
        return {r, g, b, a};
    }
}