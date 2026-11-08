import 'server-only';

import { cache } from 'react';

import { GET_CART_QUERY } from '@/lib/vendyx/operations/cart-operations';
import { vendyxFetch } from '@/lib/vendyx/vendyx-client';

import { getCartId } from './cart-id';

export const getCart = cache(async () => {
  const cartId = await getCartId();
  if (!cartId) return null;
  const { cart } = await vendyxFetch(GET_CART_QUERY, { id: cartId });

  return cart ?? null;
});
