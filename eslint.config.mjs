import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.commonjs,
      },
      ecmaVersion: 11,
      sourceType: 'commonjs',
    },
  },
  {
    files: ['test/**/*.mjs'],
    languageOptions: {
      globals: {
        ...globals.mocha,
      },
      ecmaVersion: 11,
      sourceType: 'module',
    },
  },
];
