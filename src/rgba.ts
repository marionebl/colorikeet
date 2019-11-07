export class RGBA {
    private constructor(readonly r: number, readonly g: number, readonly b: number, readonly a: number) {}

    public static assert(color: RGBA | Error): asserts color is RGBA {
        if (color instanceof Error) {
            throw color;
        }
    }

    public static valid(color: RGBA | Error): color is RGBA {
        return color instanceof Error === false;
    }

    public static fromHexString(input: string): RGBA | Error {
        if (!input.startsWith('#')) {
            return new Error('Could not parse hex color without leading #');
        }

        const dataLength = input.length - 1;

        if (![3, 4, 6, 8].includes(dataLength)) {
            return new Error(`Could not parse ${JSON.stringify(input)} as hex color, expected 4, 5, 7, or 9 characters`);
        }

        const matcher = dataLength === 3 || dataLength === 4 ? /[a-f0-9]/g : /[a-f0-9]{2}/g;
        const data = input.slice(1).match(matcher);

        if (data === null) {
            return new Error(`Could not parse ${JSON.stringify(input)} as hex color, it must match pattern #([0-9a-f]+)`);
        }

        const parsed = data!.map(raw => parseInt(raw.length === 2 ? raw : raw.repeat(2), 16))

        const [r, g, b, rawA] = parsed;

        if (!Number.isInteger(r) || !Number.isInteger(g) || !Number.isInteger(b) || [4, 8].includes(dataLength) && !Number.isInteger(rawA)) {
            return new Error(`Could not parse ${JSON.stringify(input)} as hex color, it must match pattern #([0-9a-f]+)`);
        }

        const a = typeof rawA === 'undefined' ? 255 : rawA;
        return new RGBA(r, g, b, a / 255);
    }
}