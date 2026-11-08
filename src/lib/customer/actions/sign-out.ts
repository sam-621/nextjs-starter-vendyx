'use server';

import { refresh } from 'next/cache';

import { deleteCustomerToken } from '../data/customer-token';

export const signOut = async () => {
  await deleteCustomerToken();
  refresh();
};
