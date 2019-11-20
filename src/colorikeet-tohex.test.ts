import { Colorikeet } from "./colorikeet";

jest.unmock("./colorikeet");
jest.unmock("./rgba");

test("color.hex returns expected result", () => {
  const color = Colorikeet.fromRgbTuple([255, 255, 255, 1]);
  Colorikeet.assert(color);
  expect(color.hex).toEqual({ r: "ff", g: "ff", b: "ff" });
});

test("color.hexa returns expected result", () => {
  const color = Colorikeet.fromRgbTuple([255, 255, 255, 0.5]);
  Colorikeet.assert(color);
  expect(color.hexa).toEqual({ r: "ff", g: "ff", b: "ff", a: "80" });
});
