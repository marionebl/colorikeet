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

    public static assert(color: Colorikeet | Error): asserts color is Colorikeet {
        if (color instanceof Error) {
            throw color;
        }
    }

    public static valid(color: Colorikeet | Error): color is Colorikeet {
        return color instanceof Error === false;
    }

    public static fromString(input: string): Colorikeet | Error {
        const color = RGBA.fromHexString(input);

        if (color instanceof Error) {
            return color;
        }

        return new Colorikeet(color);
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