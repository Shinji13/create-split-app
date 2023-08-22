import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: ["src/index.ts"],
  dts: false,
  outDir: "dist",
  format: ["esm"],
  name: "bundle",
  splitting: false,
  sourcemap: false,
  target: "esnext",
  clean: true,
  minify: true,
  metafile: false,
}));
