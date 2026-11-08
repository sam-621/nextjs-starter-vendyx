/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type AddCustomerToCartInput = {
  /**
   * Email used to identify the customer. When no customer exists with it, a new one is created.
   * Either email or phoneNumber is required; when both are given, email takes precedence
   */
  email?: string | null | undefined;
  firstName?: string | null | undefined;
  lastName?: string | null | undefined;
  phoneNumber?: string | null | undefined;
};

export type AddItemToCartInput = {
  quantity: number;
  variantId: string | number;
};

export type BooleanFilter = {
  /** Filter by exact match */
  equals?: boolean | null | undefined;
};

/**  Utils  */
export const CartErrorCode = {
  AssetNotFound: 'ASSET_NOT_FOUND',
  AttachmentsNotAllowed: 'ATTACHMENTS_NOT_ALLOWED',
  CartItemNotFound: 'CART_ITEM_NOT_FOUND',
  CartNotFound: 'CART_NOT_FOUND',
  DiscountCodeNotApplicable: 'DISCOUNT_CODE_NOT_APPLICABLE',
  DiscountHandlerNotFound: 'DISCOUNT_HANDLER_NOT_FOUND',
  ForbiddenCartAction: 'FORBIDDEN_CART_ACTION',
  InvalidInput: 'INVALID_INPUT',
  InvalidPickupLocation: 'INVALID_PICKUP_LOCATION',
  InvalidShippingMethod: 'INVALID_SHIPPING_METHOD',
  MissingShippingAddress: 'MISSING_SHIPPING_ADDRESS',
  NotEnoughStock: 'NOT_ENOUGH_STOCK',
  PaymentFailed: 'PAYMENT_FAILED',
  PaymentHandlerNotFound: 'PAYMENT_HANDLER_NOT_FOUND',
  PaymentMethodNotFound: 'PAYMENT_METHOD_NOT_FOUND',
  PhoneNumberAlreadyExists: 'PHONE_NUMBER_ALREADY_EXISTS',
  PreparePaymentFailed: 'PREPARE_PAYMENT_FAILED',
  VariantNotFound: 'VARIANT_NOT_FOUND'
} as const;

export type CartErrorCode = (typeof CartErrorCode)[keyof typeof CartErrorCode];
export type CollectionFilters = {
  customField?: CustomFieldFilter | null | undefined;
  isTopLevel?: BooleanFilter | null | undefined;
  name?: StringFilter | null | undefined;
};

export type CollectionListInput = {
  /** Filters to apply */
  filters?: CollectionFilters | null | undefined;
  /** Skip the first n results */
  skip?: number | null | undefined;
  /** takes n result from where the skip position is */
  take?: number | null | undefined;
};

export type CreateCartInput = {
  /** Optional first item added to the cart at creation time */
  item?: AddItemToCartInput | null | undefined;
};

export type CustomFieldFilter = {
  key: string;
  value: string;
};

export const CustomerErrorCode = {
  CustomerNotFound: 'CUSTOMER_NOT_FOUND',
  DisabledCustomer: 'DISABLED_CUSTOMER',
  EmailAlreadyExists: 'EMAIL_ALREADY_EXISTS',
  InvalidAccessToken: 'INVALID_ACCESS_TOKEN',
  InvalidCredentials: 'INVALID_CREDENTIALS',
  InvalidEmail: 'INVALID_EMAIL',
  InvalidOauthToken: 'INVALID_OAUTH_TOKEN',
  InvalidPasswordToken: 'INVALID_PASSWORD_TOKEN',
  InvalidPhoneNumber: 'INVALID_PHONE_NUMBER',
  PasswordsDoNotMatch: 'PASSWORDS_DO_NOT_MATCH',
  PhoneNumberAlreadyExists: 'PHONE_NUMBER_ALREADY_EXISTS'
} as const;

export type CustomerErrorCode = (typeof CustomerErrorCode)[keyof typeof CustomerErrorCode];
export type OptionValueFilter = {
  option: string;
  values: Array<string>;
};

