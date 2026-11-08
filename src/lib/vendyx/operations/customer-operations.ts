import { graphql } from '../codegen';

export const CUSTOMER_FRAGMENT = graphql(`
  fragment Customer on Customer {
    id
    firstName
    lastName
    email
    phoneNumber
  }
`);

export const CUSTOMER_ORDER_FRAGMENT = graphql(`
  fragment CustomerOrder on Order {
    id
    code
    state
    total
    totalQuantity
    placedAt
  }
`);

export const GET_CUSTOMER_QUERY = graphql(`
  query GetCustomer {
    me {
      ...Customer
    }
  }
`);

export const GET_CUSTOMER_ORDERS_QUERY = graphql(`
  query GetCustomerOrders($input: OrderListInput) {
    me {
      orders(input: $input) {
        count
        items {
          ...CustomerOrder
        }
      }
    }
  }
`);

export const SIGN_IN_MUTATION = graphql(`
  mutation SignIn($email: String!, $password: String!) {
    signInCustomerWithCredentials(email: $email, password: $password) {
      accessToken
      apiErrors {
        code
        message
      }
    }
  }
`);

export const SIGN_UP_MUTATION = graphql(`
  mutation SignUp($input: SignUpWithCredentialsInput!) {
    signUpCustomerWithCredentials(input: $input) {
      accessToken
      apiErrors {
        code
        message
      }
    }
  }
`);

export const UPDATE_CUSTOMER_MUTATION = graphql(`
  mutation UpdateCustomer($input: UpdateCustomerInput!) {
    updateCustomer(input: $input) {
      customer {
        ...Customer
      }
      apiErrors {
        code
        message
      }
    }
  }
`);

export const SIGN_IN_WITH_GOOGLE_MUTATION = graphql(`
  mutation SignInWithGoogle($token: String!) {
    signInCustomerWithOauth(provider: GOOGLE, input: { token: $token }) {
      accessToken
      apiErrors {
        code
        message
      }
    }
  }
`);

export const REQUEST_PASSWORD_RESET_MUTATION = graphql(`
  mutation RequestPasswordReset($email: String!, $redirectUrl: String!) {
    requestPasswordReset(email: $email, input: { redirectUrl: $redirectUrl }) {
      success
      apiErrors {
        code
        message
      }
    }
  }
`);

export const RESET_PASSWORD_MUTATION = graphql(`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword) {
      success
      apiErrors {
        code
        message
      }
    }
  }
`);
