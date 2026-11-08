import type { ProductDetailsFragment } from '@/lib/vendyx/types';

import { toPlainText } from './plain-text';
import { CURRENCY, toDecimalPrice } from './price-utils';

const IN_STOCK = 'https://schema.org/InStock';
const OUT_OF_STOCK = 'https://schema.org/OutOfStock';

export const getProductJsonLd = (product: ProductDetailsFragment, url: string) => {
  const variants = product.variants.items;
  const prices = variants.map(variant => variant.effectiveSalePrice);
  const isInStock = variants.some(variant => variant.stock > 0);

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description ? toPlainText(product.description) : undefined,
    image: product.assets.items.map(asset => asset.source),
    sku: variants.length === 1 ? (variants[0].sku ?? undefined) : undefined,
    url,
    offers: variants.length
      ? {
          '@type': 'AggregateOffer',
          priceCurrency: CURRENCY,
          lowPrice: toDecimalPrice(Math.min(...prices)),
          highPrice: toDecimalPrice(Math.max(...prices)),
          offerCount: variants.length,
          availability: isInStock ? IN_STOCK : OUT_OF_STOCK
        }
      : undefined
  };
};