export const OrderBy = {
  Asc: 'ASC',
  Desc: 'DESC'
} as const;

export type OrderBy = (typeof OrderBy)[keyof typeof OrderBy];
export type OrderFilters = {
  /** Filter by order code */
  code?: StringFilter | null | undefined;
};

export type OrderListInput = {
  /** Filters to apply */
  filters?: OrderFilters | null | undefined;
  /** Skip the first n results */
  skip?: number | null | undefined;
  /** takes n result from where the skip position is */
  take?: number | null | undefined;
};

/** Order state enum */
export const OrderState = {
  /** The order is being built by the business and has not been placed yet */
  Draft: 'DRAFT',
  /** Every remaining unit has a fulfillment */
  Fulfilled: 'FULFILLED',
  /** There are no units left to fulfill */
  FulfillmentNotRequired: 'FULFILLMENT_NOT_REQUIRED',
  /** The order is being modified by the customer */
  Modifying: 'MODIFYING',
  /** Some units have a fulfillment, others are still pending */
  PartiallyFulfilled: 'PARTIALLY_FULFILLED',
  /** Order has been placed and none of its units has a fulfillment yet */
  Unfulfilled: 'UNFULFILLED'
} as const;

export type OrderState = (typeof OrderState)[keyof typeof OrderState];
export type PriceRange = {
  max?: number | null | undefined;
  min?: number | null | undefined;
};

export type ProductFilters = {
  name?: StringFilter | null | undefined;
  onSale?: BooleanFilter | null | undefined;
  optionValues?: Array<OptionValueFilter> | null | undefined;
  salePriceRange?: PriceRange | null | undefined;
  tag?: string | null | undefined;
};

export type ProductListInput = {
  /** Filters to apply */
  filters?: ProductFilters | null | undefined;
  /** Skip the first n results */
  skip?: number | null | undefined;
  /** Sort order to apply */
  sort?: ProductSort | null | undefined;
  /** takes n result from where the skip position is */
  take?: number | null | undefined;
};

export type ProductSort = {
  bestSeller?: OrderBy | null | undefined;
  createdAt?: OrderBy | null | undefined;
  name?: OrderBy | null | undefined;
  salePrice?: OrderBy | null | undefined;
  stock?: OrderBy | null | undefined;
};

export type SignUpWithCredentialsInput = {
  email: string;
  firstName?: string | null | undefined;
  lastName?: string | null | undefined;
  password: string;
  phoneNumber?: string | null | undefined;
};

export type StringFilter = {
  /** Filter by contains match */
  contains?: string | null | undefined;
  /** Filter by exact match */
  equals?: string | null | undefined;
};

export type UpdateCartItemInput = {
  /** The new item quantity. When 0, the item is removed from the cart */
  quantity: number;
};

export type UpdateCustomerInput = {
  email?: string | null | undefined;
  firstName?: string | null | undefined;
  lastName?: string | null | undefined;
  phoneNumber?: string | null | undefined;
};

export type CartFragment = {
  id: string;
  total: number;
  subtotal: number;
  totalQuantity: number;
  checkoutUrl: string;
  appliedDiscounts: Array<{ code: string; discountedAmount: number }>;
  items: {
    items: Array<{
      id: string;
      quantity: number;
      unitPrice: number;
      total: number;
      variant: {
        id: string;
        sku: string | null;
        stock: number;
        optionValues: Array<{ id: string; name: string }>;
        assets: { items: Array<{ id: string; source: string }> };
        product: {
          id: string;
          name: string;
          slug: string;
          assets: { items: Array<{ id: string; source: string }> };
        };
      };
    }>;
  };
};

export type GetCartQueryVariables = Exact<{
  id: string | number;
}>;

