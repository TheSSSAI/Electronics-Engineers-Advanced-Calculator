import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true, // Generate declaration files (.d.ts)
  splitting: false,
  sourcemap: true,
  clean: true, // Clean output directory before building
  treeshake: true,
  minify: false, // Minification can be enabled for production builds if needed
});