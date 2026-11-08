'use server';

import { refresh } from 'next/cache';
import { z } from 'zod';

import { ADD_DISCOUNT_CODE_TO_CART_MUTATION } from '@/lib/vendyx/operations/cart-operations';
import { CartErrorCode } from '@/lib/vendyx/types';
import { vendyxFetch } from '@/lib/vendyx/vendyx-client';
import { ActionErrorCode } from '@/shared/constants/action-error-code';
import type { ActionResult } from '@/shared/types/action-result';

import { getCartId } from '../utils/cart-id-utils';

export const applyDiscountCode = async (
  _prevState: ActionResult<CartErrorCode> | null,
  input: z.infer<typeof Schema>
): Promise<ActionResult<CartErrorCode>> => {
  const parsed = Schema.safeParse(input);
  if (!parsed.success) return { isSuccess: false, errorCode: ActionErrorCode.InvalidInput };

  const cartId = await getCartId();
  if (!cartId) return { isSuccess: false, errorCode: CartErrorCode.CartNotFound };

  try {
    const { addDiscountCodeToCart: result } = await vendyxFetch(
      ADD_DISCOUNT_CODE_TO_CART_MUTATION,
      { cartId, code: parsed.data.code }
    );
    const [apiError] = result.apiErrors;

    if (apiError) return { isSuccess: false, errorCode: apiError.code, message: apiError.message };

    refresh();
    return { isSuccess: true };
  } catch (error) {
    console.error(error);
    return { isSuccess: false, errorCode: ActionErrorCode.UnexpectedError };
  }
};

const Schema = z.object({
  code: z.string().trim().min(1)
});
