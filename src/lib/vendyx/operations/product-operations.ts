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
