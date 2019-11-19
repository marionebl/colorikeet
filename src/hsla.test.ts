import { HSLA } from "./hsla";

jest.unmock("./hsla");
jest.unmock("./rgba");

test("HSLA.fromHSLString fails for hsl(0, 0, 0)", () => {
  const error = HSLA.fromHslString("hsl(0, 0, 0)");
  expect(error).toEqual(
    new Error(
      'Could not parse "hsl(0, 0, 0)" as hsla color, it must match pattern hsla?([0-255], [0-100]%, [0-100%], [0 - 1]?)'
    )
  );
});

test("HSLA.fromHSLString fails for h(0, 0, 0)", () => {
  const error = HSLA.fromHslString("h(0, 0, 0)");
  expect(error).toEqual(
    new Error(
      'Could not parse "h(0, 0, 0)" as hsla color, it must match pattern hsla?([0-255], [0-100]%, [0-100%], [0 - 1]?)'
    )
  );
});

test("HSLA.fromHSLString fails for h(0, 0, 0)", () => {
  const error = HSLA.fromHslString("h(0, 0, 0)");
  expect(error).toEqual(
    new Error(
      'Could not parse "h(0, 0, 0)" as hsla color, it must match pattern hsla?([0-255], [0-100]%, [0-100%], [0 - 1]?)'
    )
  );
});

test("HSLA.fromHSLString works for hsl(0, 0%, 0%)", () => {
  const color = HSLA.fromHslString("hsl(0, 0%, 0%)");
  expect(color).toEqual({ h: 0, s: 0, l: 0, a: 1 });
});

test("HSLA.fromHSLString works for hsl(255, 50%, 50%)", () => {
  const color = HSLA.fromHslString("hsl(255, 50%, 50%)");
  expect(color).toEqual({ h: 255, s: 50, l: 50, a: 1 });
});

test("HSLA.fromHSLString works for hsla(0, 0%, 0%, 0)", () => {
  const color = HSLA.fromHslString("hsla(0, 0%, 0%, 0)");
  expect(color).toEqual({ h: 0, s: 0, l: 0, a: 0 });
});

test("HSLA.fromHSLString works for hsl(0, 0%, 0%, 0)", () => {
  const color = HSLA.fromHslString("hsl(0, 0%, 0%, 0)");
  expect(color).toEqual({ h: 0, s: 0, l: 0, a: 0 });
});

test("HSLA.fromHSLString fails for hsla(0, 0%, 0%, 0.1.)", () => {
  const error = HSLA.fromHslString("hsla(0, 0, 0, 0.1.)");
  expect(error).toEqual(
    new Error(
      'Could not parse "hsla(0, 0, 0, 0.1.)" as hsla color, it must match pattern hsla?([0-255], [0-100]%, [0-100%], [0 - 1]?)'
    )
  );
});

test("HSLA.prototype.toRgb converts hsl(255, 50%, 0%) to rgb(0, 0, 0)", async () => {
  const hsl = HSLA.fromHslString("hsl(255, 50%, 0%)");
  HSLA.assert(hsl);
  const rgb = hsl.toRgb();

  expect(rgb).toEqual(
    expect.objectContaining({
      r: 0,
      g: 0,
      b: 0
    })
  );
});

test("HSLA.prototype.toRgb converts hsl(255, 50%, 0%) to rgb(0, 0, 0)", async () => {
  const hsl = HSLA.fromHslString("hsl(255, 50%, 0%)");
  HSLA.assert(hsl);
  const rgb = hsl.toRgb();

  expect(rgb).toEqual(
    expect.objectContaining({
      r: 0,
      g: 0,
      b: 0
    })
  );
});

test("HSLA.prototype.toRgb converts hsl(255, 100%, 100%) to rgb(255, 255, 255)", async () => {
  const hsl = HSLA.fromHslString("hsl(255, 100%, 100%)");
  HSLA.assert(hsl);
  const rgb = hsl.toRgb();

  expect(rgb).toEqual(
    expect.objectContaining({
      r: 255,
      g: 255,
      b: 255
    })
  );
});

test("HSLA.prototype.toRgb converts hsl(0, 100%, 50%) to rgb(255, 0, 0)", async () => {
  const hsl = HSLA.fromHslString("hsl(0, 100%, 50%)");
  HSLA.assert(hsl);
  const rgb = hsl.toRgb();

  expect(rgb).toEqual(
    expect.objectContaining({
      r: 255,
      g: 0,
      b: 0
    })
  );
});

test("HSLA.prototype.toRgb converts hsl(120, 100%, 50%) to rgb(0, 255, 0)", async () => {
  const hsl = HSLA.fromHslString("hsl(120, 100%, 50%)");
  HSLA.assert(hsl);
  const rgb = hsl.toRgb();

  expect(rgb).toEqual(
    expect.objectContaining({
      r: 0,
      g: 255,
      b: 0
    })
  );
});

test("HSLA.prototype.toRgb converts hsl(240, 100%, 50%) to rgb(0, 0, 255)", async () => {
  const hsl = HSLA.fromHslString("hsl(240, 100%, 50%)");
  HSLA.assert(hsl);
  const rgb = hsl.toRgb();

  expect(rgb).toEqual(
    expect.objectContaining({
      r: 0,
      g: 0,
      b: 255
    })
  );
});

test("HSLA.prototype.toRgb converts hsl(60, 100%, 50%) to rgb(255, 255, 0)", async () => {
  const hsl = HSLA.fromHslString("hsl(60, 100%, 50%)");
  HSLA.assert(hsl);
  const rgb = hsl.toRgb();

  expect(rgb).toEqual(
    expect.objectContaining({
      r: 255,
      g: 255,
      b: 0
    })
  );
});

test("HSLA.prototype.toRgb converts hsl(300, 100%, 50%) to rgb(255, 0, 255)", async () => {
  const hsl = HSLA.fromHslString("hsl(300, 100%, 50%)");
  HSLA.assert(hsl);
  const rgb = hsl.toRgb();

  expect(rgb).toEqual(
    expect.objectContaining({
      r: 255,
      g: 0,
      b: 255
    })
  );
});

test("HSLA.prototype.toRgb converts hsl(0, 0%, 75%) to rgb(191, 191, 191)", async () => {
  const hsl = HSLA.fromHslString("hsl(0, 0%, 75%)");
  HSLA.assert(hsl);
  const rgb = hsl.toRgb();

  expect(rgb).toEqual(
    expect.objectContaining({
      r: 191,
      g: 191,
      b: 191
    })
  );
});

test("HSLA.prototype.toRgb converts hsl(0, 100%, 25%) to rgb(128, 0, 0)", async () => {
  const hsl = HSLA.fromHslString("hsl(0, 100%, 25%)");
  HSLA.assert(hsl);
  const rgb = hsl.toRgb();

  expect(rgb).toEqual(
    expect.objectContaining({
      r: 128,
      g: 0,
      b: 0
    })
  );
});
