'use server';

import { refresh } from 'next/cache';
import { z } from 'zod';

import { UPDATE_CART_ITEM_MUTATION } from '@/lib/vendyx/operations/cart-operations';
import type { CartErrorCode } from '@/lib/vendyx/types';
import { vendyxFetch } from '@/lib/vendyx/vendyx-client';
import { ActionErrorCode } from '@/shared/constants/action-error-code';
import type { ActionResult } from '@/shared/types/action-result';

export const updateCartItem = async (
  _prevState: ActionResult<CartErrorCode> | null,
  input: z.infer<typeof Schema>
): Promise<ActionResult<CartErrorCode>> => {
  const parsed = Schema.safeParse(input);
  if (!parsed.success) return { isSuccess: false, errorCode: ActionErrorCode.InvalidInput };

  try {
    const { updateCartItem: result } = await vendyxFetch(UPDATE_CART_ITEM_MUTATION, {
      itemId: parsed.data.itemId,
      input: { quantity: parsed.data.quantity }
    });
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
  itemId: z.string().min(1),
  quantity: z.number().int().min(0)
});
