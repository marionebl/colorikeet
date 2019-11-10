import {HSLA} from './hsla';

test('HSLA.fromHSLString fails for hsl(0, 0, 0)', () => {
    const error = HSLA.fromHSLString('hsl(0, 0, 0)');
    expect(error).toEqual(new Error('Could not parse "hsl(0, 0, 0)" as hsla color, it must match pattern hsla?([0-255], [0-100]%, [0-100%], [0 - 1]?)'));
});

test('HSLA.fromHSLString fails for h(0, 0, 0)', () => {
    const error = HSLA.fromHSLString('h(0, 0, 0)');
    expect(error).toEqual(new Error('Could not parse "h(0, 0, 0)" as hsla color, it must match pattern hsla?([0-255], [0-100]%, [0-100%], [0 - 1]?)'));
});

test('HSLA.fromHSLString fails for h(0, 0, 0)', () => {
    const error = HSLA.fromHSLString('h(0, 0, 0)');
    expect(error).toEqual(new Error('Could not parse "h(0, 0, 0)" as hsla color, it must match pattern hsla?([0-255], [0-100]%, [0-100%], [0 - 1]?)'));
});

test('HSLA.fromHSLString works for hsl(0, 0%, 0%)', () => {
    const color = HSLA.fromHSLString('hsl(0, 0%, 0%)');
    expect(color).toEqual({ h: 0, s: 0, l: 0, a: 1 });
});

test('HSLA.fromHSLString works for hsl(255, 50%, 50%)', () => {
    const color = HSLA.fromHSLString('hsl(255, 50%, 50%)');
    expect(color).toEqual({ h: 255, s: 50, l: 50, a: 1 });
});

test('HSLA.fromHSLString works for hsla(0, 0%, 0%, 0)', () => {
    const color = HSLA.fromHSLString('hsla(0, 0%, 0%, 0)');
    expect(color).toEqual({ h: 0, s: 0, l: 0, a: 0 });
});

test('HSLA.fromHSLString works for hsl(0, 0%, 0%, 0)', () => {
    const color = HSLA.fromHSLString('hsl(0, 0%, 0%, 0)');
    expect(color).toEqual({ h: 0, s: 0, l: 0, a: 0 });
});

test('HSLA.fromHSLString fails for hsla(0, 0%, 0%, 0.1.)', () => {
    const error = HSLA.fromHSLString('hsla(0, 0, 0, 0.1.)');
    expect(error).toEqual(new Error('Could not parse "hsla(0, 0, 0, 0.1.)" as hsla color, it must match pattern hsla?([0-255], [0-100]%, [0-100%], [0 - 1]?)'));
});

