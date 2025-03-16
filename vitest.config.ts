import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    root: './',
    globals: true,
  },
  plugins: [tsConfigPaths()],
})
