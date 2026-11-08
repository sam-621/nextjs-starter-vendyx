export const SITE_URL = (process.env.SITE_URL ?? 'http://localhost:3001').replace(/\/$/, '');

export const getAbsoluteUrl = (path: string) => {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
};
