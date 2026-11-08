import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';

import { GET_PRODUCTS_QUERY } from '@/lib/vendyx/operations/product-operations';
import type { ProductListInput } from '@/lib/vendyx/types';
import { vendyxFetch } from '@/lib/vendyx/vendyx-client';

import { ProductCacheTags } from '../constants/cache-tags';

export const getProducts = async (input?: ProductListInput) => {
  'use cache';
  cacheLife('hours');
  cacheTag(ProductCacheTags.Products);

  const { products } = await vendyxFetch(GET_PRODUCTS_QUERY, { input });

  return products;
};
