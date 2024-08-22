import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "node:url";
import globals from "globals";
import nodePlugin from "eslint-plugin-n";
import js from "@eslint/js";
import path from "node:path";
import typescript from "typescript-eslint";
import jsdoc from "eslint-plugin-jsdoc";
import perfectionist from 'eslint-plugin-perfectionist';

// Mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  perfectionist.configs['recommended-natural'],
  jsdoc.configs['flat/requirements-typescript-error'],
  ...typescript.configs.recommended,
  nodePlugin.configs["flat/recommended"],
  ...compat.config({
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
  }),
]

