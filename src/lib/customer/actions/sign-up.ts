'use server';

import { z } from 'zod';

import { ActionErrorCode, type ActionResult } from '@/lib/vendyx/action-result';
import { SIGN_UP_MUTATION } from '@/lib/vendyx/operations/customer-operations';
import type { CustomerErrorCode } from '@/lib/vendyx/types';
import { vendyxFetch } from '@/lib/vendyx/vendyx-client';

import { setCustomerToken } from '../utils/customer-token-utils';

export const signUp = async (
  input: z.infer<typeof Schema>
): Promise<ActionResult<CustomerErrorCode>> => {
  const parsed = Schema.safeParse(input);
  if (!parsed.success) return { isSuccess: false, errorCode: ActionErrorCode.InvalidInput };

  try {
    const { signUpCustomerWithCredentials: result } = await vendyxFetch(SIGN_UP_MUTATION, {
      input: parsed.data
    });
    const [apiError] = result.apiErrors;

    if (apiError) return { isSuccess: false, errorCode: apiError.code, message: apiError.message };
    if (!result.accessToken) {
      return { isSuccess: false, errorCode: ActionErrorCode.UnexpectedError };
    }

    await setCustomerToken(result.accessToken);
    return { isSuccess: true };
  } catch (error) {
    console.error(error);
    return { isSuccess: false, errorCode: ActionErrorCode.UnexpectedError };
  }
};

const Schema = z.object({
  email: z.email(),
  password: z.string().min(8),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  phoneNumber: z.string().min(1).optional()
});
