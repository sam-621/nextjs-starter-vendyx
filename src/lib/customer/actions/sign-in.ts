'use server';

import { z } from 'zod';

import { SIGN_IN_MUTATION } from '@/lib/vendyx/operations/customer-operations';
import type { CustomerErrorCode } from '@/lib/vendyx/types';
import { vendyxFetch } from '@/lib/vendyx/vendyx-client';
import { ActionErrorCode } from '@/shared/constants/action-error-code';
import type { ActionResult } from '@/shared/types/action-result';

import { setCustomerToken } from '../utils/customer-token-utils';

export const signIn = async (
  _prevState: ActionResult<CustomerErrorCode> | null,
  input: z.infer<typeof Schema>
): Promise<ActionResult<CustomerErrorCode>> => {
  const parsed = Schema.safeParse(input);
  if (!parsed.success) return { isSuccess: false, errorCode: ActionErrorCode.InvalidInput };

  try {
    const { signInCustomerWithCredentials: result } = await vendyxFetch(
      SIGN_IN_MUTATION,
      parsed.data
    );
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
  password: z.string().min(1)
});
