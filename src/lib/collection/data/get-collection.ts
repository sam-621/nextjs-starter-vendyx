import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';

import { ProductCacheTags } from '@/lib/product/constants/cache-tags';
import { GET_COLLECTION_QUERY } from '@/lib/vendyx/operations/collection-operations';
import type { ProductListInput } from '@/lib/vendyx/types';
import { vendyxFetch } from '@/lib/vendyx/vendyx-client';

import { CollectionCacheTags } from '../constants/cache-tags';

export const getCollection = async (slug: string, products?: ProductListInput) => {
  'use cache';
  cacheLife('hours');
  cacheTag(
    CollectionCacheTags.Collection(slug),
    CollectionCacheTags.Collections,
    ProductCacheTags.Products
  );

  const { collection } = await vendyxFetch(GET_COLLECTION_QUERY, { slug, products });

  return collection ?? null;
};
