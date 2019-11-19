import { RGBA } from "./rgba";
import { assertRange } from "./assert-range";

export class HSLA {
  private constructor(
    readonly h: number,
    readonly s: number,
    readonly l: number,
    readonly a: number
  ) {}

  public static assert(color: HSLA | Error): asserts color is HSLA {
    if (color instanceof Error) {
      throw color;
    }
  }

  public static valid(color: HSLA | Error): color is HSLA {
    return color instanceof Error === false;
  }

  public static fromHslString(input: string): HSLA | Error {
    const match = input.match(
      /hsla?\(([0-9]{1,3})\s*,\s*([0-9]{1,3})%\s*,\s*([0-9]{1,3})%(\s*,\s*([0-9.]+))?\)/
    );

    if (match === null) {
      return new Error(
        `Could not parse ${JSON.stringify(
          input
        )} as hsla color, it must match pattern hsla?([0-255], [0-100]%, [0-100%], [0 - 1]?)`
      );
    }

    const [, /* input */ rawH, rawS, rawL /* withWhitespace */, , rawA] = match;
    const a = typeof rawA === "undefined" ? 1 : parseFloat(rawA);

    return new HSLA(
      parseInt(rawH, 10),
      parseInt(rawS, 10),
      parseInt(rawL, 10),
      a
    );
  }

  public static fromTuple(
    input: [number, number, number, number]
  ): HSLA | Error {
    if (input.length !== 4) {
      return new Error(
        `HSLA.fromTuple requires a tuple with exactly 4 members, received ${
          input.length
        } on ${JSON.stringify(input)}`
      );
    }

    const [h, s, l, a] = input;

    if (h < 0 || h > 360) {
      return new Error(
        `HSLA.fromTuple requires a hue value matching [0-360], received ${h}`
      );
    }

    if (s < 0 || s > 100) {
      return new Error(
        `HSLA.fromTuple requires a saturation value matching [0-100], received ${s}`
      );
    }

    if (l < 0 || l > 100) {
      return new Error(
        `HSLA.fromTuple requires a lightness value matching [0-100], received ${l}`
      );
    }

    if (a < 0 || a > 1) {
      return new Error(
        `HSLA.fromTuple requires an alpha channel matching [0-1], received ${a}`
      );
    }

    return new HSLA(h, s, l, a);
  }

  public toRgb(): RGBA {
    const h = this.h;
    const s = this.s / 100;
    const l = this.l / 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs(((this.h / 60) % 2) - 1)),
      m = l - c / 2,
      r = 0,
      g = 0,
      b = 0;

    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    const rgba = RGBA.fromTuple([r, g, b, this.a]);
    RGBA.assert(rgba);
    return rgba;
  }

  public toHsla(): this {
    return this;
  }
}
