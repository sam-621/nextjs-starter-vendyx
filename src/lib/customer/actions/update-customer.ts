'use server';

import { refresh } from 'next/cache';
import { z } from 'zod';

import { getCustomerError } from '@/lib/vendyx/errors/customer-errors';
import { UPDATE_CUSTOMER_MUTATION } from '@/lib/vendyx/operations/customer-operations';
import type { CustomerErrorCode } from '@/lib/vendyx/types';
import { vendyxFetch } from '@/lib/vendyx/vendyx-client';
import { GENERIC_ERROR, INVALID_INPUT_ERROR } from '@/shared/constants/errors';
import type { ActionResult } from '@/shared/types/action-result';
import { getFormValues } from '@/shared/utils/form-data-utils';

import { getCustomerToken } from '../data/customer-token';

export const updateCustomer = async (
  _prevState: ActionResult<CustomerErrorCode> | null,
  formData: FormData
): Promise<ActionResult<CustomerErrorCode>> => {
  const accessToken = await getCustomerToken();
  if (!accessToken) return { isSuccess: false, error: GENERIC_ERROR };

  const parsed = Schema.safeParse(getFormValues(formData));
  if (!parsed.success) return { isSuccess: false, error: INVALID_INPUT_ERROR };

  try {
    const { updateCustomer: result } = await vendyxFetch(
      UPDATE_CUSTOMER_MUTATION,
      { input: parsed.data },
      { accessToken }
    );
    const [apiError] = result.apiErrors;

    if (apiError) return { isSuccess: false, ...getCustomerError(apiError.code) };

    refresh();
    return { isSuccess: true };
  } catch (error) {
    console.error(error);
    return { isSuccess: false, error: GENERIC_ERROR };
  }
};

const Schema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.email().optional(),
  phoneNumber: z.string().min(1).optional()
});
