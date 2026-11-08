import { z } from 'zod';

const DEVELOPMENT_SITE_URL = 'http://localhost:3001';

const SiteUrlSchema = z.url({
  protocol: /^https?$/,
  error: 'must be a full URL, like https://shop.com'
});

const parseSiteUrl = () => {
  const value = process.env.SITE_URL;

  if (!value && process.env.NODE_ENV !== 'production') return DEVELOPMENT_SITE_URL;

  const parsed = SiteUrlSchema.safeParse(value);

  if (!parsed.success) {
    const message = value ? parsed.error.issues[0].message : 'is required';

    throw new Error(`Invalid environment variables:\n- SITE_URL: ${message}\nSee .env.example.`);
  }

  return parsed.data.replace(/\/$/, '');
};

export const SITE_URL = parseSiteUrl();

export const getAbsoluteUrl = (path: string) => {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
};
