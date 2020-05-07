import { Colorikeet } from "./colorikeet";

jest.unmock("./colorikeet");
jest.unmock("./hsla");
jest.unmock("./rgba");

test("Colorikeet.from returns expected result", () => {
  const color = Colorikeet.from("#0433FF");
  Colorikeet.assert(color);
  expect(color.hex).toEqual({ r: "04", g: "33", b: "ff" });
});

test("Colorikeet.from returns expected result", () => {
  const color = Colorikeet.from("#00fdff");
  Colorikeet.assert(color);
  expect(color.hex).toEqual({ r: "00", g: "fd", b: "ff" });
});
