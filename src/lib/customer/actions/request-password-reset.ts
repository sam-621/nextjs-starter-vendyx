'use server';

import { headers } from 'next/headers';
import { z } from 'zod';

import { getCustomerError } from '@/lib/vendyx/errors/customer-errors';
import { REQUEST_PASSWORD_RESET_MUTATION } from '@/lib/vendyx/operations/customer-operations';
import type { CustomerErrorCode } from '@/lib/vendyx/types';
import { vendyxFetch } from '@/lib/vendyx/vendyx-client';
import { GENERIC_ERROR, INVALID_INPUT_ERROR } from '@/shared/constants/errors';
import type { ActionResult } from '@/shared/types/action-result';
import { getFormValues } from '@/shared/utils/form-data-utils';

import { CustomerRoutes } from '../constants/customer-routes';

export const requestPasswordReset = async (
  _prevState: ActionResult<CustomerErrorCode> | null,
  formData: FormData
): Promise<ActionResult<CustomerErrorCode>> => {
  const parsed = Schema.safeParse(getFormValues(formData));
  if (!parsed.success) return { isSuccess: false, error: INVALID_INPUT_ERROR };

  const origin = (await headers()).get('origin');
  if (!origin) return { isSuccess: false, error: GENERIC_ERROR };

  try {
    const { requestPasswordReset: result } = await vendyxFetch(REQUEST_PASSWORD_RESET_MUTATION, {
      email: parsed.data.email,
      redirectUrl: `${origin}${CustomerRoutes.ResetPassword}`
    });
    const [apiError] = result.apiErrors;

    if (apiError && apiError.code !== 'CUSTOMER_NOT_FOUND') {
      return { isSuccess: false, ...getCustomerError(apiError.code) };
    }

    return { isSuccess: true };
  } catch (error) {
    console.error(error);
    return { isSuccess: false, error: GENERIC_ERROR };
  }
};

const Schema = z.object({
  email: z.email()
});
