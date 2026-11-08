'use server';

import { refresh } from 'next/cache';

import { deleteCustomerToken } from '../utils/customer-token-utils';

export const signOut = async () => {
  await deleteCustomerToken();
  refresh();
};
