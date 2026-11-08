'use server';

import { refresh } from 'next/cache';
import { z } from 'zod';

import { ActionErrorCode, type ActionResult } from '@/lib/vendyx/action-result';
import {
  ADD_ITEM_TO_CART_MUTATION,
  CREATE_CART_MUTATION
} from '@/lib/vendyx/operations/cart-operations';
import { CartErrorCode } from '@/lib/vendyx/types';
import { vendyxFetch } from '@/lib/vendyx/vendyx-client';

import { getCartId, setCartId } from '../utils/cart-id-utils';

type Input = z.infer<typeof Schema>;

export const addToCart = async (input: Input): Promise<ActionResult<CartErrorCode>> => {
  const parsed = Schema.safeParse(input);
  if (!parsed.success) return { isSuccess: false, errorCode: ActionErrorCode.InvalidInput };

  try {
    const cartId = await getCartId();

    if (cartId) {
      const { addItemToCart: result } = await vendyxFetch(ADD_ITEM_TO_CART_MUTATION, {
        cartId,
        input: parsed.data
      });
      const [apiError] = result.apiErrors;

      if (!apiError) {
        refresh();
        return { isSuccess: true };
      }

      if (apiError.code !== CartErrorCode.CartNotFound) {
        return { isSuccess: false, errorCode: apiError.code, message: apiError.message };
      }
    }

    return await createCart(parsed.data);
  } catch (error) {
    console.error(error);
    return { isSuccess: false, errorCode: ActionErrorCode.UnexpectedError };
  }
};

const createCart = async (item: Input): Promise<ActionResult<CartErrorCode>> => {
  const { createCart: result } = await vendyxFetch(CREATE_CART_MUTATION, { input: { item } });
  const [apiError] = result.apiErrors;

  if (apiError) return { isSuccess: false, errorCode: apiError.code, message: apiError.message };
  if (!result.cart) return { isSuccess: false, errorCode: ActionErrorCode.UnexpectedError };

  await setCartId(result.cart.id);
  return { isSuccess: true };
};

const Schema = z.object({
  variantId: z.string().min(1),
  quantity: z.number().int().positive()
});
