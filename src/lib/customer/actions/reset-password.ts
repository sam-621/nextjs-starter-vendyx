'use server';

import { z } from 'zod';

import { RESET_PASSWORD_MUTATION } from '@/lib/vendyx/operations/customer-operations';
import type { CustomerErrorCode } from '@/lib/vendyx/types';
import { vendyxFetch } from '@/lib/vendyx/vendyx-client';
import { ActionErrorCode } from '@/shared/constants/action-error-code';
import type { ActionResult } from '@/shared/types/action-result';

export const resetPassword = async (
  _prevState: ActionResult<CustomerErrorCode> | null,
  input: z.infer<typeof Schema>
): Promise<ActionResult<CustomerErrorCode>> => {
  const parsed = Schema.safeParse(input);
  if (!parsed.success) return { isSuccess: false, errorCode: ActionErrorCode.InvalidInput };

  try {
    const { resetPassword: result } = await vendyxFetch(RESET_PASSWORD_MUTATION, {
      token: parsed.data.token,
      newPassword: parsed.data.password
    });
    const [apiError] = result.apiErrors;

    if (apiError) return { isSuccess: false, errorCode: apiError.code, message: apiError.message };

    return { isSuccess: true };
  } catch (error) {
    console.error(error);
    return { isSuccess: false, errorCode: ActionErrorCode.UnexpectedError };
  }
};

const Schema = z.object({
  token: z.string().min(1),
  password: z.string().min(8)
});
