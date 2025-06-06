import { defineConfig, Options } from "tsup";

export default defineConfig((options: Options) => ({
  treeshake: true,
  splitting: true,
  entry: ["src/components/**/*.ts"],
  entryPoints: ["src/components/index.ts"],
  format: ["esm"],
  dts: true,
  minify: true,
  clean: true,
  target: "es2022",
  ...options,
}));
