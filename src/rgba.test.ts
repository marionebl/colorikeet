import { RGBA } from "./rgba";
import { HSLA } from "./hsla";

jest.unmock("./hsla");
jest.unmock("./rgba");

// https://drafts.csswg.org/css-color/#example-5460df7f
test("RGBA.fromHexString works for #000000", () => {
  const color = RGBA.fromHexString("#000000");
  expect(color).toEqual(expect.objectContaining({ r: 0, g: 0, b: 0 }));
});

test("RGBA.fromHexString works for #ffffff", () => {
  const color = RGBA.fromHexString("#ffffff");
  expect(color).toEqual(expect.objectContaining({ r: 255, g: 255, b: 255 }));
});

// https://drafts.csswg.org/css-color/#example-e60892a9
test("RGBA.fromHexString works for #ffffff00", () => {
  const color = RGBA.fromHexString("#ffffff00");
  expect(color).toEqual({ r: 255, g: 255, b: 255, a: 0 });
});

test("RGBA.fromHexString works for #f00f", () => {
  const color = RGBA.fromHexString("#f00f");
  expect(color).toEqual({ r: 255, g: 0, b: 0, a: 1 });
});

// https://drafts.csswg.org/css-color/#example-49b19e9b
test("RGBA.fromHexString works for #000", () => {
  const color = RGBA.fromHexString("#000");
  expect(color).toEqual({ r: 0, g: 0, b: 0, a: 1 });
});

test("RGBA.fromHexString fails for 000000", () => {
  const error = RGBA.fromHexString("000000");
  expect(error).toEqual(
    new Error("Could not parse hex color without leading #")
  );
});

test("RGBA.fromHexString fails for #0", () => {
  const error = RGBA.fromHexString("#0");
  expect(error).toEqual(
    new Error(
      'Could not parse "#0" as hex color, expected 4, 5, 7, or 9 characters'
    )
  );
});

test("RGBA.fromHexString fails for #ffgfff", () => {
  const error = RGBA.fromHexString("#ffgfff");
  expect(error).toEqual(
    new Error(
      'Could not parse "#ffgfff" as hex color, it must match pattern #([0-9a-f]+)'
    )
  );
});

test("RGBA.fromHexString fails for # 99999", () => {
  const error = RGBA.fromHexString("# 99999");
  expect(error).toEqual(
    new Error(
      'Could not parse "# 99999" as hex color, it must match pattern #([0-9a-f]+)'
    )
  );
});

test("RGBA.fromHexString fails for #ffffffgf", () => {
  const error = RGBA.fromHexString("#ffffffgf");
  expect(error).toEqual(
    new Error(
      'Could not parse "#ffffffgf" as hex color, it must match pattern #([0-9a-f]+)'
    )
  );
});

test("RGBA.fromRgbString works for rgb(0,0,0)", () => {
  const color = RGBA.fromRgbString("rgb(0,0,0)");
  expect(color).toEqual(expect.objectContaining({ r: 0, g: 0, b: 0 }));
});

test("RGBA.fromRgbString works for rgb(0,0,0,0)", () => {
  const color = RGBA.fromRgbString("rgb(0,0,0,0)");
  expect(color).toEqual(expect.objectContaining({ r: 0, g: 0, b: 0, a: 0 }));
});

test("RGBA.fromRgbString works for rgba(255,255,255)", () => {
  const color = RGBA.fromRgbString("rgb(255,255,255)");
  expect(color).toEqual(expect.objectContaining({ r: 255, g: 255, b: 255 }));
});

test("RGBA.fromRgbString works for rgba(255,255,255,0.5)", () => {
  const color = RGBA.fromRgbString("rgb(255,255,255,0.5)");
  expect(color).toEqual(
    expect.objectContaining({ r: 255, g: 255, b: 255, a: 0.5 })
  );
});

test("RGBA.fromRgbString works for rgba(255,255,255,100%)", () => {
  const color = RGBA.fromRgbString("rgb(255,0,0,100%)");
  expect(color).toEqual(expect.objectContaining({ r: 255, g: 0, b: 0, a: 1 }));
});

test("RGBA.fromRgbString works for rgb(255, 0,    0)", () => {
  const color = RGBA.fromRgbString("rgb(255, 0,    0)");
  expect(color).toEqual(expect.objectContaining({ r: 255, g: 0, b: 0, a: 1 }));
});

test("RGBA.fromRgbString trims rgb(300, 255, 500, 2)", () => {
  const color = RGBA.fromRgbString("rgb(300, 255, 500, 2)");
  expect(color).toEqual(
    expect.objectContaining({ r: 255, g: 255, b: 255, a: 1 })
  );
});

test("RGBA.fromRgbString fails for r(255, 255, 255)", () => {
  const error = RGBA.fromRgbString("r(255, 255, 255)");
  expect(error).toEqual(
    new Error(
      'Could not parse "r(255, 255, 255)" as rgb color, it must match pattern rgba?([0-9s.,%]+)'
    )
  );
});

