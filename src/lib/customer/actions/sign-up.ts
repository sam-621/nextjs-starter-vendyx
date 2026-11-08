'use server';

import { z } from 'zod';

import { getCustomerError } from '@/lib/vendyx/errors/customer-errors';
import { SIGN_UP_MUTATION } from '@/lib/vendyx/operations/customer-operations';
import type { CustomerErrorCode } from '@/lib/vendyx/types';
import { vendyxFetch } from '@/lib/vendyx/vendyx-client';
import { GENERIC_ERROR, INVALID_INPUT_ERROR } from '@/shared/constants/errors';
import type { ActionResult } from '@/shared/types/action-result';
import { getFormValues } from '@/shared/utils/form-data-utils';

import { setCustomerToken } from '../utils/customer-token-utils';

export const signUp = async (
  _prevState: ActionResult<CustomerErrorCode> | null,
  formData: FormData
): Promise<ActionResult<CustomerErrorCode>> => {
  const parsed = Schema.safeParse(getFormValues(formData));
  if (!parsed.success) return { isSuccess: false, error: INVALID_INPUT_ERROR };

  try {
    const { signUpCustomerWithCredentials: result } = await vendyxFetch(SIGN_UP_MUTATION, {
      input: parsed.data
    });
    const [apiError] = result.apiErrors;

    if (apiError) return { isSuccess: false, ...getCustomerError(apiError.code) };
    if (!result.accessToken) return { isSuccess: false, error: GENERIC_ERROR };

    await setCustomerToken(result.accessToken);
    return { isSuccess: true };
  } catch (error) {
    console.error(error);
    return { isSuccess: false, error: GENERIC_ERROR };
  }
};

const Schema = z.object({
  email: z.email(),
  password: z.string().min(8),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  phoneNumber: z.string().min(1).optional()
});
