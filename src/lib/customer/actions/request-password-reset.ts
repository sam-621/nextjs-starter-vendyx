'use server';

import { headers } from 'next/headers';
import { z } from 'zod';

import { REQUEST_PASSWORD_RESET_MUTATION } from '@/lib/vendyx/operations/customer-operations';
import { CustomerErrorCode } from '@/lib/vendyx/types';
import { vendyxFetch } from '@/lib/vendyx/vendyx-client';
import { ActionErrorCode } from '@/shared/constants/action-error-code';
import type { ActionResult } from '@/shared/types/action-result';

export const requestPasswordReset = async (
  _prevState: ActionResult<CustomerErrorCode> | null,
  input: z.infer<typeof Schema>
): Promise<ActionResult<CustomerErrorCode>> => {
  const parsed = Schema.safeParse(input);
  if (!parsed.success) return { isSuccess: false, errorCode: ActionErrorCode.InvalidInput };

  const origin = (await headers()).get('origin');
  if (!origin || new URL(parsed.data.redirectUrl).origin !== origin) {
    return { isSuccess: false, errorCode: ActionErrorCode.InvalidInput };
  }

  try {
    const { requestPasswordReset: result } = await vendyxFetch(
      REQUEST_PASSWORD_RESET_MUTATION,
      parsed.data
    );
    const [apiError] = result.apiErrors;

    if (apiError && apiError.code !== CustomerErrorCode.CustomerNotFound) {
      return { isSuccess: false, errorCode: apiError.code, message: apiError.message };
    }

    return { isSuccess: true };
  } catch (error) {
    console.error(error);
    return { isSuccess: false, errorCode: ActionErrorCode.UnexpectedError };
  }
};

const Schema = z.object({
  email: z.email(),
  redirectUrl: z.url({ protocol: /^https?$/ })
});
