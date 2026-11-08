import 'server-only';

import { VendyxUnauthorizedError } from '@/lib/vendyx/errors/vendyx-errors';
import { GET_CUSTOMER_ORDERS_QUERY } from '@/lib/vendyx/operations/customer-operations';
import type { OrderListInput } from '@/lib/vendyx/types';
import { vendyxFetch } from '@/lib/vendyx/vendyx-client';

import { getCustomerToken } from '../utils/customer-token-utils';

export const getCustomerOrders = async (input?: OrderListInput) => {
  const accessToken = await getCustomerToken();
  if (!accessToken) return null;

  try {
    const { me } = await vendyxFetch(GET_CUSTOMER_ORDERS_QUERY, { input }, { accessToken });

    return me?.orders ?? null;
  } catch (error) {
    if (error instanceof VendyxUnauthorizedError) return null;
    throw error;
  }
};
