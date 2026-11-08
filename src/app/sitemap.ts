import type { MetadataRoute } from 'next';

import { getCollectionSlugs } from '@/lib/catalog/data/get-collection-slugs';
import { getProductSlugs } from '@/lib/catalog/data/get-product-slugs';
import { getAbsoluteUrl } from '@/shared/utils/site-url';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, collections] = await Promise.all([getProductSlugs(), getCollectionSlugs()]);

  return [
    { url: getAbsoluteUrl('/') },
    ...collections.map(({ slug, updatedAt }) => ({
      url: getAbsoluteUrl(`/collections/${slug}`),
      lastModified: updatedAt
    })),
    ...products.map(({ slug, updatedAt }) => ({
      url: getAbsoluteUrl(`/products/${slug}`),
      lastModified: updatedAt
    }))
  ];
}
