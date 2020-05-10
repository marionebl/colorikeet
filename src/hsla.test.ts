import { HSLA } from "./hsla";

jest.unmock("./hsla");
jest.unmock("./rgba");

test("HSLA.fromHSLString fails for hsl(0, 0, 0)", () => {
  const error = HSLA.fromHslString("hsl(0, 0, 0)");
  expect(error).toEqual(
    new Error(
      'Could not parse as hsla color, it must match pattern hsla?([0-255], [0-100]%, [0-100%], [0 - 1]?), received "hsl(0, 0, 0)"'
    )
  );
});

test("HSLA.fromHSLString fails for h(0, 0, 0)", () => {
  const error = HSLA.fromHslString("h(0, 0, 0)");
  expect(error).toEqual(
    new Error(
      'Could not parse as hsla color, it must match pattern hsla?([0-255], [0-100]%, [0-100%], [0 - 1]?), received "h(0, 0, 0)"'
    )
  );
});

test("HSLA.fromHSLString fails for h(0, 0, 0)", () => {
  const error = HSLA.fromHslString("h(0, 0, 0)");
  expect(error).toEqual(
    new Error(
      'Could not parse as hsla color, it must match pattern hsla?([0-255], [0-100]%, [0-100%], [0 - 1]?), received "h(0, 0, 0)"'
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
      'Could not parse as hsla color, it must match pattern hsla?([0-255], [0-100]%, [0-100%], [0 - 1]?), received "hsla(0, 0, 0, 0.1.)"'
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
      b: 0,
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
      b: 0,
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
      b: 255,
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
      b: 0,
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
      b: 0,
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
      b: 255,
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
      b: 0,
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
      b: 255,
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
      b: 191,
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
      b: 0,
    })
  );
});

test("HSLA.fromTuple works as expected", () => {
  const color = HSLA.fromTuple([0, 50, 50, 1]);
  expect(color).toEqual(expect.objectContaining({ h: 0, s: 50, l: 50 }));
});

test("HSLA.fromTuple fails for short tuple", () => {
  const color = HSLA.fromTuple([0, 50] as any);
  expect(color).toEqual(
    new Error(
      `HSLA.fromTuple requires a tuple with exactly 4 members, received 2 on [0,50]`
    )
  );
});

test("HSLA.fromTuple fails for long tuple", () => {
  const color = HSLA.fromTuple([0, 50, 50, 1, 1] as any);
  expect(color).toEqual(
    new Error(
      `HSLA.fromTuple requires a tuple with exactly 4 members, received 5 on [0,50,50,1,1]`
    )
  );
});

test("HSLA.fromTuple fails for negative hue value", () => {
  const color = HSLA.fromTuple([-1, 0, 0, 0] as any);
  expect(color).toEqual(
    new Error(
      `HSLA.fromTuple requires a hue value matching [0-360], received -1`
    )
  );
});

test("HSLA.fromTuple fails for hue value gt 360", () => {
  const color = HSLA.fromTuple([361, 0, 0, 0] as any);
  expect(color).toEqual(
    new Error(
      `HSLA.fromTuple requires a hue value matching [0-360], received 361`
    )
  );
});

test("HSLA.fromTuple fails for negative saturation value", () => {
  const color = HSLA.fromTuple([0, -1, 0, 0] as any);
  expect(color).toEqual(
    new Error(
      `HSLA.fromTuple requires a saturation value matching [0-100], received -1`
    )
  );
});

test("HSLA.fromTuple fails for saturation value gt 100", () => {
  const color = HSLA.fromTuple([0, 101, 0, 0] as any);
  expect(color).toEqual(
    new Error(
      `HSLA.fromTuple requires a saturation value matching [0-100], received 101`
    )
  );
});

test("HSLA.fromTuple fails for negative lightness value", () => {
  const color = HSLA.fromTuple([0, 0, -1, 0] as any);
  expect(color).toEqual(
    new Error(
      `HSLA.fromTuple requires a lightness value matching [0-100], received -1`
    )
  );
});

test("HSLA.fromTuple fails for lightness value gt 100", () => {
  const color = HSLA.fromTuple([0, 0, 101, 0] as any);
  expect(color).toEqual(
    new Error(
      `HSLA.fromTuple requires a lightness value matching [0-100], received 101`
    )
  );
});

test("HSLA.fromTuple fails for negative alpha channel", () => {
  const color = HSLA.fromTuple([0, 0, 0, -0.1] as any);
  expect(color).toEqual(
    new Error(
      `HSLA.fromTuple requires an alpha channel matching [0-1], received -0.1`
    )
  );
});

test("HSLA.fromTuple fails for alpha channel gt 1", () => {
  const color = HSLA.fromTuple([0, 0, 0, 1.1] as any);
  expect(color).toEqual(
    new Error(
      `HSLA.fromTuple requires an alpha channel matching [0-1], received 1.1`
    )
  );
});
