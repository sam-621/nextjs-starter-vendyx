import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';

import { GET_COLLECTIONS_QUERY } from '@/lib/vendyx/operations/catalog-operations';
import type { CollectionListInput } from '@/lib/vendyx/types';
import { vendyxFetch } from '@/lib/vendyx/vendyx-client';

import { CatalogCacheTags } from '../constants/cache-tags';

export const getCollections = async (input?: CollectionListInput) => {
  'use cache';
  cacheLife('hours');
  cacheTag(CatalogCacheTags.Collections);

  const { collections } = await vendyxFetch(GET_COLLECTIONS_QUERY, { input });

  return collections;
};