export type GetCartQuery = {
  cart: {
    id: string;
    total: number;
    subtotal: number;
    totalQuantity: number;
    checkoutUrl: string;
    appliedDiscounts: Array<{ code: string; discountedAmount: number }>;
    items: {
      items: Array<{
        id: string;
        quantity: number;
        unitPrice: number;
        total: number;
        variant: {
          id: string;
          sku: string | null;
          stock: number;
          optionValues: Array<{ id: string; name: string }>;
          assets: { items: Array<{ id: string; source: string }> };
          product: {
            id: string;
            name: string;
            slug: string;
            assets: { items: Array<{ id: string; source: string }> };
          };
        };
      }>;
    };
  } | null;
};

export type CreateCartMutationVariables = Exact<{
  input?: CreateCartInput | null | undefined;
}>;

export type CreateCartMutation = {
  createCart: {
    cart: { id: string } | null;
    apiErrors: Array<{ code: CartErrorCode; message: string }>;
  };
};

export type AddItemToCartMutationVariables = Exact<{
  cartId: string | number;
  input: AddItemToCartInput;
}>;

export type AddItemToCartMutation = {
  addItemToCart: {
    cart: { id: string } | null;
    apiErrors: Array<{ code: CartErrorCode; message: string }>;
  };
};

export type UpdateCartItemMutationVariables = Exact<{
  itemId: string | number;
  input: UpdateCartItemInput;
}>;

export type UpdateCartItemMutation = {
  updateCartItem: {
    cart: { id: string } | null;
    apiErrors: Array<{ code: CartErrorCode; message: string }>;
  };
};

export type RemoveCartItemMutationVariables = Exact<{
  itemId: string | number;
}>;

export type RemoveCartItemMutation = {
  removeCartItem: {
    cart: { id: string } | null;
    apiErrors: Array<{ code: CartErrorCode; message: string }>;
  };
};

export type AddDiscountCodeToCartMutationVariables = Exact<{
  cartId: string | number;
  code: string;
}>;

export type AddDiscountCodeToCartMutation = {
  addDiscountCodeToCart: {
    cart: { id: string } | null;
    apiErrors: Array<{ code: CartErrorCode; message: string }>;
  };
};

export type AddCustomerToCartMutationVariables = Exact<{
  cartId: string | number;
  input: AddCustomerToCartInput;
}>;

export type AddCustomerToCartMutation = {
  addCustomerToCart: {
    cart: { id: string } | null;
    apiErrors: Array<{ code: CartErrorCode; message: string }>;
  };
};

export type ProductCardFragment = {
  id: string;
  name: string;
  slug: string;
  minSalePrice: number;
  maxSalePrice: number;
  assets: { items: Array<{ id: string; source: string }> };
  variants: {
    items: Array<{
      id: string;
      stock: number;
      effectiveSalePrice: number;
      effectiveComparisonPrice: number | null;
    }>;
  };
};

export type ProductDetailsFragment = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  minSalePrice: number;
  maxSalePrice: number;
  assets: { items: Array<{ id: string; source: string }> };
  options: Array<{ id: string; name: string; values: Array<{ id: string; name: string }> }>;
  variants: {
    items: Array<{
      id: string;
      sku: string | null;
      stock: number;
      effectiveSalePrice: number;
      effectiveComparisonPrice: number | null;
      optionValues: Array<{ id: string; name: string }>;
      assets: { items: Array<{ id: string; source: string }> };
    }>;
  };
};

export type GetProductsQueryVariables = Exact<{
  input?: ProductListInput | null | undefined;
}>;

export type GetProductsQuery = {
  products: {
    count: number;
    items: Array<{
      id: string;
      name: string;
      slug: string;
      minSalePrice: number;
      maxSalePrice: number;
      assets: { items: Array<{ id: string; source: string }> };
      variants: {
        items: Array<{
          id: string;
          stock: number;
          effectiveSalePrice: number;
          effectiveComparisonPrice: number | null;
        }>;
      };
    }>;
  };
};

export type GetProductQueryVariables = Exact<{
  slug: string;
}>;

