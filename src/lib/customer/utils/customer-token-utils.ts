import 'server-only';

import { cookies } from 'next/headers';

const CUSTOMER_TOKEN_COOKIE = 'vendyx_customer_token';
const FALLBACK_MAX_AGE = 60 * 60 * 24 * 7;

export const getCustomerToken = async () => {
  const cookieStore = await cookies();

  return cookieStore.get(CUSTOMER_TOKEN_COOKIE)?.value;
};

export const setCustomerToken = async (token: string) => {
  const cookieStore = await cookies();
  const expiration = getTokenExpiration(token);
  const maxAge = expiration ? expiration - Math.floor(Date.now() / 1000) : FALLBACK_MAX_AGE;

  cookieStore.set(CUSTOMER_TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge
  });
};

export const deleteCustomerToken = async () => {
  const cookieStore = await cookies();

  cookieStore.delete(CUSTOMER_TOKEN_COOKIE);
};

const getTokenExpiration = (token: string) => {
  try {
    const [, payload] = token.split('.');
    const { exp } = JSON.parse(Buffer.from(payload, 'base64url').toString()) as { exp?: unknown };

    return typeof exp === 'number' ? exp : null;
  } catch {
    return null;
  }
};
