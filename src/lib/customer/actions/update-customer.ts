'use server';

import { refresh } from 'next/cache';
import { z } from 'zod';

import { VendyxUnauthorizedError } from '@/lib/vendyx/errors/vendyx-errors';
import { UPDATE_CUSTOMER_MUTATION } from '@/lib/vendyx/operations/customer-operations';
import type { CustomerErrorCode } from '@/lib/vendyx/types';
import { vendyxFetch } from '@/lib/vendyx/vendyx-client';
import { ActionErrorCode } from '@/shared/constants/action-error-code';
import type { ActionResult } from '@/shared/types/action-result';

import { deleteCustomerToken, getCustomerToken } from '../utils/customer-token-utils';

export const updateCustomer = async (
  _prevState: ActionResult<CustomerErrorCode> | null,
  input: z.infer<typeof Schema>
): Promise<ActionResult<CustomerErrorCode>> => {
  const accessToken = await getCustomerToken();
  if (!accessToken) return { isSuccess: false, errorCode: ActionErrorCode.SessionExpired };

  const parsed = Schema.safeParse(input);
  if (!parsed.success) return { isSuccess: false, errorCode: ActionErrorCode.InvalidInput };

  try {
    const { updateCustomer: result } = await vendyxFetch(
      UPDATE_CUSTOMER_MUTATION,
      { input: parsed.data },
      { accessToken }
    );
    const [apiError] = result.apiErrors;

    if (apiError) return { isSuccess: false, errorCode: apiError.code, message: apiError.message };

    refresh();
    return { isSuccess: true };
  } catch (error) {
    if (error instanceof VendyxUnauthorizedError) {
      await deleteCustomerToken();
      return { isSuccess: false, errorCode: ActionErrorCode.SessionExpired };
    }

    console.error(error);
    return { isSuccess: false, errorCode: ActionErrorCode.UnexpectedError };
  }
};

const Schema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.email().optional(),
  phoneNumber: z.string().min(1).optional()
});
