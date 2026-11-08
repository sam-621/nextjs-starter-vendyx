import 'server-only';

import { z } from 'zod';

const optional = <T extends z.ZodType>(schema: T) => {
  return z.preprocess(value => (value === '' ? undefined : value), schema.optional());
};

const EnvSchema = z.object({
  VENDYX_API_URL: optional(z.url()).default('https://api.vendyx.so'),
  VENDYX_SHOP_ID: z.string({ error: 'is required' }).min(1, 'is required'),
  VENDYX_STOREFRONT_API_KEY: z.string({ error: 'is required' }).min(1, 'is required'),
  VENDYX_LOCALE: optional(z.enum(['en', 'es', 'fr']))
});

const parseEnv = () => {
  const parsed = EnvSchema.safeParse(process.env);

  if (!parsed.success) {
    const issues = parsed.error.issues.map(issue => `- ${issue.path.join('.')}: ${issue.message}`);

    throw new Error(
      `Invalid Vendyx environment variables:\n${issues.join('\n')}\nSee .env.example.`
    );
  }

  return parsed.data;
};

const env = parseEnv();

export const VendyxConfig = {
  apiUrl: env.VENDYX_API_URL,
  shopId: env.VENDYX_SHOP_ID,
  storefrontApiKey: env.VENDYX_STOREFRONT_API_KEY,
  locale: env.VENDYX_LOCALE
};
