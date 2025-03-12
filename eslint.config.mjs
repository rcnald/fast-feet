import config from '@rcnald/eslint-config/node.js'
import globals from 'globals'

export default [
  ...config,
  {
    languageOptions: {
      globals: {
        ...globals.vitest,
      },
    },
  },
]
