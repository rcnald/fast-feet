import config from '@rocketseat/eslint-config/node.mjs'
import tsParser from "@typescript-eslint/parser";
import globals from "globals"

export default [
  ...config,
  {
    languageOptions: {
      globals: {
        ...globals.vitest,
      },    
      parser: tsParser,
        ecmaVersion: 5,
        sourceType: "module",

        parserOptions: {
          project: "./tsconfig.json",
        },
  },
    rules: {
      camelcase: 'off',
      'no-useless-constructor': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-new': 'off',
      'no-unused-vars': [
        'warn',
        {
          destructuredArrayIgnorePattern: "^_",
          args: "none"
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@stylistic/max-len': [
        'warn', // ou "error"
        {
          code: 80,
          tabWidth: 2,
          ignoreComments: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
          ignoreTrailingComments: true,
        },
      ],
    },
  },
]
