import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';

import { GET_COLLECTION_SLUGS_QUERY } from '@/lib/vendyx/operations/catalog-operations';
import { vendyxFetch } from '@/lib/vendyx/vendyx-client';

import { CatalogCacheTags } from '../constants/cache-tags';

const PAGE_SIZE = 100;

export const getCollectionSlugs = async () => {
  'use cache';
  cacheLife('hours');
  cacheTag(CatalogCacheTags.Collections);

  const slugs: { slug: string; updatedAt: string }[] = [];

  while (true) {
    const { collections } = await vendyxFetch(GET_COLLECTION_SLUGS_QUERY, {
      input: { skip: slugs.length, take: PAGE_SIZE }
    });

    slugs.push(...collections.items);

    if (collections.items.length < PAGE_SIZE || slugs.length >= collections.count) return slugs;
  }
};
