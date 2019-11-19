import { RGBA } from "./rgba";
import { HSLA } from "./hsla";

export interface RGBColor {
  readonly r: number;
  readonly g: number;
  readonly b: number;
}

export interface RGBAColor {
  readonly r: number;
  readonly g: number;
  readonly b: number;
  readonly a: number;
}

export interface HSLColor {
  readonly h: number;
  readonly s: number;
  readonly l: number;
}

export interface HSLAColor {
  readonly h: number;
  readonly s: number;
  readonly l: number;
  readonly a: number;
}

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

  public static optional(input: string): Colorikeet | undefined {
    const result = Colorikeet.from(input);

    if (result instanceof Error) {
      return;
    }

    return result;
  }

  public get rgb(): RGBColor {
    const { r, g, b } = this.color.toRgb();
    return { r, g, b };
  }

  public get rgba(): RGBAColor {
    const { r, g, b, a } = this.color.toRgb();
    return { r, g, b, a };
  }

  public get hsl(): HSLColor {
    const { h, s, l } = this.color.toHsla();
    return { h, s, l };
  }

  public get hsla(): HSLAColor {
    const { h, s, l, a } = this.color.toHsla();
    return { h, s, l, a };
  }
}