test("RGBA.fromRgbString fails for rgb(%, ..., )", () => {
  const error = RGBA.fromRgbString("rgb(%, ..., )");
  expect(error).toEqual(
    new Error(
      'Could not parse "rgb(%, ..., )" as rgb color, it must contain 3 channels [0-255]'
    )
  );
});

test("RGBA.fromRgbString fails for rgb(255, 255, 255, .%)", () => {
  const error = RGBA.fromRgbString("rgb(255, 255, 255, .%)");
  expect(error).toEqual(
    new Error(
      'Could not parse "rgb(255, 255, 255, .%)" as rgb color, alpha channel must be [0-1] or [0-100]%'
    )
  );
});

test("RGBA.fromRgbString fails for rgb(255.255.255)", () => {
  const error = RGBA.fromRgbString("rgb(255.255.255)");
  expect(error).toEqual(
    new Error(
      'Could not parse "rgb(255.255.255)" as rgb color, must contain 3 or 4 channels - received 1'
    )
  );
});

test("RGBA.valid returns true for valid color", () => {
  expect(RGBA.valid(RGBA.fromHexString("#000000"))).toBe(true);
});

test("RGBA.valid returns false for error", () => {
  expect(RGBA.valid(RGBA.fromHexString(""))).toBe(false);
});

test("RGBA.assert works for valid color", () => {
  expect(() => RGBA.assert(RGBA.fromHexString("#000000"))).not.toThrow();
});

test("RGBA.assert throws for error", () => {
  expect(() => RGBA.assert(RGBA.fromHexString(""))).toThrow();
});

test("RGBA.fromTuple works as expected", () => {
  const color = RGBA.fromTuple([255, 255, 255, 1]);
  expect(color).toEqual(expect.objectContaining({ r: 255, g: 255, b: 255 }));
});

test("RGBA.fromTuple works as expected", () => {
  const color = RGBA.fromTuple([255, 255, 255, 1]);
  expect(color).toEqual(expect.objectContaining({ r: 255, g: 255, b: 255 }));
});

test("RGBA.fromTuple fails for short tuple", () => {
  const color = RGBA.fromTuple([255, 255] as any);
  expect(color).toEqual(new Error(`RGBA.fromTuple requires a tuple with exactly 4 members, received 2 on [255,255]`));
});

test("RGBA.fromTuple fails for long tuple", () => {
  const color = RGBA.fromTuple([255, 255, 255, 1, 1] as any);
  expect(color).toEqual(new Error(`RGBA.fromTuple requires a tuple with exactly 4 members, received 5 on [255,255,255,1,1]`));
});

test("RGBA.fromTuple fails for negative channel values", () => {
  const color = RGBA.fromTuple([-1, 0, 0, 0] as any);
  expect(color).toEqual(new Error(`RGBA.fromTuple requires rgb channel values matching [0-255], received -1 for r`));
});

test("RGBA.fromTuple fails with list of offending channel values", () => {
  const color = RGBA.fromTuple([-1, 266, 0, 0] as any);
  expect(color).toEqual(new Error(`RGBA.fromTuple requires rgb channel values matching [0-255], received -1 for r, 266 for g`));
});

test("RGBA.fromTuple fails for negative alpha channel", () => {
  const color = RGBA.fromTuple([0, 0, 0, -0.1] as any);
  expect(color).toEqual(new Error(`RGBA.fromTuple requires an alpha channel matching [0-1], received -0.1`));
});

test("RGBA.fromTuple fails for alpha channel gt 1", () => {
  const color = RGBA.fromTuple([0, 0, 0, 1.1] as any);
  expect(color).toEqual(new Error(`RGBA.fromTuple requires an alpha channel matching [0-1], received 1.1`));
});


test.each`
  rgba                  | hsla
  ${[0, 0, 0, 1]}       | ${[0, 0, 0, 1]}
  ${[255, 255, 255, 1]} | ${[0, 0, 100, 1]}
  ${[255, 0, 0, 1]}     | ${[0, 100, 50, 1]}
  ${[0, 255, 0, 1]}     | ${[120, 100, 50, 1]}
  ${[0, 0, 255, 1]}     | ${[240, 100, 50, 1]}
  ${[255, 255, 0, 1]}   | ${[60, 100, 50, 1]}
  ${[191, 191, 191, 1]} | ${[0, 0, 74.9, 1]}
  ${[128, 0, 0, 1]}     | ${[0, 100, 25.1, 1]}
  ${[255, 0, 255, 1]}   | ${[300, 100, 50, 1]}
  ${[255, 239, 213, 1]} | ${[37.14, 100, 91.76, 1]}
  ${[188, 143, 143, 1]} | ${[0, 25.14, 64.9, 1]}
`("RGBA.prototype.toHsla converts $rgba to $hsla", (data: any) => {
  const base = RGBA.fromTuple(data.rgba);
  RGBA.assert(base);
  const result = base.toHsla();
  expect(result).toEqual(HSLA.fromTuple(data.hsla));
});
