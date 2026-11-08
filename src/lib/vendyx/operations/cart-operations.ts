import { graphql } from '../codegen';

export const CART_FRAGMENT = graphql(`
  fragment Cart on Cart {
    id
    total
    subtotal
    totalQuantity
    checkoutUrl
    appliedDiscounts {
      code
      discountedAmount
    }
    items {
      items {
        id
        quantity
        unitPrice
        total
        variant {
          id
          sku
          stock
          optionValues {
            id
            name
          }
          assets(input: { take: 1 }) {
            items {
              id
              source
            }
          }
          product {
            id
            name
            slug
            assets(input: { take: 1 }) {
              items {
                id
                source
              }
            }
          }
        }
      }
    }
  }
`);

export const GET_CART_QUERY = graphql(`
  query GetCart($id: ID!) {
    cart(id: $id) {
      ...Cart
    }
  }
`);

export const CREATE_CART_MUTATION = graphql(`
  mutation CreateCart($input: CreateCartInput) {
    createCart(input: $input) {
      cart {
        id
      }
      apiErrors {
        code
        message
      }
    }
  }
`);

export const ADD_ITEM_TO_CART_MUTATION = graphql(`
  mutation AddItemToCart($cartId: ID!, $input: AddItemToCartInput!) {
    addItemToCart(cartId: $cartId, input: $input) {
      cart {
        id
      }
      apiErrors {
        code
        message
      }
    }
  }
`);

export const UPDATE_CART_ITEM_MUTATION = graphql(`
  mutation UpdateCartItem($itemId: ID!, $input: UpdateCartItemInput!) {
    updateCartItem(itemId: $itemId, input: $input) {
      cart {
        id
      }
      apiErrors {
        code
        message
      }
    }
  }
`);

export const REMOVE_CART_ITEM_MUTATION = graphql(`
  mutation RemoveCartItem($itemId: ID!) {
    removeCartItem(itemId: $itemId) {
      cart {
        id
      }
      apiErrors {
        code
        message
      }
    }
  }
`);

export const ADD_DISCOUNT_CODE_TO_CART_MUTATION = graphql(`
  mutation AddDiscountCodeToCart($cartId: ID!, $code: String!) {
    addDiscountCodeToCart(cartId: $cartId, code: $code) {
      cart {
        id
      }
      apiErrors {
        code
        message
      }
    }
  }
`);

export const ADD_CUSTOMER_TO_CART_MUTATION = graphql(`
  mutation AddCustomerToCart($cartId: ID!, $input: AddCustomerToCartInput!) {
    addCustomerToCart(cartId: $cartId, input: $input) {
      cart {
        id
      }
      apiErrors {
        code
        message
      }
    }
  }
`);
