import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';

import { GET_SHOP_QUERY } from '@/lib/vendyx/operations/shop-operations';
import { vendyxFetch } from '@/lib/vendyx/vendyx-client';
import { VendyxConfig } from '@/lib/vendyx/vendyx-config';

import { ShopCacheTags } from '../constants/cache-tags';

export const getShop = async () => {
  'use cache';
  cacheLife('days');
  cacheTag(ShopCacheTags.Shop);

  const { shop } = await vendyxFetch(GET_SHOP_QUERY, { id: VendyxConfig.shopId });

  return shop ?? null;
};
