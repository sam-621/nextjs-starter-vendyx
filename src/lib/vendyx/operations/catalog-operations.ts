import { graphql } from '../codegen';

export const PRODUCT_CARD_FRAGMENT = graphql(`
  fragment ProductCard on Product {
    id
    name
    slug
    minSalePrice
    maxSalePrice
    assets(input: { take: 1 }) {
      items {
        id
        source
      }
    }
    variants(input: { take: 1 }) {
      items {
        id
        stock
        effectiveSalePrice
        effectiveComparisonPrice
      }
    }
  }
`);

export const PRODUCT_DETAILS_FRAGMENT = graphql(`
  fragment ProductDetails on Product {
    id
    name
    slug
    description
    minSalePrice
    maxSalePrice
    assets {
      items {
        id
        source
      }
    }
    options {
      id
      name
      values {
        id
        name
      }
    }
    variants {
      items {
        id
        sku
        stock
        effectiveSalePrice
        effectiveComparisonPrice
        optionValues {
          id
          name
        }
        assets {
          items {
            id
            source
          }
        }
      }
    }
  }
`);

export const GET_PRODUCTS_QUERY = graphql(`
  query GetProducts($input: ProductListInput) {
    products(input: $input) {
      count
      items {
        ...ProductCard
      }
    }
  }
`);

export const GET_PRODUCT_QUERY = graphql(`
  query GetProduct($slug: String!) {
    product(slug: $slug) {
      ...ProductDetails
    }
  }
`);
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

export const GET_PRODUCT_SLUGS_QUERY = graphql(`
  query GetProductSlugs($input: ProductListInput) {
    products(input: $input) {
      count
      items {
        slug
        updatedAt
      }
    }
  }
`);

export const GET_COLLECTION_SLUGS_QUERY = graphql(`
  query GetCollectionSlugs($input: CollectionListInput) {
    collections(input: $input) {
      count
      items {
        slug
        updatedAt
      }
    }
  }
`);
