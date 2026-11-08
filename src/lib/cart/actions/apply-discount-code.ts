'use server';

import { refresh } from 'next/cache';
import { z } from 'zod';

import { getCartError } from '@/lib/vendyx/errors/cart-errors';
import { ADD_DISCOUNT_CODE_TO_CART_MUTATION } from '@/lib/vendyx/operations/cart-operations';
import type { CartErrorCode } from '@/lib/vendyx/types';
import { vendyxFetch } from '@/lib/vendyx/vendyx-client';
import { GENERIC_ERROR, INVALID_INPUT_ERROR } from '@/shared/constants/errors';
import type { ActionResult } from '@/shared/types/action-result';
import { getFormValues } from '@/shared/utils/form-data-utils';

import { getCartId } from '../data/cart-id';

export const applyDiscountCode = async (
  _prevState: ActionResult<CartErrorCode> | null,
  formData: FormData
): Promise<ActionResult<CartErrorCode>> => {
  const parsed = Schema.safeParse(getFormValues(formData));
  if (!parsed.success) return { isSuccess: false, error: INVALID_INPUT_ERROR };

  const cartId = await getCartId();
  if (!cartId) return { isSuccess: false, ...getCartError('CART_NOT_FOUND') };

  try {
    const { addDiscountCodeToCart: result } = await vendyxFetch(
      ADD_DISCOUNT_CODE_TO_CART_MUTATION,
      { cartId, code: parsed.data.code }
    );
    const [apiError] = result.apiErrors;

    if (apiError) return { isSuccess: false, ...getCartError(apiError.code) };

    refresh();
    return { isSuccess: true };
  } catch (error) {
    console.error(error);
    return { isSuccess: false, error: GENERIC_ERROR };
  }
};

const Schema = z.object({
  code: z.string().trim().min(1)
});
