'use server';

import { refresh } from 'next/cache';
import { z } from 'zod';

import { getCartError } from '@/lib/vendyx/errors/cart-errors';
import { ADD_CUSTOMER_TO_CART_MUTATION } from '@/lib/vendyx/operations/cart-operations';
import type { AddCustomerToCartInput, CartErrorCode } from '@/lib/vendyx/types';
import { vendyxFetch } from '@/lib/vendyx/vendyx-client';
import { GENERIC_ERROR, INVALID_INPUT_ERROR } from '@/shared/constants/errors';
import type { ActionResult } from '@/shared/types/action-result';

import { getCartId } from '../utils/cart-id-utils';

export const addCustomerToCart = async (
  input: AddCustomerToCartInput
): Promise<ActionResult<CartErrorCode>> => {
  const parsed = Schema.safeParse(input);
  if (!parsed.success) return { isSuccess: false, error: INVALID_INPUT_ERROR };

  const cartId = await getCartId();
  if (!cartId) return { isSuccess: false, ...getCartError('CART_NOT_FOUND') };

  try {
    const { addCustomerToCart: result } = await vendyxFetch(ADD_CUSTOMER_TO_CART_MUTATION, {
      cartId,
      input: parsed.data
    });
    const [apiError] = result.apiErrors;

    if (apiError) return { isSuccess: false, ...getCartError(apiError.code) };

    refresh();
    return { isSuccess: true };
  } catch (error) {
    console.error(error);
    return { isSuccess: false, error: GENERIC_ERROR };
  }
};

const Schema = z
  .object({
    email: z.email().nullish(),
    firstName: z.string().nullish(),
    lastName: z.string().nullish(),
    phoneNumber: z.string().nullish()
  })
  .refine(values => values.email || values.phoneNumber);
