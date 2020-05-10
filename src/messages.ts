export const hslaCount =
  process.env.NODE_ENV === "development"
    ? "HSLA.fromTuple requires a tuple with exactly 4 members, received"
    : "A";

export const hslaRange =
  process.env.NODE_ENV === "development"
    ? "HSLA.fromTuple requires a hue value matching [0-360], received"
    : "B";

export const hslaSaturation =
  process.env.NODE_ENV === "development"
    ? "HSLA.fromTuple requires a saturation value matching [0-100], received"
    : "C";

export const hslaLightness =
  process.env.NODE_ENV === "development"
    ? "HSLA.fromTuple requires a lightness value matching [0-100], received"
    : "D";

export const hlsaAlpha =
  process.env.NODE_ENV === "development"
    ? "HSLA.fromTuple requires an alpha channel matching [0-1], received"
    : "E";

export const rgbaCount =
  process.env.NODE_ENV === "development"
    ? "RGBA.fromTuple requires a tuple with exactly 4 members, received"
    : "A";

export const rgbaChannelsTuple =
  process.env.NODE_ENV === "development"
    ? "RGBA.fromTuple requires rgb channel values matching [0-255], received"
    : "F";

export const rgbaAlphaTuple =
  process.env.NODE_ENV === "development"
    ? "RGBA.fromTuple requires an alpha channel matching [0-1], received"
    : "G";

export const hexHash =
  process.env.NODE_ENV === "development"
    ? "Could not parse hex color without leading #"
    : "H";

export const hexLength =
  process.env.NODE_ENV === "development"
    ? "Could not parse as hex color, expected 4, 5, 7, or 9 characters, received"
    : "I";

export const hexPatternMatach =
  process.env.NODE_ENV === "development"
    ? "Could not parse as hex color must match pattern #([0-9a-f]+), received"
    : "J";

export const hexDataType =
  process.env.NODE_ENV === "development"
    ? "Could not parse as hex color it must match pattern #([0-9a-f]+), received"
    : "K";

export const rgbaPattern =
  process.env.NODE_ENV === "development"
    ? "Could not parse as rgb color, it must match pattern rgba?([0-9s.,%]+)"
    : "L";

export const rgbaLength =
  process.env.NODE_ENV === "development"
    ? "Could not parse as rgb color, must contain 3 or 4 channels - received"
    : "M";

export const rgbaChannels =
  process.env.NODE_ENV === "development"
    ? "Could not parse as rgb color, it must contain 3 channels [0-255], received"
    : "N";

export const rgbaAlpha =
  process.env.NODE_ENV === "development"
    ? "Could not parse as rgb color, it must contain 3 channels [0-255], received"
    : "N";

export const namedNotFound =
  process.env.NODE_ENV === "development"
    ? "Could not resolve as named color, received"
    : "O";

export const hslaPattern =
  process.env.NODE_ENV === "development"
    ? "Could not parse as hsla color, it must match pattern hsla?([0-255], [0-100]%, [0-100%], [0 - 1]?), received"
    : "P";
