import type { Metadata } from 'next';

import type { CollectionCardFragment, ProductDetailsFragment } from '@/lib/vendyx/types';

import { toPlainText } from './plain-text';

const DESCRIPTION_LENGTH = 160;

type PageMetadataInput = {
  title: string;
  description?: string | null;
  image?: string;
  path: string;
};

const getPageMetadata = ({ title, description, image, path }: PageMetadataInput): Metadata => {
  const plainDescription = description ? toPlainText(description, DESCRIPTION_LENGTH) : undefined;
  const images = image ? [{ url: image, alt: title }] : undefined;

  return {
    title,
    description: plainDescription,
    alternates: { canonical: path },
    openGraph: { type: 'website', url: path, title, description: plainDescription, images },
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
