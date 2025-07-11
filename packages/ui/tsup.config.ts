import { defineConfig, Options } from "tsup";

export default defineConfig((options: Options) => ({
  treeshake: true,
  splitting: true,
  entry: ["src/**/*.ts"],
  format: ["esm", "cjs"],
  dts: true,
  minify: true,
  clean: true,
  target: "es2022",
  ...options,
}));
