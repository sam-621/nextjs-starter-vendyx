import { revalidateTag } from 'next/cache';

import { CatalogCacheTags } from '@/lib/catalog/constants/cache-tags';
import { ShopCacheTags } from '@/lib/shop/constants/cache-tags';

export const POST = async () => {
  revalidateTag(CatalogCacheTags.Products, 'max');
  revalidateTag(CatalogCacheTags.Collections, 'max');
  revalidateTag(ShopCacheTags.Shop, 'max');

  return Response.json({ revalidated: true });
};
