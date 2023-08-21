import { defineConfig } from "tsup";
import tsconfig from "./tsconfig.json";

export default defineConfig((options) => ({
  entry: ["src/index.ts"],
  dts: false,
  outDir: "dist",
  format: ["esm"],
  name: "bundle",
  splitting: false,
  sourcemap: false,
  clean: true,
  target: tsconfig.compilerOptions.target as "ES2022",
  minify: true,
}));
