import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';

import { GET_PRODUCT_SLUGS_QUERY } from '@/lib/vendyx/operations/catalog-operations';
import { vendyxFetch } from '@/lib/vendyx/vendyx-client';

import { CatalogCacheTags } from '../constants/cache-tags';

const PAGE_SIZE = 100;

export const getProductSlugs = async () => {
  'use cache';
  cacheLife('hours');
  cacheTag(CatalogCacheTags.Products);

  const slugs: { slug: string; updatedAt: string }[] = [];

  while (true) {
    const { products } = await vendyxFetch(GET_PRODUCT_SLUGS_QUERY, {
      input: { skip: slugs.length, take: PAGE_SIZE }
    });

    slugs.push(...products.items);

    if (products.items.length < PAGE_SIZE || slugs.length >= products.count) return slugs;
  }
};
