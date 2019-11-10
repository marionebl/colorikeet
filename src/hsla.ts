export class HSLA {
    private constructor(readonly h: number, readonly s: number, readonly l: number, readonly a: number) {}

    public static assert(color: HSLA | Error): asserts color is HSLA {
        if (color instanceof Error) {
            throw color;
        }
    }

    public static valid(color: HSLA | Error): color is HSLA {
        return color instanceof Error === false;
    }

    public static fromHSLString(input: string): HSLA | Error {
        const match = input.match(/hsla?\(([0-9]{1,3})\s*,\s*([0-9]{1,3})%\s*,\s*([0-9]{1,3})%(\s*,\s*([0-9.]+))?\)/);

        if (match === null) {
            return new Error(`Could not parse ${JSON.stringify(input)} as hsla color, it must match pattern hsla?([0-255], [0-100]%, [0-100%], [0 - 1]?)`);
        }

        const [/* input */, rawH, rawS, rawL, /* withWhitespace */, rawA] = match;
        const a = typeof rawA === 'undefined' ? 1 : parseFloat(rawA);

        return new HSLA(parseInt(rawH, 10), parseInt(rawS, 10), parseInt(rawL, 10), a);
    }
}