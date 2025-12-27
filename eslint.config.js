import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    files: ['**/*.ts', '**/*.tsx'],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: true,
        sourceType: 'module',
      },
    },

    plugins: {
      '@typescript-eslint': tseslint,
    },

    rules: {
      /**
       * ======================
       * NAMING CONVENTIONS
       * ======================
       */

      '@typescript-eslint/naming-convention': [
        'error',

        // Interfaces → I
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: true,
          },
        },

        // Types → T
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
          custom: {
            regex: '^T[A-Z]',
            match: true,
          },
        },

        // Enums → E
        {
          selector: 'enum',
          format: ['PascalCase'],
          custom: {
            regex: '^E[A-Z]',
            match: true,
          },
        },
      ],

      /**
       * ======================
       * QUOTES
       * ======================
       */
      quotes: ['error', 'single', { allowTemplateLiterals: true }],
    },
  },

  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);