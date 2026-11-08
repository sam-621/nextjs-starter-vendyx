import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: { 'simple-import-sort': simpleImportSort },
    rules: {
      '@next/next/no-img-element': 'off',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'],
            ['^node:'],
            ['^react', '^next', '^@?\\w'],
            ['^@/'],
            ['^\\.\\.'],
            ['^\\.'],
            ['\\.css$']
          ]
        }
      ],
      'simple-import-sort/exports': 'error'
    }
  },
  prettier,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts'])
]);

export default eslintConfig;
