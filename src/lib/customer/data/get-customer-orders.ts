import 'server-only';

import { GET_CUSTOMER_ORDERS_QUERY } from '@/lib/vendyx/operations/customer-operations';
import type { OrderListInput } from '@/lib/vendyx/types';
import { vendyxFetch } from '@/lib/vendyx/vendyx-client';

import { getCustomerToken } from './customer-token';

export const getCustomerOrders = async (input?: OrderListInput) => {
  const accessToken = await getCustomerToken();
  if (!accessToken) return null;

  const { me } = await vendyxFetch(GET_CUSTOMER_ORDERS_QUERY, { input }, { accessToken });

  return me?.orders ?? null;
};
