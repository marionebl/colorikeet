import * as colors from "color-name";
import { HSLAColor, RGBAColor } from "./types";
import {
  rgbaChannelsTuple,
  rgbaAlpha,
  hexHash,
  hexLength,
  hexPatternMatach,
  hexDataType,
  rgbaCount,
  rgbaPattern,
  rgbaLength,
  rgbaChannels,
  rgbaAlphaTuple,
  namedNotFound,
} from "./messages";

export class RGBA {
  private constructor(
    readonly r: number,
    readonly g: number,
    readonly b: number,
    readonly a: number
  ) {}

  public static assert(color: RGBA | Error): asserts color is RGBA {
    if (color instanceof Error) {
      throw color;
    }
  }

  public static valid(color: RGBA | Error): color is RGBA {
    return color instanceof Error === false;
  }

  public static fromTuple(
    input: [number, number, number, number]
  ): RGBA | Error {
    if (input.length !== 4) {
      return new Error(
        `${rgbaCount} ${input.length} on ${JSON.stringify(input)}`
      );
    }

    const [r, g, b, a] = input;

    const offending = [
      ["r", r],
      ["g", g],
      ["b", b],
    ].filter(([, c]) => c < 0 || c > 255);

    if (offending.length > 0) {
      return new Error(
        `${rgbaChannelsTuple} ${offending
          .map(([n, v]) => `${v} for ${n}`)
          .join(", ")}`
      );
    }

    if (a < 0 || a > 1) {
      return new Error(`${rgbaAlphaTuple} ${a}`);
    }

    return new RGBA(r, g, b, a);
  }

  public static fromHexString(input: string): RGBA | Error {
    if (!input.startsWith("#")) {
      return new Error(hexHash);
    }

    const dataLength = input.length - 1;

    if (![3, 4, 6, 8].includes(dataLength)) {
      return new Error(
        `${hexLength} ${dataLength} in ${JSON.stringify(input)}`
      );
    }

    const matcher =
      dataLength === 3 || dataLength === 4 ? /[a-f0-9]/g : /[a-f0-9]{2}/g;
    const data = input.slice(1).toLowerCase().match(matcher);

    if (data === null) {
      return new Error(`${hexPatternMatach} ${JSON.stringify(input)}`);
    }

    const parsed = data!.map((raw) =>
      parseInt(raw.length === 2 ? raw : raw.repeat(2), 16)
    );

    const [r, g, b, rawA] = parsed;

    if (
      !Number.isInteger(r) ||
      !Number.isInteger(g) ||
      !Number.isInteger(b) ||
      ([4, 8].includes(dataLength) && !Number.isInteger(rawA))
    ) {
      return new Error(`${hexDataType} ${JSON.stringify(input)}`);
    }

    const a = typeof rawA === "undefined" ? 255 : rawA;
    return new RGBA(r, g, b, a / 255);
  }

  public static fromRgbString(input: string): RGBA | Error {
    const match = input.match(/rgba?\(([0-9\s\.,%]+)\)/);

    if (match === null) {
      return new Error(`${rgbaPattern}, received ${JSON.stringify(input)}`);
    }

    const data = match[1].split(",").map((item) => item.trim());

    if (![3, 4].includes(data.length)) {
      return new Error(
        `${rgbaLength} ${data.length} in ${JSON.stringify(input)}`
      );
    }

    const [r, g, b] = data
      .slice(0, 3)
      .map((value) => Math.min(parseInt(value, 10), 255));

    if (!Number.isInteger(r) || !Number.isInteger(g) || !Number.isInteger(b)) {
      return new Error(
        `${rgbaChannels} ${JSON.stringify(
          input
        )}`
      );
    }

    const a = typeof data[3] === "undefined" ? 1 : parseFloat(data[3]);

    if (Number.isNaN(a)) {
      return new Error(
        `${rgbaAlpha} ${JSON.stringify(
          input
        )}`
      );
    }

    const factor =
      typeof data[3] === "string" && data[3].endsWith("%") ? 100 : 1;
    return new RGBA(r, g, b, Math.min(1, a / factor));
  }

  public static fromNameString(input: string): RGBA | Error {
    if (input in colors) {
      const [r, g, b] = (colors as Record<string, [number, number, number]>)[
        input
      ];
      return new RGBA(r, g, b, 1);
    }

    return new Error(
      `${namedNotFound} ${JSON.stringify(input)}`
    );
  }

  public toRgb(): RGBAColor {
    return { r: this.r, g: this.g, b: this.b, a: this.a };
  }

  public toHsla(): HSLAColor {
    const r = this.r / 255;
    const g = this.g / 255;
    const b = this.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    const lightness = (max + min) / 2;

    const saturation = () => {
      if (delta === 0) {
        return 0;
      }

      if (lightness >= 0.5) {
        return delta / (2 - max - min);
      }

      return delta / (max + min);
    };

    const hue = () => {
      if (delta === 0) {
        return 0;
      }

      if (max === r) {
        const degree = (((g - b) / delta) % 6) * 60;
        return degree < 0 ? 360 + degree : degree;
      }

      if (max === g) {
        const degree = ((b - r) / delta + 2) * 60;
        return degree < 0 ? 360 + degree : degree;
      }

      // max === b
      const degree = ((r - g) / delta + 4) * 60;
      return degree < 0 ? 360 + degree : degree;
    };

    return {
      h: roundTo(hue(), 2),
      s: roundTo(saturation() * 100, 2),
      l: roundTo(lightness * 100, 2),
      a: this.a,
    };
  }
}

function roundTo(n: number, to: number): number {
  const factor = Math.pow(10, to);
  return Math.round(n * factor) / factor;
}
