import 'server-only';

import { redirect } from 'next/navigation';

import { CustomerRoutes } from '../constants/customer-routes';
import { getCustomer } from '../data/get-customer';

export const ensureCustomer = async () => {
  const customer = await getCustomer();
  if (!customer) redirect(CustomerRoutes.SignIn);

  return customer;
};
