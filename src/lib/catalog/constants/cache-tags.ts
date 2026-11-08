export const CatalogCacheTags = {
  Products: 'products',
  Product: (slug: string) => `product:${slug}`,
  Collections: 'collections',
  Collection: (slug: string) => `collection:${slug}`
};
