import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';

import { GET_COLLECTION_QUERY } from '@/lib/vendyx/operations/catalog-operations';
import type { ProductListInput } from '@/lib/vendyx/types';
import { vendyxFetch } from '@/lib/vendyx/vendyx-client';

import { CatalogCacheTags } from '../constants/cache-tags';

export const getCollection = async (slug: string, products?: ProductListInput) => {
  'use cache';
  cacheLife('hours');
  cacheTag(
    CatalogCacheTags.Collection(slug),
    CatalogCacheTags.Collections,
    CatalogCacheTags.Products
  );

  const { collection } = await vendyxFetch(GET_COLLECTION_QUERY, { slug, products });

  return collection ?? null;
};
