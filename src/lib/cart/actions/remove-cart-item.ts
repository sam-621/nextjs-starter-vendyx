'use server';

import { refresh } from 'next/cache';
import { z } from 'zod';

import { ActionErrorCode, type ActionResult } from '@/lib/vendyx/action-result';
import { REMOVE_CART_ITEM_MUTATION } from '@/lib/vendyx/operations/cart-operations';
import type { CartErrorCode } from '@/lib/vendyx/types';
import { vendyxFetch } from '@/lib/vendyx/vendyx-client';

export const removeCartItem = async (
  input: z.infer<typeof Schema>
): Promise<ActionResult<CartErrorCode>> => {
  const parsed = Schema.safeParse(input);
  if (!parsed.success) return { isSuccess: false, errorCode: ActionErrorCode.InvalidInput };

  try {
    const { removeCartItem: result } = await vendyxFetch(REMOVE_CART_ITEM_MUTATION, parsed.data);
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
  itemId: z.string().min(1)
});
