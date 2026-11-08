import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';

import { GET_COLLECTIONS_QUERY } from '@/lib/vendyx/operations/collection-operations';
import type { CollectionListInput } from '@/lib/vendyx/types';
import { vendyxFetch } from '@/lib/vendyx/vendyx-client';

import { CollectionCacheTags } from '../constants/cache-tags';

export const getCollections = async (input?: CollectionListInput) => {
  'use cache';
  cacheLife('hours');
  cacheTag(CollectionCacheTags.Collections);

  const { collections } = await vendyxFetch(GET_COLLECTIONS_QUERY, { input });

  return collections;
};
