import { Colorikeet } from "./colorikeet";

jest.unmock("./colorikeet");

test("Colorikeet.fromString delegates to RGBA for #000000", async () => {
  const { RGBA } = await import("./rgba");
  Colorikeet.from("#000000");

  expect(RGBA.fromHexString).toHaveBeenCalledWith("#000000");
});

test("Colorikeet.fromString delegates to RGBA for #000", async () => {
  const { RGBA } = await import("./rgba");
  Colorikeet.from("#000");

  expect(RGBA.fromHexString).toHaveBeenCalledWith("#000");
});

test("Colorikeet.fromString delegates to RGBA for rgba(0, 0, 0, 0)", async () => {
  const { RGBA } = await import("./rgba");
  Colorikeet.from("rgba(0, 0, 0, 0)");

  expect(RGBA.fromRgbString).toHaveBeenCalledWith("rgba(0, 0, 0, 0)");
});

test("Colorikeet.fromString delegates to RGBA for blue", async () => {
  const { RGBA } = await import("./rgba");
  Colorikeet.from("blue");

  expect(RGBA.fromNameString).toHaveBeenCalledWith("blue");
});

test("Colorikeet.fromString delegates to HSLA.fromHslString for hsl(255, 0%, 0%)", async () => {
  const { HSLA } = await import("./hsla");

  Colorikeet.from("hsl(255, 0%, 0%)");
  expect(HSLA.fromHslString).toHaveBeenCalledWith("hsl(255, 0%, 0%)");
});
