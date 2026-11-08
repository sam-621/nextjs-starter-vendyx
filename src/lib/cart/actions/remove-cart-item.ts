'use server';

import { refresh } from 'next/cache';
import { z } from 'zod';

import { getCartError } from '@/lib/vendyx/errors/cart-errors';
import { REMOVE_CART_ITEM_MUTATION } from '@/lib/vendyx/operations/cart-operations';
import type { CartErrorCode } from '@/lib/vendyx/types';
import { vendyxFetch } from '@/lib/vendyx/vendyx-client';
import { GENERIC_ERROR, INVALID_INPUT_ERROR } from '@/shared/constants/errors';
import type { ActionResult } from '@/shared/types/action-result';
import { getFormValues } from '@/shared/utils/form-data-utils';

export const removeCartItem = async (
  _prevState: ActionResult<CartErrorCode> | null,
  formData: FormData
): Promise<ActionResult<CartErrorCode>> => {
  const parsed = Schema.safeParse(getFormValues(formData));
  if (!parsed.success) return { isSuccess: false, error: INVALID_INPUT_ERROR };

  try {
    const { removeCartItem: result } = await vendyxFetch(REMOVE_CART_ITEM_MUTATION, parsed.data);
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
  itemId: z.string().min(1)
});