export type GetProductQuery = {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    minSalePrice: number;
    maxSalePrice: number;
    assets: { items: Array<{ id: string; source: string }> };
    options: Array<{ id: string; name: string; values: Array<{ id: string; name: string }> }>;
    variants: {
      items: Array<{
        id: string;
        sku: string | null;
        stock: number;
        effectiveSalePrice: number;
        effectiveComparisonPrice: number | null;
        optionValues: Array<{ id: string; name: string }>;
        assets: { items: Array<{ id: string; source: string }> };
      }>;
    };
  } | null;
};

export type CollectionCardFragment = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  assets: { items: Array<{ id: string; source: string }> };
};

export type GetCollectionsQueryVariables = Exact<{
  input?: CollectionListInput | null | undefined;
}>;

export type GetCollectionsQuery = {
  collections: {
    count: number;
    items: Array<{
      id: string;
      name: string;
      slug: string;
      description: string | null;
      assets: { items: Array<{ id: string; source: string }> };
    }>;
  };
};

export type GetCollectionQueryVariables = Exact<{
  slug: string;
  products?: ProductListInput | null | undefined;
}>;

export type GetCollectionQuery = {
  collection: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    products: {
      count: number;
      items: Array<{
        id: string;
        name: string;
        slug: string;
        minSalePrice: number;
        maxSalePrice: number;
        assets: { items: Array<{ id: string; source: string }> };
        variants: {
          items: Array<{
            id: string;
            stock: number;
            effectiveSalePrice: number;
            effectiveComparisonPrice: number | null;
          }>;
        };
      }>;
    };
    assets: { items: Array<{ id: string; source: string }> };
  } | null;
};

export type CustomerFragment = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phoneNumber: string | null;
};

export type CustomerOrderFragment = {
  id: string;
  code: string | null;
  state: OrderState;
  total: number;
  totalQuantity: number;
  placedAt: string | null;
};

export type GetCustomerQueryVariables = Exact<{ [key: string]: never }>;

export type GetCustomerQuery = {
  me: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    phoneNumber: string | null;
  } | null;
};

export type GetCustomerOrdersQueryVariables = Exact<{
  input?: OrderListInput | null | undefined;
}>;

export type GetCustomerOrdersQuery = {
  me: {
    orders: {
      count: number;
      items: Array<{
        id: string;
        code: string | null;
        state: OrderState;
        total: number;
        totalQuantity: number;
        placedAt: string | null;
      }>;
    };
  } | null;
};

export type SignInMutationVariables = Exact<{
  email: string;
  password: string;
}>;

export type SignInMutation = {
  signInCustomerWithCredentials: {
    accessToken: string | null;
    apiErrors: Array<{ code: CustomerErrorCode; message: string }>;
  };
};

export type SignUpMutationVariables = Exact<{
  input: SignUpWithCredentialsInput;
}>;

export type SignUpMutation = {
  signUpCustomerWithCredentials: {
    accessToken: string | null;
    apiErrors: Array<{ code: CustomerErrorCode; message: string }>;
  };
};

export type UpdateCustomerMutationVariables = Exact<{
  input: UpdateCustomerInput;
}>;

export type UpdateCustomerMutation = {
  updateCustomer: {
    customer: {
      id: string;
      firstName: string | null;
      lastName: string | null;
      email: string | null;
      phoneNumber: string | null;
    } | null;
    apiErrors: Array<{ code: CustomerErrorCode; message: string }>;
  };
};

export type SignInWithGoogleMutationVariables = Exact<{
  token: string;
}>;

export type SignInWithGoogleMutation = {
  signInCustomerWithOauth: {
    accessToken: string | null;
    apiErrors: Array<{ code: CustomerErrorCode; message: string }>;
  };
};

export type RequestPasswordResetMutationVariables = Exact<{
  email: string;
  redirectUrl: string;
}>;

export type RequestPasswordResetMutation = {
  requestPasswordReset: {
    success: boolean;
    apiErrors: Array<{ code: CustomerErrorCode; message: string }>;
  };
};

