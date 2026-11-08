import { graphql } from '../codegen';

export const SHOP_FRAGMENT = graphql(`
  fragment Shop on Shop {
    id
    name
    slug
    email
    phoneNumber
    logo
    socials {
      facebook
      instagram
      twitter
    }
  }
`);

export const GET_SHOP_QUERY = graphql(`
  query GetShop($id: ID!) {
    shop(id: $id) {
      ...Shop
    }
  }
`);
