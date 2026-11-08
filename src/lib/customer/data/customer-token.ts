import 'server-only';

import { cookies } from 'next/headers';

const CUSTOMER_TOKEN_COOKIE = 'vendyx_customer_token';
const MAX_AGE = 60 * 60 * 24 * 7;

export const getCustomerToken = async () => {
  const cookieStore = await cookies();

  return cookieStore.get(CUSTOMER_TOKEN_COOKIE)?.value;
};

export const setCustomerToken = async (token: string) => {
  const cookieStore = await cookies();

  cookieStore.set(CUSTOMER_TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE
  });
};

export const deleteCustomerToken = async () => {
  const cookieStore = await cookies();

  cookieStore.delete(CUSTOMER_TOKEN_COOKIE);
};