export type ResetPasswordMutationVariables = Exact<{
  token: string;
  newPassword: string;
}>;

export type ResetPasswordMutation = {
  resetPassword: {
    success: boolean;
    apiErrors: Array<{ code: CustomerErrorCode; message: string }>;
  };
};

export type ShopFragment = {
  id: string;
  name: string;
  slug: string;
  email: string;
  phoneNumber: string;
  logo: string | null;
  socials: { facebook: string | null; instagram: string | null; twitter: string | null } | null;
};

export type GetShopQueryVariables = Exact<{
  id: string | number;
}>;

export type GetShopQuery = {
  shop: {
    id: string;
    name: string;
    slug: string;
    email: string;
    phoneNumber: string;
    logo: string | null;
    socials: { facebook: string | null; instagram: string | null; twitter: string | null } | null;
  } | null;
};

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}
export const CartFragmentDoc = new TypedDocumentString(
  `
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
    `,
  { fragmentName: 'Cart' }
) as unknown as TypedDocumentString<CartFragment, unknown>;
export const ProductCardFragmentDoc = new TypedDocumentString(
  `
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
    `,
  { fragmentName: 'ProductCard' }
) as unknown as TypedDocumentString<ProductCardFragment, unknown>;
export const ProductDetailsFragmentDoc = new TypedDocumentString(
  `
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
    `,
  { fragmentName: 'ProductDetails' }
) as unknown as TypedDocumentString<ProductDetailsFragment, unknown>;
export const CollectionCardFragmentDoc = new TypedDocumentString(
  `
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
    `,
  { fragmentName: 'CollectionCard' }
) as unknown as TypedDocumentString<CollectionCardFragment, unknown>;
export const CustomerFragmentDoc = new TypedDocumentString(
  `
    fragment Customer on Customer {
  id
  firstName
  lastName
  email
  phoneNumber
}
    `,
  { fragmentName: 'Customer' }
) as unknown as TypedDocumentString<CustomerFragment, unknown>;
export const CustomerOrderFragmentDoc = new TypedDocumentString(
  `
    fragment CustomerOrder on Order {
  id
  code
  state
  total
  totalQuantity
  placedAt
}
    `,
  { fragmentName: 'CustomerOrder' }
) as unknown as TypedDocumentString<CustomerOrderFragment, unknown>;
export const ShopFragmentDoc = new TypedDocumentString(
  `
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
    `,
  { fragmentName: 'Shop' }
) as unknown as TypedDocumentString<ShopFragment, unknown>;
export const GetCartDocument = new TypedDocumentString(`
    query GetCart($id: ID!) {
  cart(id: $id) {
    ...Cart
  }
}
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
}`) as unknown as TypedDocumentString<GetCartQuery, GetCartQueryVariables>;
export const CreateCartDocument = new TypedDocumentString(`
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
    `) as unknown as TypedDocumentString<CreateCartMutation, CreateCartMutationVariables>;
export const AddItemToCartDocument = new TypedDocumentString(`
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
    `) as unknown as TypedDocumentString<AddItemToCartMutation, AddItemToCartMutationVariables>;
export const UpdateCartItemDocument = new TypedDocumentString(`
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
    `) as unknown as TypedDocumentString<UpdateCartItemMutation, UpdateCartItemMutationVariables>;
export const RemoveCartItemDocument = new TypedDocumentString(`
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
    `) as unknown as TypedDocumentString<RemoveCartItemMutation, RemoveCartItemMutationVariables>;
export const AddDiscountCodeToCartDocument = new TypedDocumentString(`
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
    `) as unknown as TypedDocumentString<
  AddDiscountCodeToCartMutation,
  AddDiscountCodeToCartMutationVariables
>;
export const AddCustomerToCartDocument = new TypedDocumentString(`
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
    `) as unknown as TypedDocumentString<
  AddCustomerToCartMutation,
  AddCustomerToCartMutationVariables
