import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "node:url";
import globals from "globals";
import js from "@eslint/js";
import typescript from "typescript-eslint";


const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  resolvePluginsRelativeTo: __dirname,
});

export default [
  ...compat.extends([
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:n/recommended',
    'plugin:perfectionist/recommended-natural',
    'plugin:jsdoc/recommended',
  ]),
  ...compat.plugins(['@typescript-eslint', 'import'])
  ...compat.config(
    {
      parser: '@typescript-eslint/parser',
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/no-useless-constructor': 'error',
        '@typescript-eslint/no-var-requires': 'off',
        'n/no-missing-import': 'off',
        'n/no-unsupported-features/es-syntax': 'off',
        'no-unused-expressions': 'off',
        'no-useless-constructor': 'off',
        'perfectionist/sort-classes': [
          'error',
          {
            groups: [
              'index-signature',
              'static-property',
              'property',
              'private-property',
              'constructor',
              'static-method',
              'static-private-method',
              ['get-method', 'set-method'],
              'method',
              'private-method',
              'unknown',
            ],
            order: 'asc',
            type: 'alphabetical',
          },
        ],
        'jsdoc/require-jsdoc': 'error',
      },
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
    }
  ),
]

