import type { CodegenConfig } from '@graphql-codegen/cli';

const VENDYX_API_URL = process.env.VENDYX_API_URL ?? 'https://api.vendyx.so';

const config: CodegenConfig = {
  schema: `${VENDYX_API_URL}/storefront-api`,
  documents: ['./src/lib/vendyx/operations/**/*.ts'],
  ignoreNoDocuments: true,
  generates: {
    './src/lib/vendyx/codegen/': {
      preset: 'client',
      presetConfig: {
        fragmentMasking: false
      },
      config: {
        documentMode: 'string',
        enumsAsTypes: true,
        skipTypename: true,
        useTypeImports: true,
        scalars: {
          Date: 'string',
          JSON: 'unknown'
        }
      }
    }
  }
};

export default config;
