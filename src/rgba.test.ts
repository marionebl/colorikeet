import {RGBA} from './rgba';

test('RGBA.fromHex works for #000000', () => {
    const color = RGBA.fromHexString('#000000');
    expect(color).toEqual(expect.objectContaining({ r: 0, g: 0, b: 0 }));
});

test('RGBA.fromHex works for #ffffff', () => {
    const color = RGBA.fromHexString('#ffffff');
    expect(color).toEqual(expect.objectContaining({ r: 255, g: 255, b: 255 }));
});

test('RGBA.fromHex works for 000000', () => {
    const color = RGBA.fromHexString('000000');
    expect(color).toEqual(expect.objectContaining({ r: 0, g: 0, b: 0 }));
});

test('RGBA.fromHex works for #000', () => {
    const color = RGBA.fromHexString('#000');
    expect(color).toEqual(expect.objectContaining({ r: 0, g: 0, b: 0 }));
});