>;
export const GetProductsDocument = new TypedDocumentString(`
    query GetProducts($input: ProductListInput) {
  products(input: $input) {
    count
    items {
      ...ProductCard
    }
  }
}
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
}`) as unknown as TypedDocumentString<GetProductsQuery, GetProductsQueryVariables>;
export const GetProductDocument = new TypedDocumentString(`
    query GetProduct($slug: String!) {
  product(slug: $slug) {
    ...ProductDetails
  }
}
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
}`) as unknown as TypedDocumentString<GetProductQuery, GetProductQueryVariables>;
export const GetCollectionsDocument = new TypedDocumentString(`
    query GetCollections($input: CollectionListInput) {
  collections(input: $input) {
    count
    items {
      ...CollectionCard
    }
  }
}
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
}`) as unknown as TypedDocumentString<GetCollectionsQuery, GetCollectionsQueryVariables>;
export const GetCollectionDocument = new TypedDocumentString(`
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
}`) as unknown as TypedDocumentString<GetCollectionQuery, GetCollectionQueryVariables>;
export const GetCustomerDocument = new TypedDocumentString(`
    query GetCustomer {
  me {
    ...Customer
  }
}
    fragment Customer on Customer {
  id
  firstName
  lastName
  email
  phoneNumber
}`) as unknown as TypedDocumentString<GetCustomerQuery, GetCustomerQueryVariables>;
export const GetCustomerOrdersDocument = new TypedDocumentString(`
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
    fragment CustomerOrder on Order {
  id
  code
  state
  total
  totalQuantity
  placedAt
}`) as unknown as TypedDocumentString<GetCustomerOrdersQuery, GetCustomerOrdersQueryVariables>;
export const SignInDocument = new TypedDocumentString(`
    mutation SignIn($email: String!, $password: String!) {
  signInCustomerWithCredentials(email: $email, password: $password) {
    accessToken
    apiErrors {
      code
      message
    }
  }
}
    `) as unknown as TypedDocumentString<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = new TypedDocumentString(`
    mutation SignUp($input: SignUpWithCredentialsInput!) {
  signUpCustomerWithCredentials(input: $input) {
    accessToken
    apiErrors {
      code
      message
    }
  }
}
    `) as unknown as TypedDocumentString<SignUpMutation, SignUpMutationVariables>;
export const UpdateCustomerDocument = new TypedDocumentString(`
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
    fragment Customer on Customer {
  id
  firstName
  lastName
  email
  phoneNumber
}`) as unknown as TypedDocumentString<UpdateCustomerMutation, UpdateCustomerMutationVariables>;
export const SignInWithGoogleDocument = new TypedDocumentString(`
    mutation SignInWithGoogle($token: String!) {
  signInCustomerWithOauth(provider: GOOGLE, input: { token: $token }) {
    accessToken
    apiErrors {
      code
      message
    }
  }
}
    `) as unknown as TypedDocumentString<
  SignInWithGoogleMutation,
  SignInWithGoogleMutationVariables
>;
export const RequestPasswordResetDocument = new TypedDocumentString(`
    mutation RequestPasswordReset($email: String!, $redirectUrl: String!) {
  requestPasswordReset(email: $email, input: { redirectUrl: $redirectUrl }) {
    success
    apiErrors {
      code
      message
    }
  }
}
    `) as unknown as TypedDocumentString<
  RequestPasswordResetMutation,
  RequestPasswordResetMutationVariables
>;
export const ResetPasswordDocument = new TypedDocumentString(`
    mutation ResetPassword($token: String!, $newPassword: String!) {
  resetPassword(token: $token, newPassword: $newPassword) {
    success
    apiErrors {
      code
      message
    }
  }
}
    `) as unknown as TypedDocumentString<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const GetShopDocument = new TypedDocumentString(`
    query GetShop($id: ID!) {
  shop(id: $id) {
    ...Shop
  }
}
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
}`) as unknown as TypedDocumentString<GetShopQuery, GetShopQueryVariables>;
