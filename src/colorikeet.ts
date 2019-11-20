import { RGBA } from "./rgba";
import { HSLA } from "./hsla";
import * as T from "./types";

export * from "./types";

export class Colorikeet {
  private constructor(private color: RGBA | HSLA) {}

  public static assert(color: Colorikeet | Error): asserts color is Colorikeet {
    if (color instanceof Error) {
      throw color;
    }
  }

  public static valid(color: Colorikeet | Error): color is Colorikeet {
    return color instanceof Error === false;
  }

  public static from(input: string): Colorikeet | Error {
    let color: RGBA | HSLA | Error;

    if (input.startsWith("hsl")) {
      color = HSLA.fromHslString(input);
    }

    if (input.startsWith("#")) {
      color = RGBA.fromHexString(input);
    }

    if (input.startsWith("rgb")) {
      color = RGBA.fromRgbString(input);
    }

    color = RGBA.fromNameString(input);

    if (color instanceof Error) {
      return color;
    }

    return new Colorikeet(color);
  }

  public static fromRgbTuple(
    input: [number, number, number, number]
  ): Colorikeet | Error {
    const result = RGBA.fromTuple(input);

    if (!RGBA.valid(result)) {
      return result;
    }

    return new Colorikeet(result);
  }

  public static optional(input: string): Colorikeet | undefined {
    const result = Colorikeet.from(input);

    if (result instanceof Error) {
      return;
    }

    return result;
  }

  public get hex(): T.HexColor {
    const { r, g, b } = this.color.toRgb();
    return { r: hex(r), g: hex(g), b: hex(b) };
  }

  public get hexa(): T.HexaColor {
    const { r, g, b, a } = this.color.toRgb();
    return { r: hex(r), g: hex(g), b: hex(b), a: hex(Math.round(a * 255)) };
  }

  public get rgb(): T.RGBColor {
    const { r, g, b } = this.color.toRgb();
    return { r, g, b };
  }

  public get rgba(): T.RGBAColor {
    const { r, g, b, a } = this.color.toRgb();
    return { r, g, b, a };
  }

  public get hsl(): T.HSLColor {
    const { h, s, l } = this.color.toHsla();
    return { h, s, l };
  }

  public get hsla(): T.HSLAColor {
    const { h, s, l, a } = this.color.toHsla();
    return { h, s, l, a };
  }

  public with(
    data: Partial<T.HSLAColor> | Partial<T.RGBAColor>
  ): Colorikeet | Error {
    const isHslData = (
      d: Partial<T.HSLAColor> | Partial<T.RGBAColor>
    ): d is Partial<T.HSLAColor> =>
      Object.keys(d).some(key => ["h", "s", "l"].includes(key));

    if (isHslData(data)) {
      return this.withHsl(data);
    }

    return this.withRgb(data);
  }

  public withRgb(data: Partial<T.RGBAColor>): Colorikeet | Error {
    const previous = this.color.toRgb();
    const r = select(v, previous.r, data.r);
    const g = select(v, previous.g, data.g);
    const b = select(v, previous.b, data.b);
    const a = select(v, previous.a, data.a);
    const result = RGBA.fromTuple([r, g, b, a]);

    if (!RGBA.valid(result)) {
      return result;
    }

    this.color = result;
    return this;
  }

  public withHsl(data: Partial<T.HSLAColor>): Colorikeet | Error {
    const previous = this.color.toHsla();
    const h = select(v, previous.h, data.h);
    const s = select(v, previous.s, data.s);
    const l = select(v, previous.l, data.l);
    const a = select(v, previous.a, data.a);
    const result = HSLA.fromTuple([h, s, l, a]);

    if (!HSLA.valid(result)) {
      return result;
    }

    this.color = result;
    return this;
  }

  public withRed(r: number): Colorikeet | Error {
    return this.with({ r });
  }

  public withGreen(g: number): Colorikeet | Error {
    return this.with({ g });
  }

  public withBlue(b: number): Colorikeet | Error {
    return this.with({ b });
  }

  public withHue(h: number): Colorikeet | Error {
    return this.with({ h });
  }

  public withSaturation(s: number): Colorikeet | Error {
    return this.with({ s });
  }

  public withLightness(l: number): Colorikeet | Error {
    return this.with({ l });
  }

  public withAlpha(a: number): Colorikeet | Error {
    return this.with({ a });
  }
}

function hex(channel: number): string {
  const h = channel.toString(16);
  const prefix = h.length === 1 ? "0" : "";
  return `${prefix}${h}`;
}

function v(i: unknown): i is number {
  return typeof i === "number" && !Number.isNaN(i);
}

function select<T>(
  fn: (t: unknown) => t is T,
  fb: T,
  ...args: (T | undefined)[]
): T {
  const result = args.find(fn);
  return typeof result !== "undefined" ? result : fb;
}
