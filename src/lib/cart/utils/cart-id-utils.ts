import 'server-only';

import { cookies } from 'next/headers';

const CART_ID_COOKIE = 'vendyx_cart_id';
const MAX_AGE = 60 * 60 * 24 * 30;

export const getCartId = async () => {
  const cookieStore = await cookies();

  return cookieStore.get(CART_ID_COOKIE)?.value;
};

export const setCartId = async (cartId: string) => {
  const cookieStore = await cookies();

  cookieStore.set(CART_ID_COOKIE, cartId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE
  });
};

export const deleteCartId = async () => {
  const cookieStore = await cookies();

  cookieStore.delete(CART_ID_COOKIE);
};
