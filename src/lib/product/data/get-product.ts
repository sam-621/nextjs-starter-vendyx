import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';

import { GET_PRODUCT_QUERY } from '@/lib/vendyx/operations/product-operations';
import { vendyxFetch } from '@/lib/vendyx/vendyx-client';

import { ProductCacheTags } from '../constants/cache-tags';

export const getProduct = async (slug: string) => {
  'use cache';
  cacheLife('hours');
  cacheTag(ProductCacheTags.Product(slug), ProductCacheTags.Products);

  const { product } = await vendyxFetch(GET_PRODUCT_QUERY, { slug });

  return product ?? null;
};
