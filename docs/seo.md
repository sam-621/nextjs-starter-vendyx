# SEO

What the template sets up for search engines and link previews, and what each product or collection page has to add.

## Source of truth

- The shop's public URL is the `SITE_URL` environment variable (for example `https://tienda.com`), read in `src/shared/utils/site-url.ts`. It's fixed on purpose: canonical URLs, the sitemap and Open Graph must not change if someone edits the shop in Vendyx, and they can't come from the request's host (that would make every page dynamic and let each domain variant claim to be canonical). Without it, it falls back to `http://localhost:3001`.
- The shop's name comes from `getShop()`, configured in the Vendyx admin.
- Product and collection descriptions are HTML (Vendyx's editor). `toPlainText` turns them into text for meta descriptions and JSON-LD.

## What the template ships

| File | What it does |
|------|--------------|
| `src/app/layout.tsx` | `generateMetadata`: `metadataBase` from `SITE_URL`, title template `%s \| <shop name>`, Open Graph `siteName` and locale, and the shop logo as icon. |
| `src/app/sitemap.ts` | Home, every collection (`/collections/<slug>`) and every product (`/products/<slug>`), with `lastModified` from Vendyx. |
| `src/app/robots.ts` | Allows everything and points to the sitemap. |
| `src/lib/catalog/data/get-product-slugs.ts`, `get-collection-slugs.ts` | Every slug with its `updatedAt`, paginated, cached with the catalog tags. |
| `src/shared/utils/metadata.ts` | `getProductMetadata(product, path)` and `getCollectionMetadata(collection, path)`: title, description, canonical, Open Graph and Twitter card. |
| `src/shared/utils/json-ld.ts` | `getProductJsonLd(product, url)`, with an absolute `url`: schema.org `Product` with an `AggregateOffer` (price range, currency, availability). |
| `src/shared/components/json-ld/json-ld.tsx` | `JsonLd`: renders the data in a `<script type="application/ld+json">`, escaping `<`. |
| `src/shared/utils/plain-text.ts` | `toPlainText(html, maxLength?)`. |
| `src/shared/utils/site-url.ts` | `SITE_URL` and `getAbsoluteUrl(path)`. |

The sitemap paths (`/products/<slug>`, `/collections/<slug>`) are the template's default. A shop with other routes changes them in `sitemap.ts` and passes its own paths to the metadata utilities.

## Product page

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getProduct } from '@/lib/catalog/data/get-product';
import { JsonLd } from '@/shared/components/json-ld/json-ld';
import { getProductJsonLd } from '@/shared/utils/json-ld';
import { getProductMetadata } from '@/shared/utils/metadata';
import { getAbsoluteUrl } from '@/shared/utils/site-url';

export const generateMetadata = async ({
  params
}: PageProps<'/products/[slug]'>): Promise<Metadata> => {
  const { slug } = await params;
  const product = await getProduct(slug);

  return product ? getProductMetadata(product, `/products/${slug}`) : {};
};

export default async function Page({ params }: PageProps<'/products/[slug]'>) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  return (
    <>
      <JsonLd data={getProductJsonLd(product, getAbsoluteUrl(`/products/${slug}`))} />
      ...
    </>
  );
}
```

- `getProduct` is cached, so calling it in `generateMetadata` and in the page is one request to Vendyx.
- Metadata paths are relative; `metadataBase` from the layout makes them absolute. JSON-LD isn't metadata, so its `url` is built with `getAbsoluteUrl`.
- Collections use `getCollectionMetadata` the same way.

## Rules

- Every product and collection page exports `generateMetadata` with the utilities above and has a canonical path.
- Every product page renders `JsonLd` with `getProductJsonLd`.
- Pages that shouldn't be indexed (account, cart, checkout return) export `metadata = { robots: { index: false } }`.
- Images in metadata are Vendyx's asset URLs, already absolute.
- Structured data is checked with Google's [Rich Results Test](https://search.google.com/test/rich-results) before going live.

## Build

The layout (shop name) and `sitemap.ts` (slugs) read from Vendyx, so `yarn build` needs `VENDYX_SHOP_ID` and `VENDYX_STOREFRONT_API_KEY`. Without them the build fails while prerendering. `robots.ts` only needs `SITE_URL`.
