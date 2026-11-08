'use server';

import { refresh } from 'next/cache';
import { z } from 'zod';

import { getCartError } from '@/lib/vendyx/errors/cart-errors';
import {
  ADD_ITEM_TO_CART_MUTATION,
  CREATE_CART_MUTATION
} from '@/lib/vendyx/operations/cart-operations';
import type { AddItemToCartInput, CartErrorCode } from '@/lib/vendyx/types';
import { vendyxFetch } from '@/lib/vendyx/vendyx-client';
import { GENERIC_ERROR, INVALID_INPUT_ERROR } from '@/shared/constants/errors';
import type { ActionResult } from '@/shared/types/action-result';
import { getFormValues } from '@/shared/utils/form-data-utils';

import { getCartId, setCartId } from '../utils/cart-id-utils';

export const addToCart = async (
  _prevState: ActionResult<CartErrorCode> | null,
  formData: FormData
): Promise<ActionResult<CartErrorCode>> => {
  const parsed = Schema.safeParse(getFormValues(formData));
  if (!parsed.success) return { isSuccess: false, error: INVALID_INPUT_ERROR };

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

      if (apiError.code !== 'CART_NOT_FOUND') {
        return { isSuccess: false, ...getCartError(apiError.code) };
      }
    }

    return await createCart(parsed.data);
  } catch (error) {
    console.error(error);
    return { isSuccess: false, error: GENERIC_ERROR };
  }
};

const createCart = async (item: AddItemToCartInput): Promise<ActionResult<CartErrorCode>> => {
  const { createCart: result } = await vendyxFetch(CREATE_CART_MUTATION, { input: { item } });
  const [apiError] = result.apiErrors;

  if (apiError) return { isSuccess: false, ...getCartError(apiError.code) };
  if (!result.cart) return { isSuccess: false, error: GENERIC_ERROR };

  await setCartId(result.cart.id);
  return { isSuccess: true };
};

const Schema = z.object({
  variantId: z.string().min(1),
  quantity: z.coerce.number().int().positive().default(1)
});
