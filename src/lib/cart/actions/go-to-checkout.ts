'use server';

import { redirect } from 'next/navigation';

import { getCustomer } from '@/lib/customer/data/get-customer';
import { ADD_CUSTOMER_TO_CART_MUTATION } from '@/lib/vendyx/operations/cart-operations';
import { vendyxFetch } from '@/lib/vendyx/vendyx-client';

import { getCart } from '../data/get-cart';

export const goToCheckout = async () => {
  const cart = await getCart();
  if (!cart) redirect('/');

  const customer = await getCustomer();

  if (customer?.email) {
    try {
      await vendyxFetch(ADD_CUSTOMER_TO_CART_MUTATION, {
        cartId: cart.id,
        input: {
          email: customer.email,
          firstName: customer.firstName,
          lastName: customer.lastName,
          phoneNumber: customer.phoneNumber
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  redirect(cart.checkoutUrl);
};
