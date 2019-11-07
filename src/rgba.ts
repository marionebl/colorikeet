export class RGBA {
    private constructor(readonly r: number, readonly g: number, readonly b: number, readonly a: number) {}

    public static fromHexString(input: string): RGBA {
        const offset = input.startsWith('#') ? 1 : 0;
        const matcher = input.length - offset === 6 ? /[a-f0-9]{2}/g : /[a-f0-9]/g;
        const data = input.slice(offset).match(matcher);
        const [r, g, b] = data!.map(raw => parseInt(raw.length === 2 ? raw : raw.repeat(2), 16));
        return new RGBA(r, g, b, 1);
    }
}