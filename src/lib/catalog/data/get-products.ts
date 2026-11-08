import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';

import { GET_PRODUCTS_QUERY } from '@/lib/vendyx/operations/catalog-operations';
import type { ProductListInput } from '@/lib/vendyx/types';
import { vendyxFetch } from '@/lib/vendyx/vendyx-client';

import { CatalogCacheTags } from '../constants/cache-tags';

export const getProducts = async (input?: ProductListInput) => {
  'use cache';
  cacheLife('hours');
  cacheTag(CatalogCacheTags.Products);

  const { products } = await vendyxFetch(GET_PRODUCTS_QUERY, { input });

  return products;
};
