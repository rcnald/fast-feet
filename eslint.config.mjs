import config from '@rcnald/eslint-config/node.js'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'

export default [
  ...config,
  {
    languageOptions: {
      globals: {
        ...globals.vitest,
      },

      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'module',

      parserOptions: {
        project: './tsconfig.json',
      },
    },
    ignores: ['eslint.config.mjs'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]
