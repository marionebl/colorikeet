import {RGBA} from './rgba';

// https://drafts.csswg.org/css-color/#example-5460df7f
test('RGBA.fromHexString works for #000000', () => {
    const color = RGBA.fromHexString('#000000');
    expect(color).toEqual(expect.objectContaining({ r: 0, g: 0, b: 0 }));
});

test('RGBA.fromHexString works for #ffffff', () => {
    const color = RGBA.fromHexString('#ffffff');
    expect(color).toEqual(expect.objectContaining({ r: 255, g: 255, b: 255 }));
});

// https://drafts.csswg.org/css-color/#example-e60892a9
test('RGBA.fromHexString works for #ffffff00', () => {
    const color = RGBA.fromHexString('#ffffff00');
    expect(color).toEqual({ r: 255, g: 255, b: 255, a: 0 });
});

test('RGBA.fromHexString works for #f00f', () => {
    const color = RGBA.fromHexString('#f00f');
    expect(color).toEqual({ r: 255, g: 0, b: 0, a: 1 });
});

// https://drafts.csswg.org/css-color/#example-49b19e9b
test('RGBA.fromHexString works for #000', () => {
    const color = RGBA.fromHexString('#000');
    expect(color).toEqual({ r: 0, g: 0, b: 0, a: 1 });
});

test('RGBA.fromHexString fails for 000000', () => {
    const error = RGBA.fromHexString('000000');
    expect(error).toEqual(new Error('Could not parse hex color without leading #'));
});

test('RGBA.fromHexString fails for #0', () => {
    const error = RGBA.fromHexString('#0');
    expect(error).toEqual(new Error('Could not parse "#0" as hex color, expected 4, 5, 7, or 9 characters'));
});

test('RGBA.fromHexString fails for #ffgfff', () => {
    const error = RGBA.fromHexString('#ffgfff');
    expect(error).toEqual(new Error('Could not parse "#ffgfff" as hex color, it must match pattern #([0-9a-f]+)'));
});

test('RGBA.fromHexString fails for # 99999', () => {
    const error = RGBA.fromHexString('# 99999');
    expect(error).toEqual(new Error('Could not parse "# 99999" as hex color, it must match pattern #([0-9a-f]+)'));
});

test('RGBA.fromHexString fails for #ffffffgf', () => {
    const error = RGBA.fromHexString('#ffffffgf');
    expect(error).toEqual(new Error('Could not parse "#ffffffgf" as hex color, it must match pattern #([0-9a-f]+)'));
});

test('RGBA.fromRgbString works for rgb(0,0,0)', () => {
    const color = RGBA.fromRgbString('rgb(0,0,0)');
    expect(color).toEqual(expect.objectContaining({ r: 0, g: 0, b: 0 }));
});

test('RGBA.fromRgbString works for rgb(0,0,0,0)', () => {
    const color = RGBA.fromRgbString('rgb(0,0,0,0)');
    expect(color).toEqual(expect.objectContaining({ r: 0, g: 0, b: 0, a: 0 }));
});

test('RGBA.fromRgbString works for rgba(255,255,255)', () => {
    const color = RGBA.fromRgbString('rgb(255,255,255)');
    expect(color).toEqual(expect.objectContaining({ r: 255, g: 255, b: 255 }));
});

test('RGBA.fromRgbString works for rgba(255,255,255,0.5)', () => {
    const color = RGBA.fromRgbString('rgb(255,255,255,0.5)');
    expect(color).toEqual(expect.objectContaining({ r: 255, g: 255, b: 255, a: 0.5 }));
});

test('RGBA.fromRgbString works for rgba(255,255,255,100%)', () => {
    const color = RGBA.fromRgbString('rgb(255,0,0,100%)');
    expect(color).toEqual(expect.objectContaining({ r: 255, g: 0, b: 0, a: 1 }));
});

test('RGBA.fromRgbString works for rgb(255, 0,    0)', () => {
    const color = RGBA.fromRgbString('rgb(255, 0,    0)');
    expect(color).toEqual(expect.objectContaining({ r: 255, g: 0, b: 0, a: 1 }));
});

test('RGBA.fromRgbString trims rgb(300, 255, 500, 2)', () => {
    const color = RGBA.fromRgbString('rgb(300, 255, 500, 2)');
    expect(color).toEqual(expect.objectContaining({ r: 255, g: 255, b: 255, a: 1 }));
});

test('RGBA.valid returns true for valid color', () => {
    expect(RGBA.valid(RGBA.fromHexString('#000000'))).toBe(true);
});

test('RGBA.valid returns false for error', () => {
    expect(RGBA.valid(RGBA.fromHexString(''))).toBe(false);
});

test('RGBA.assert works for valid color', () => {
    expect(() => RGBA.assert(RGBA.fromHexString('#000000'))).not.toThrow();
});

test('RGBA.assert throws for error', () => {
    expect(() => RGBA.assert(RGBA.fromHexString(''))).toThrow();
});

