import config from '@rcnald/eslint-config/node.js'
import globals from 'globals'
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default [
  ...config,
  {
    languageOptions: {
      globals: {
        ...globals.vitest,
      },
    },
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    }
  },
]
