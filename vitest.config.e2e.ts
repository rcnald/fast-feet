import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    root: './',
    globals: true,
    include: ['**/*.{e2e-spec}.ts'],
    setupFiles: ['./test/setup.e2e.ts'],
  },
  plugins: [tsConfigPaths()],
})
