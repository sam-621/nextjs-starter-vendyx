import { graphql } from '../codegen';

export const COLLECTION_CARD_FRAGMENT = graphql(`
  fragment CollectionCard on Collection {
    id
    name
    slug
    description
    assets(input: { take: 1 }) {
      items {
        id
        source
      }
    }
  }
`);

export const GET_COLLECTIONS_QUERY = graphql(`
  query GetCollections($input: CollectionListInput) {
    collections(input: $input) {
      count
      items {
        ...CollectionCard
      }
    }
  }
`);

export const GET_COLLECTION_QUERY = graphql(`
  query GetCollection($slug: String!, $products: ProductListInput) {
    collection(slug: $slug) {
      ...CollectionCard
      products(input: $products) {
        count
        items {
          ...ProductCard
        }
      }
    }
  }
`);
