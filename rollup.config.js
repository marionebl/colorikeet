import resolve from "rollup-plugin-node-resolve";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import * as pkg from "./package.json";

export default {
  input: pkg.module,
  output: {
    file: "lib/bundle.js",
    format: "es"
  },
  plugins: [resolve(), sizeSnapshot()]
};
