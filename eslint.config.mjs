// @ts-check
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const config = [
  ...compat.env({
    es2021: true,
    node: true,
    browser: true,
  }),

  ...compat.config({
    plugins: ['prettier', '@typescript-eslint', 'react', 'eslint-plugin-prettier'],
    extends: [
      'plugin:react/recommended',
      'eslint:recommended',
      'eslint-config-prettier',
      'eslint-config-next',
      'prettier',
      'plugin:@typescript-eslint/recommended',
    ],
    env: {
      es2021: true,
      node: true,
      browser: true,
    },
    rules: {
      '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
      '@typescript-eslint/no-explicit-any': 1,
      'jsx-a11y/click-events-have-key-events': 0,
      'import/prefer-default-export': 1,
      'react/jsx-no-useless-fragment': 0,
      'react/function-component-definition': [
        1,
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'prettier/prettier': 1,
      'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
      'react/jsx-props-no-spreading': 0,
      'react/jsx-fragments': 0,
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          ts: 'never',
          tsx: 'never',
        },
      ],
      'jsx-a11y/control-has-associated-label': 0,
      'react/jsx-boolean-value': 0,
      'no-underscore-dangle': 0,
      'arrow-body-style': 0,
      'no-nested-ternary': 0,
      'spaced-comment': 0,
      '@typescript-eslint/ban-ts-comment': 1,
      'no-plusplus': 0,
      '@typescript-eslint/no-namespace': 0,
    },
  }),
];

export default config;
