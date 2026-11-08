import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';

import { GET_PRODUCT_QUERY } from '@/lib/vendyx/operations/catalog-operations';
import { vendyxFetch } from '@/lib/vendyx/vendyx-client';

import { CatalogCacheTags } from '../constants/cache-tags';

export const getProduct = async (slug: string) => {
  'use cache';
  cacheLife('hours');
  cacheTag(CatalogCacheTags.Product(slug), CatalogCacheTags.Products);

  const { product } = await vendyxFetch(GET_PRODUCT_QUERY, { slug });

  return product ?? null;
};
