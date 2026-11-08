import 'server-only';

import { cache } from 'react';

import { GET_CUSTOMER_QUERY } from '@/lib/vendyx/operations/customer-operations';
import { vendyxFetch } from '@/lib/vendyx/vendyx-client';

import { getCustomerToken } from './customer-token';

export const getCustomer = cache(async () => {
  const accessToken = await getCustomerToken();
  if (!accessToken) return null;

  try {
    const { me } = await vendyxFetch(GET_CUSTOMER_QUERY, {}, { accessToken });

    return me ?? null;
  } catch {
    return null;
  }
});
