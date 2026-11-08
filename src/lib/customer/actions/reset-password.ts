'use server';

import { z } from 'zod';

import { getCustomerError } from '@/lib/vendyx/errors/customer-errors';
import { RESET_PASSWORD_MUTATION } from '@/lib/vendyx/operations/customer-operations';
import type { CustomerErrorCode } from '@/lib/vendyx/types';
import { vendyxFetch } from '@/lib/vendyx/vendyx-client';
import { GENERIC_ERROR, INVALID_INPUT_ERROR } from '@/shared/constants/errors';
import type { ActionResult } from '@/shared/types/action-result';
import { getFormValues } from '@/shared/utils/form-data-utils';

export const resetPassword = async (
  _prevState: ActionResult<CustomerErrorCode> | null,
  formData: FormData
): Promise<ActionResult<CustomerErrorCode>> => {
  const parsed = Schema.safeParse(getFormValues(formData));
  if (!parsed.success) {
    const isMismatch = parsed.error.issues.some(issue => issue.path[0] === 'confirmPassword');

    return isMismatch
      ? { isSuccess: false, ...getCustomerError('PASSWORDS_DO_NOT_MATCH') }
      : { isSuccess: false, error: INVALID_INPUT_ERROR };
  }

  try {
    const { resetPassword: result } = await vendyxFetch(RESET_PASSWORD_MUTATION, {
      token: parsed.data.token,
      newPassword: parsed.data.password
    });
    const [apiError] = result.apiErrors;

    if (apiError) return { isSuccess: false, ...getCustomerError(apiError.code) };

    return { isSuccess: true };
  } catch (error) {
    console.error(error);
    return { isSuccess: false, error: GENERIC_ERROR };
  }
};

const Schema = z
  .object({
    token: z.string().min(1),
    password: z.string().min(8),
    confirmPassword: z.string()
  })
  .refine(values => values.password === values.confirmPassword, { path: ['confirmPassword'] });
