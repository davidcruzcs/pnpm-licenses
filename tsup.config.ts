import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/cli.ts'
  },
  dts: false,
  clean: true,
  target: 'es2020',
  format: ['esm'],
  sourcemap: true,
  minify: false,
  // TODO: might be useful to add something here
  noExternal: []
})