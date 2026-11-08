/* eslint-disable */
import * as types from './graphql';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  '\n  fragment Cart on Cart {\n    id\n    total\n    subtotal\n    totalQuantity\n    checkoutUrl\n    appliedDiscounts {\n      code\n      discountedAmount\n    }\n    items {\n      items {\n        id\n        quantity\n        unitPrice\n        total\n        variant {\n          id\n          sku\n          stock\n          optionValues {\n            id\n            name\n          }\n          assets(input: { take: 1 }) {\n            items {\n              id\n              source\n            }\n          }\n          product {\n            id\n            name\n            slug\n            assets(input: { take: 1 }) {\n              items {\n                id\n                source\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n': typeof types.CartFragmentDoc;
  '\n  query GetCart($id: ID!) {\n    cart(id: $id) {\n      ...Cart\n    }\n  }\n': typeof types.GetCartDocument;
  '\n  mutation CreateCart($input: CreateCartInput) {\n    createCart(input: $input) {\n      cart {\n        id\n      }\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n': typeof types.CreateCartDocument;
  '\n  mutation AddItemToCart($cartId: ID!, $input: AddItemToCartInput!) {\n    addItemToCart(cartId: $cartId, input: $input) {\n      cart {\n        id\n      }\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n': typeof types.AddItemToCartDocument;
  '\n  mutation UpdateCartItem($itemId: ID!, $input: UpdateCartItemInput!) {\n    updateCartItem(itemId: $itemId, input: $input) {\n      cart {\n        id\n      }\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n': typeof types.UpdateCartItemDocument;
  '\n  mutation RemoveCartItem($itemId: ID!) {\n    removeCartItem(itemId: $itemId) {\n      cart {\n        id\n      }\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n': typeof types.RemoveCartItemDocument;
  '\n  mutation AddDiscountCodeToCart($cartId: ID!, $code: String!) {\n    addDiscountCodeToCart(cartId: $cartId, code: $code) {\n      cart {\n        id\n      }\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n': typeof types.AddDiscountCodeToCartDocument;
  '\n  mutation AddCustomerToCart($cartId: ID!, $input: AddCustomerToCartInput!) {\n    addCustomerToCart(cartId: $cartId, input: $input) {\n      cart {\n        id\n      }\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n': typeof types.AddCustomerToCartDocument;
  '\n  fragment ProductCard on Product {\n    id\n    name\n    slug\n    minSalePrice\n    maxSalePrice\n    assets(input: { take: 1 }) {\n      items {\n        id\n        source\n      }\n    }\n    variants(input: { take: 1 }) {\n      items {\n        id\n        stock\n        effectiveSalePrice\n        effectiveComparisonPrice\n      }\n    }\n  }\n': typeof types.ProductCardFragmentDoc;
  '\n  fragment ProductDetails on Product {\n    id\n    name\n    slug\n    description\n    minSalePrice\n    maxSalePrice\n    assets {\n      items {\n        id\n        source\n      }\n    }\n    options {\n      id\n      name\n      values {\n        id\n        name\n      }\n    }\n    variants {\n      items {\n        id\n        sku\n        stock\n        effectiveSalePrice\n        effectiveComparisonPrice\n        optionValues {\n          id\n          name\n        }\n        assets {\n          items {\n            id\n            source\n          }\n        }\n      }\n    }\n  }\n': typeof types.ProductDetailsFragmentDoc;
  '\n  query GetProducts($input: ProductListInput) {\n    products(input: $input) {\n      count\n      items {\n        ...ProductCard\n      }\n    }\n  }\n': typeof types.GetProductsDocument;
  '\n  query GetProduct($slug: String!) {\n    product(slug: $slug) {\n      ...ProductDetails\n    }\n  }\n': typeof types.GetProductDocument;
  '\n  fragment CollectionCard on Collection {\n    id\n    name\n    slug\n    description\n    assets(input: { take: 1 }) {\n      items {\n        id\n        source\n      }\n    }\n  }\n': typeof types.CollectionCardFragmentDoc;
  '\n  query GetCollections($input: CollectionListInput) {\n    collections(input: $input) {\n      count\n      items {\n        ...CollectionCard\n      }\n    }\n  }\n': typeof types.GetCollectionsDocument;
  '\n  query GetCollection($slug: String!, $products: ProductListInput) {\n    collection(slug: $slug) {\n      ...CollectionCard\n      products(input: $products) {\n        count\n        items {\n          ...ProductCard\n        }\n      }\n    }\n  }\n': typeof types.GetCollectionDocument;
  '\n  fragment Customer on Customer {\n    id\n    firstName\n    lastName\n    email\n    phoneNumber\n  }\n': typeof types.CustomerFragmentDoc;
  '\n  fragment CustomerOrder on Order {\n    id\n    code\n    state\n    total\n    totalQuantity\n    placedAt\n  }\n': typeof types.CustomerOrderFragmentDoc;
  '\n  query GetCustomer {\n    me {\n      ...Customer\n    }\n  }\n': typeof types.GetCustomerDocument;
  '\n  query GetCustomerOrders($input: OrderListInput) {\n    me {\n      orders(input: $input) {\n        count\n        items {\n          ...CustomerOrder\n        }\n      }\n    }\n  }\n': typeof types.GetCustomerOrdersDocument;
  '\n  mutation SignIn($email: String!, $password: String!) {\n    signInCustomerWithCredentials(email: $email, password: $password) {\n      accessToken\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n': typeof types.SignInDocument;
  '\n  mutation SignUp($input: SignUpWithCredentialsInput!) {\n    signUpCustomerWithCredentials(input: $input) {\n      accessToken\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n': typeof types.SignUpDocument;
  '\n  mutation UpdateCustomer($input: UpdateCustomerInput!) {\n    updateCustomer(input: $input) {\n      customer {\n        ...Customer\n      }\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n': typeof types.UpdateCustomerDocument;
  '\n  mutation SignInWithGoogle($token: String!) {\n    signInCustomerWithOauth(provider: GOOGLE, input: { token: $token }) {\n      accessToken\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n': typeof types.SignInWithGoogleDocument;
  '\n  mutation RequestPasswordReset($email: String!, $redirectUrl: String!) {\n    requestPasswordReset(email: $email, input: { redirectUrl: $redirectUrl }) {\n      success\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n': typeof types.RequestPasswordResetDocument;
  '\n  mutation ResetPassword($token: String!, $newPassword: String!) {\n    resetPassword(token: $token, newPassword: $newPassword) {\n      success\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n': typeof types.ResetPasswordDocument;
  '\n  fragment Shop on Shop {\n    id\n    name\n    slug\n    email\n    phoneNumber\n    logo\n    socials {\n      facebook\n      instagram\n      twitter\n    }\n  }\n': typeof types.ShopFragmentDoc;
  '\n  query GetShop($id: ID!) {\n    shop(id: $id) {\n      ...Shop\n    }\n  }\n': typeof types.GetShopDocument;
};
const documents: Documents = {
  '\n  fragment Cart on Cart {\n    id\n    total\n    subtotal\n    totalQuantity\n    checkoutUrl\n    appliedDiscounts {\n      code\n      discountedAmount\n    }\n    items {\n      items {\n        id\n        quantity\n        unitPrice\n        total\n        variant {\n          id\n          sku\n          stock\n          optionValues {\n            id\n            name\n          }\n          assets(input: { take: 1 }) {\n            items {\n              id\n              source\n            }\n          }\n          product {\n            id\n            name\n            slug\n            assets(input: { take: 1 }) {\n              items {\n                id\n                source\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n':
    types.CartFragmentDoc,
  '\n  query GetCart($id: ID!) {\n    cart(id: $id) {\n      ...Cart\n    }\n  }\n':
    types.GetCartDocument,
  '\n  mutation CreateCart($input: CreateCartInput) {\n    createCart(input: $input) {\n      cart {\n        id\n      }\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n':
    types.CreateCartDocument,
  '\n  mutation AddItemToCart($cartId: ID!, $input: AddItemToCartInput!) {\n    addItemToCart(cartId: $cartId, input: $input) {\n      cart {\n        id\n      }\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n':
    types.AddItemToCartDocument,
  '\n  mutation UpdateCartItem($itemId: ID!, $input: UpdateCartItemInput!) {\n    updateCartItem(itemId: $itemId, input: $input) {\n      cart {\n        id\n      }\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n':
    types.UpdateCartItemDocument,
  '\n  mutation RemoveCartItem($itemId: ID!) {\n    removeCartItem(itemId: $itemId) {\n      cart {\n        id\n      }\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n':
    types.RemoveCartItemDocument,
  '\n  mutation AddDiscountCodeToCart($cartId: ID!, $code: String!) {\n    addDiscountCodeToCart(cartId: $cartId, code: $code) {\n      cart {\n        id\n      }\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n':
    types.AddDiscountCodeToCartDocument,
  '\n  mutation AddCustomerToCart($cartId: ID!, $input: AddCustomerToCartInput!) {\n    addCustomerToCart(cartId: $cartId, input: $input) {\n      cart {\n        id\n      }\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n':
    types.AddCustomerToCartDocument,
  '\n  fragment ProductCard on Product {\n    id\n    name\n    slug\n    minSalePrice\n    maxSalePrice\n    assets(input: { take: 1 }) {\n      items {\n        id\n        source\n      }\n    }\n    variants(input: { take: 1 }) {\n      items {\n        id\n        stock\n        effectiveSalePrice\n        effectiveComparisonPrice\n      }\n    }\n  }\n':
    types.ProductCardFragmentDoc,
  '\n  fragment ProductDetails on Product {\n    id\n    name\n    slug\n    description\n    minSalePrice\n    maxSalePrice\n    assets {\n      items {\n        id\n        source\n      }\n    }\n    options {\n      id\n      name\n      values {\n        id\n        name\n      }\n    }\n    variants {\n      items {\n        id\n        sku\n        stock\n        effectiveSalePrice\n        effectiveComparisonPrice\n        optionValues {\n          id\n          name\n        }\n        assets {\n          items {\n            id\n            source\n          }\n        }\n      }\n    }\n  }\n':
    types.ProductDetailsFragmentDoc,
  '\n  query GetProducts($input: ProductListInput) {\n    products(input: $input) {\n      count\n      items {\n        ...ProductCard\n      }\n    }\n  }\n':
    types.GetProductsDocument,
  '\n  query GetProduct($slug: String!) {\n    product(slug: $slug) {\n      ...ProductDetails\n    }\n  }\n':
    types.GetProductDocument,
  '\n  fragment CollectionCard on Collection {\n    id\n    name\n    slug\n    description\n    assets(input: { take: 1 }) {\n      items {\n        id\n        source\n      }\n    }\n  }\n':
    types.CollectionCardFragmentDoc,
  '\n  query GetCollections($input: CollectionListInput) {\n    collections(input: $input) {\n      count\n      items {\n        ...CollectionCard\n      }\n    }\n  }\n':
    types.GetCollectionsDocument,
  '\n  query GetCollection($slug: String!, $products: ProductListInput) {\n    collection(slug: $slug) {\n      ...CollectionCard\n      products(input: $products) {\n        count\n        items {\n          ...ProductCard\n        }\n      }\n    }\n  }\n':
    types.GetCollectionDocument,
  '\n  fragment Customer on Customer {\n    id\n    firstName\n    lastName\n    email\n    phoneNumber\n  }\n':
    types.CustomerFragmentDoc,
  '\n  fragment CustomerOrder on Order {\n    id\n    code\n    state\n    total\n    totalQuantity\n    placedAt\n  }\n':
    types.CustomerOrderFragmentDoc,
  '\n  query GetCustomer {\n    me {\n      ...Customer\n    }\n  }\n': types.GetCustomerDocument,
  '\n  query GetCustomerOrders($input: OrderListInput) {\n    me {\n      orders(input: $input) {\n        count\n        items {\n          ...CustomerOrder\n        }\n      }\n    }\n  }\n':
    types.GetCustomerOrdersDocument,
  '\n  mutation SignIn($email: String!, $password: String!) {\n    signInCustomerWithCredentials(email: $email, password: $password) {\n      accessToken\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n':
    types.SignInDocument,
  '\n  mutation SignUp($input: SignUpWithCredentialsInput!) {\n    signUpCustomerWithCredentials(input: $input) {\n      accessToken\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n':
    types.SignUpDocument,
  '\n  mutation UpdateCustomer($input: UpdateCustomerInput!) {\n    updateCustomer(input: $input) {\n      customer {\n        ...Customer\n      }\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n':
    types.UpdateCustomerDocument,
  '\n  mutation SignInWithGoogle($token: String!) {\n    signInCustomerWithOauth(provider: GOOGLE, input: { token: $token }) {\n      accessToken\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n':
    types.SignInWithGoogleDocument,
  '\n  mutation RequestPasswordReset($email: String!, $redirectUrl: String!) {\n    requestPasswordReset(email: $email, input: { redirectUrl: $redirectUrl }) {\n      success\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n':
    types.RequestPasswordResetDocument,
  '\n  mutation ResetPassword($token: String!, $newPassword: String!) {\n    resetPassword(token: $token, newPassword: $newPassword) {\n      success\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n':
    types.ResetPasswordDocument,
  '\n  fragment Shop on Shop {\n    id\n    name\n    slug\n    email\n    phoneNumber\n    logo\n    socials {\n      facebook\n      instagram\n      twitter\n    }\n  }\n':
    types.ShopFragmentDoc,
  '\n  query GetShop($id: ID!) {\n    shop(id: $id) {\n      ...Shop\n    }\n  }\n':
    types.GetShopDocument
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment Cart on Cart {\n    id\n    total\n    subtotal\n    totalQuantity\n    checkoutUrl\n    appliedDiscounts {\n      code\n      discountedAmount\n    }\n    items {\n      items {\n        id\n        quantity\n        unitPrice\n        total\n        variant {\n          id\n          sku\n          stock\n          optionValues {\n            id\n            name\n          }\n          assets(input: { take: 1 }) {\n            items {\n              id\n              source\n            }\n          }\n          product {\n            id\n            name\n            slug\n            assets(input: { take: 1 }) {\n              items {\n                id\n                source\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n'
): typeof import('./graphql').CartFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetCart($id: ID!) {\n    cart(id: $id) {\n      ...Cart\n    }\n  }\n'
): typeof import('./graphql').GetCartDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateCart($input: CreateCartInput) {\n    createCart(input: $input) {\n      cart {\n        id\n      }\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n'
): typeof import('./graphql').CreateCartDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation AddItemToCart($cartId: ID!, $input: AddItemToCartInput!) {\n    addItemToCart(cartId: $cartId, input: $input) {\n      cart {\n        id\n      }\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n'
): typeof import('./graphql').AddItemToCartDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateCartItem($itemId: ID!, $input: UpdateCartItemInput!) {\n    updateCartItem(itemId: $itemId, input: $input) {\n      cart {\n        id\n      }\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n'
): typeof import('./graphql').UpdateCartItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation RemoveCartItem($itemId: ID!) {\n    removeCartItem(itemId: $itemId) {\n      cart {\n        id\n      }\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n'
): typeof import('./graphql').RemoveCartItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation AddDiscountCodeToCart($cartId: ID!, $code: String!) {\n    addDiscountCodeToCart(cartId: $cartId, code: $code) {\n      cart {\n        id\n      }\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n'
): typeof import('./graphql').AddDiscountCodeToCartDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation AddCustomerToCart($cartId: ID!, $input: AddCustomerToCartInput!) {\n    addCustomerToCart(cartId: $cartId, input: $input) {\n      cart {\n        id\n      }\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n'
): typeof import('./graphql').AddCustomerToCartDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment ProductCard on Product {\n    id\n    name\n    slug\n    minSalePrice\n    maxSalePrice\n    assets(input: { take: 1 }) {\n      items {\n        id\n        source\n      }\n    }\n    variants(input: { take: 1 }) {\n      items {\n        id\n        stock\n        effectiveSalePrice\n        effectiveComparisonPrice\n      }\n    }\n  }\n'
): typeof import('./graphql').ProductCardFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment ProductDetails on Product {\n    id\n    name\n    slug\n    description\n    minSalePrice\n    maxSalePrice\n    assets {\n      items {\n        id\n        source\n      }\n    }\n    options {\n      id\n      name\n      values {\n        id\n        name\n      }\n    }\n    variants {\n      items {\n        id\n        sku\n        stock\n        effectiveSalePrice\n        effectiveComparisonPrice\n        optionValues {\n          id\n          name\n        }\n        assets {\n          items {\n            id\n            source\n          }\n        }\n      }\n    }\n  }\n'
): typeof import('./graphql').ProductDetailsFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetProducts($input: ProductListInput) {\n    products(input: $input) {\n      count\n      items {\n        ...ProductCard\n      }\n    }\n  }\n'
): typeof import('./graphql').GetProductsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetProduct($slug: String!) {\n    product(slug: $slug) {\n      ...ProductDetails\n    }\n  }\n'
): typeof import('./graphql').GetProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CollectionCard on Collection {\n    id\n    name\n    slug\n    description\n    assets(input: { take: 1 }) {\n      items {\n        id\n        source\n      }\n    }\n  }\n'
): typeof import('./graphql').CollectionCardFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetCollections($input: CollectionListInput) {\n    collections(input: $input) {\n      count\n      items {\n        ...CollectionCard\n      }\n    }\n  }\n'
): typeof import('./graphql').GetCollectionsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetCollection($slug: String!, $products: ProductListInput) {\n    collection(slug: $slug) {\n      ...CollectionCard\n      products(input: $products) {\n        count\n        items {\n          ...ProductCard\n        }\n      }\n    }\n  }\n'
): typeof import('./graphql').GetCollectionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment Customer on Customer {\n    id\n    firstName\n    lastName\n    email\n    phoneNumber\n  }\n'
): typeof import('./graphql').CustomerFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CustomerOrder on Order {\n    id\n    code\n    state\n    total\n    totalQuantity\n    placedAt\n  }\n'
): typeof import('./graphql').CustomerOrderFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetCustomer {\n    me {\n      ...Customer\n    }\n  }\n'
): typeof import('./graphql').GetCustomerDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetCustomerOrders($input: OrderListInput) {\n    me {\n      orders(input: $input) {\n        count\n        items {\n          ...CustomerOrder\n        }\n      }\n    }\n  }\n'
): typeof import('./graphql').GetCustomerOrdersDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation SignIn($email: String!, $password: String!) {\n    signInCustomerWithCredentials(email: $email, password: $password) {\n      accessToken\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n'
): typeof import('./graphql').SignInDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation SignUp($input: SignUpWithCredentialsInput!) {\n    signUpCustomerWithCredentials(input: $input) {\n      accessToken\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n'
): typeof import('./graphql').SignUpDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateCustomer($input: UpdateCustomerInput!) {\n    updateCustomer(input: $input) {\n      customer {\n        ...Customer\n      }\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n'
): typeof import('./graphql').UpdateCustomerDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation SignInWithGoogle($token: String!) {\n    signInCustomerWithOauth(provider: GOOGLE, input: { token: $token }) {\n      accessToken\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n'
): typeof import('./graphql').SignInWithGoogleDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation RequestPasswordReset($email: String!, $redirectUrl: String!) {\n    requestPasswordReset(email: $email, input: { redirectUrl: $redirectUrl }) {\n      success\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n'
): typeof import('./graphql').RequestPasswordResetDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation ResetPassword($token: String!, $newPassword: String!) {\n    resetPassword(token: $token, newPassword: $newPassword) {\n      success\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n'
): typeof import('./graphql').ResetPasswordDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment Shop on Shop {\n    id\n    name\n    slug\n    email\n    phoneNumber\n    logo\n    socials {\n      facebook\n      instagram\n      twitter\n    }\n  }\n'
): typeof import('./graphql').ShopFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetShop($id: ID!) {\n    shop(id: $id) {\n      ...Shop\n    }\n  }\n'
): typeof import('./graphql').GetShopDocument;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
