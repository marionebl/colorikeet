import { Colorikeet } from './colorikeet';

test('Colorikeet.fromString works for #000000', () => {
    const color = Colorikeet.fromString('#000000');
    Colorikeet.assert(color);
    expect(color.rgb).toEqual({ r: 0, g: 0, b: 0 });
});

test('Colorikeet.fromString defaults to solid alpha for #000000', () => {
    const color = Colorikeet.fromString('#000000');
    Colorikeet.assert(color);
    expect(color.rgba).toEqual({ r: 0, g: 0, b: 0, a: 1 });
});

test('Colorikeet.fromString works for #ffffff', () => {
    const color = Colorikeet.fromString('#ffffff');
    Colorikeet.assert(color);
    expect(color.rgb).toEqual({ r: 255, g: 255, b: 255 });
});