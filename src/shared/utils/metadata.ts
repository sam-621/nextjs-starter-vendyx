import type { Metadata } from 'next';

import { getShop } from '@/lib/shop/data/get-shop';
import type { CollectionCardFragment, ProductDetailsFragment } from '@/lib/vendyx/types';

import { toPlainText } from './plain-text';

export const OPEN_GRAPH_LOCALE = 'es_MX';

const FALLBACK_SITE_NAME = 'Tienda';
const DESCRIPTION_LENGTH = 160;

export const getSiteName = async () => {
  const shop = await getShop();

  return shop?.name ?? FALLBACK_SITE_NAME;
};

type PageMetadataInput = {
  title: string;
  description?: string | null;
  image?: string;
  path: string;
};

const getPageMetadata = async ({
  title,
  description,
  image,
  path
}: PageMetadataInput): Promise<Metadata> => {
  const siteName = await getSiteName();
  const plainDescription = description ? toPlainText(description, DESCRIPTION_LENGTH) : undefined;
  const images = image ? [{ url: image, alt: title }] : undefined;

  return {
    title,
    description: plainDescription,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName,
      locale: OPEN_GRAPH_LOCALE,
      url: path,
      title,
      description: plainDescription,
      images
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description: plainDescription,
      images
    }
  };
};

export const getProductMetadata = (product: ProductDetailsFragment, path: string) => {
  return getPageMetadata({
    title: product.name,
    description: product.description,
    image: product.assets.items[0]?.source,
    path
  });
};

export const getCollectionMetadata = (collection: CollectionCardFragment, path: string) => {
  return getPageMetadata({
    title: collection.name,
    description: collection.description,
    image: collection.assets.items[0]?.source,
    path
  });
};
