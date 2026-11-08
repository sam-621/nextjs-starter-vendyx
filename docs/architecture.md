# Architecture

Next.js 16 storefront (App Router, Cache Components, Tailwind v4) that consumes the Vendyx storefront API (GraphQL). Checkout is hosted by Vendyx: the storefront builds the cart and hands it off.

The rules here follow the Next.js docs bundled in `node_modules/next/dist/docs/`. When in doubt about an API, read its guide there, not from memory.

## Structure

Two layers: `src/lib` holds the logic, split by domain, and `src/app` holds the UI, split by screen.

```
src/
├── lib/             logic, no UI
│   ├── vendyx/      Vendyx storefront API layer and the actions' contract (ActionResult)
│   └── <module>/    one folder per domain: catalog, cart, customer, shop
├── shared/          UI code reused across screens
│   ├── components/  ui/ (design system, see design-system.md) and <component>/<file>.tsx
│   ├── hooks/       use-<thing>.ts
│   └── utils/       UI utilities: cn, error messages, form errors, prices
├── app/             routes and UI; each shop builds it
└── proxy.ts         optional; only for redirects or rewrites that need the request
```

- `@/` points to `src/`.
- Imports go one way: `lib` imports nothing from `src` outside itself, `shared` imports `lib`, and `app` imports `lib` and `shared`. `lib` is self-contained, so the logic never depends on the UI.
- The template ships `lib` and `shared`. `app` only has the root layout (with `ToastProvider`), an empty home page and minimal `not-found.tsx`, `error.tsx` and `global-error.tsx` built with the design system: each shop builds its own screens and restyles those.

## Modules (`src/lib/<module>`)

```
src/lib/<module>/
├── data/          get-<thing>.ts, Vendyx queries (Data Access Layer)
├── actions/       <action>.ts, Vendyx flows (Server Actions)
├── constants/     cache-tags.ts and module constants
└── utils/         utilities used by data and actions (naming in code-style.md)
```

A module only creates the folders it uses.

- `data/` only holds Vendyx queries and `actions/` only holds Vendyx flows. Everything else those two share (cookies, guards) is a utility in `utils/`.
- A utility that touches cookies, calls Vendyx or redirects starts with `import 'server-only'`. Without that line, it must be safe to import from a Client Component.
- Modules have no UI: no pages, components or hooks.
- A module never imports another module, `src/shared` or `src/app`. It only uses its own files and `@/lib/vendyx`. Combining modules is the job of `src/app`.

### Included modules

The template ships the data and actions most shops share. Each shop removes what it doesn't use and adds what it needs.

| Module | Data | Actions |
|--------|------|---------|
| `shop` | `getShop` | |
| `catalog` | `getProducts`, `getProduct`, `getCollections`, `getCollection` (with its products), `getProductSlugs`, `getCollectionSlugs` | |
| `cart` | `getCart` | `addToCart`, `updateCartItem`, `removeCartItem`, `applyDiscountCode`, `addCustomerToCart` |
| `customer` | `getCustomer`, `getCustomerOrders` | `signIn`, `signUp`, `signInWithGoogle`, `signOut`, `requestPasswordReset`, `resetPassword`, `updateCustomer` |

Server-only utilities: `cart/utils/cart-id-utils.ts` (cart cookie) and `customer/utils/customer-token-utils.ts` (token cookie).

Besides the design system (`shared/components/ui`), the only component the template ships is `shared/components/google-sign-in-button`, because Google's button needs its script.

## App (`src/app`)

The UI and the place where modules are combined. A screen that reads the cart and the customer, or an action that uses two modules, lives here.

```
src/app/
├── layout.tsx
├── (shop)/
│   ├── products/[slug]/
│   │   ├── page.tsx
│   │   └── _components/          variant-picker/, add-to-cart-form/...
│   └── cart/
│       ├── page.tsx
│       ├── _components/          cart-items/, checkout-button/...
│       └── _actions/
│           └── go-to-checkout.ts
└── (account)/
    └── orders/page.tsx
```

- What only one route uses lives next to it in private folders: `_components/`, `_actions/`, `_hooks/`. The `_` opts the folder out of routing ([Private folders](https://nextjs.org/docs/app/getting-started/project-structure#private-folders)). They're created only when needed.
- What two screens use moves up to `src/shared/`.
- An action in `_actions/` is a flow that combines modules; it calls the modules' data and actions, never `vendyxFetch`.
- Route groups `(group)` organize routes that share a layout without changing the URL, for example `(shop)` and `(account)`.

```tsx
import { notFound } from 'next/navigation';

import { getProduct } from '@/lib/catalog/data/get-product';

import { AddToCartForm } from './_components/add-to-cart-form/add-to-cart-form';

export default async function Page({ params }: PageProps<'/products/[slug]'>) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  return <AddToCartForm product={product} />;
}
```

- Use the global `PageProps<'/route'>` and `LayoutProps<'/route'>` types; they're generated by Next.
- `params` and `searchParams` are promises. `await` them in the component that needs them; if the route isn't prerendered with `generateStaticParams`, that component goes inside `<Suspense>`.
- Routes with a known set of params (collections, featured products) export `generateStaticParams` to be prerendered.
- Every route with its own data has `loading.tsx` or a `<Suspense>` with a skeleton that matches the final layout.
- Missing resources call `notFound()` from `next/navigation`; each segment that needs it has its own `not-found.tsx`.
- `error.tsx` (Client Component) handles unexpected errors per segment; `global-error.tsx` covers the root layout.

## Server and Client Components

- Everything is a Server Component by default. `'use client'` only goes on the interactive leaf that needs state, effects, event handlers or browser APIs (variant picker, quantity input, gallery), never on a page or layout.
- A Server Component can be passed as `children` to a Client Component to keep it on the server.
- Props that cross to a Client Component are serializable and minimal: only the fields it renders.
- Context providers are Client Components rendered as deep as possible, wrapping only what needs them.

## Vendyx API (`src/lib/vendyx`)

The only place that knows how to talk to the Vendyx storefront API (GraphQL, production at `https://api.vendyx.so/storefront-api`).

```
src/lib/vendyx/
├── vendyx-config.ts     env vars: VENDYX_API_URL, VENDYX_SHOP_ID, VENDYX_STOREFRONT_API_KEY, VENDYX_LOCALE
├── vendyx-client.ts     vendyxFetch: sends the operation with the shop headers and the customer token
├── operations/          <domain>-operations.ts: fragments, queries and mutations with graphql(...)
├── errors/              vendyx-errors.ts: VendyxUnauthorizedError
├── action-result.ts     ActionResult and ActionErrorCode, what every action returns
├── codegen/             generated by `yarn gen:types`, never edited by hand
└── types.ts             re-exports the generated types
```

- `vendyx-config.ts` is the only file that reads `process.env` for Vendyx. It validates the variables with zod when it loads, so a missing shop id or API key stops the build or the server with a clear message. The API key never reaches the client and never uses the `NEXT_PUBLIC_` prefix.
- `vendyxFetch(OPERATION, variables, { accessToken })` sends `x_lune_shop_id`, `x_lune_storefront_api_key`, `x_lune_storefront_locale` (if set) and `Authorization: Bearer <token>` when there's a customer. It doesn't read cookies, so it can run inside `'use cache'`. It throws `VendyxUnauthorizedError` when Vendyx answers `UNAUTHORIZED` to a request that carried a customer token (invalid or expired session). Any other error, including `UNAUTHORIZED` without a token (a bad API key), is a plain `Error`, so a misconfigured shop never looks like a signed-out customer.
- `yarn gen:types` reads the schema from the hosted API (`VENDYX_API_URL`, production by default): nothing needs to run locally. Run it after adding or changing an operation.
- Each operation selects only what the storefront uses. The fragment is the DTO: components receive `ProductCardFragment`, `CartFragment`... imported from `@/lib/vendyx/types`, never a full API type.
- Fragment masking is off: a fragment's fields are read directly from the response.
- Enums are generated as constant objects (`enumType: 'const'`): `CartErrorCode.CartNotFound`, `CustomerErrorCode.InvalidCredentials`. Code compares against those, never against literal strings, so a code that changes in Vendyx breaks the build after `yarn gen:types`.
- Mutations return `{ <entity>, apiErrors: [{ code, message }] }`. Actions pass the `code` and the English `message` on to the UI untouched; they never write customer-facing text.
- Prices are integers in cents. They're shown with `formatPrice` from `@/shared/utils/price-utils`.

## Reading data

Reads live in `src/lib/<module>/data/`, start with `import 'server-only'` and call `vendyxFetch`. `src/app` and `src/shared` never call `vendyxFetch` directly.

### Public data (catalog)

Products, collections and shop data don't depend on the request: they're cached and become part of the static shell.

```ts
import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';

import { GET_PRODUCT_QUERY } from '@/lib/vendyx/operations/catalog-operations';
import { vendyxFetch } from '@/lib/vendyx/vendyx-client';

import { CatalogCacheTags } from '../constants/cache-tags';

export const getProduct = async (slug: string) => {
  'use cache';
  cacheLife('hours');
  cacheTag(CatalogCacheTags.Product(slug), CatalogCacheTags.Products);

  const { product } = await vendyxFetch(GET_PRODUCT_QUERY, { slug });

  return product ?? null;
};
```

- Every `'use cache'` has a `cacheLife` and at least one `cacheTag`.
- Entities are tagged by slug (`Product(slug)`, `Collection(slug)`) and every catalog function also carries its list tag (`Products`, `Collections`). A collection also carries `Products`, because it lists products. Revalidating `Products` and `Collections` refreshes the whole catalog (see [Catalog revalidation](#catalog-revalidation)).
- Tags come from `constants/cache-tags.ts` (`<Module>CacheTags`). Never loose strings as tags.
- A cached function never reads `cookies()`, `headers()` or `searchParams`. If it needs a runtime value, it receives it as an argument.

### Per-customer data (cart, account, orders)

Depends on cookies, so it's not cached with `'use cache'`.

- The cart id (`vendyx_cart_id`) and the customer token (`vendyx_customer_token`) live in `httpOnly` cookies. Their utilities (`get`, `set`, `delete`) are in `cart/utils/cart-id-utils.ts` and `customer/utils/customer-token-utils.ts`; nothing else reads those cookies.
- The customer token is sent only to customer operations (`me`, orders, `updateCustomer`). Cart operations don't use it.
- The component that reads per-customer data goes inside `<Suspense>` with a fallback, so the rest of the page stays in the static shell.
- If the same value is read several times in one request (the current customer, the cart), wrap the function with `cache` from `react`.
- If it needs a lifetime to be included in prefetches, use `'use cache: private'`.

### Parallel reads

Independent reads start together with `Promise.all`, or in sibling components each with its own `<Suspense>`. Don't chain `await`s that don't depend on each other.

## Mutations

Mutations are Server Actions in `src/lib/<module>/actions/<action>.ts`, with `'use server'` at the top of the file. Every export of that file becomes a public endpoint, so shared functions go unexported or in `utils/`.

```ts
'use server';

import { refresh } from 'next/cache';
import { z } from 'zod';

import { UPDATE_CART_ITEM_MUTATION } from '@/lib/vendyx/operations/cart-operations';
import type { CartErrorCode } from '@/lib/vendyx/types';
import { vendyxFetch } from '@/lib/vendyx/vendyx-client';
import { ActionErrorCode, type ActionResult } from '@/lib/vendyx/action-result';

export const updateCartItem = async (
  input: z.infer<typeof Schema>
): Promise<ActionResult<CartErrorCode>> => {
  const parsed = Schema.safeParse(input);
  if (!parsed.success) return { isSuccess: false, errorCode: ActionErrorCode.InvalidInput };

  try {
    const { updateCartItem: result } = await vendyxFetch(UPDATE_CART_ITEM_MUTATION, {
      itemId: parsed.data.itemId,
      input: { quantity: parsed.data.quantity }
    });
    const [apiError] = result.apiErrors;

    if (apiError) return { isSuccess: false, errorCode: apiError.code, message: apiError.message };

    refresh();
    return { isSuccess: true };
  } catch (error) {
    console.error(error);
    return { isSuccess: false, errorCode: ActionErrorCode.UnexpectedError };
  }
};

const Schema = z.object({
  itemId: z.string().min(1),
  quantity: z.number().int().min(0)
});
```

- Actions receive one typed input, not `FormData` (`signIn({ email, password })`, `signInWithGoogle(credential)`). Actions without input (`signOut`) take no arguments. Forms call them from code and await the result (see `docs/forms.md`).
- A Server Action is a public endpoint: it validates its input with its own zod schema, declared in the same file and not exported, and checks the customer's session inside the action, never only in the UI.
- That schema protects the action; it isn't the form's schema. The form has its own (see [Forms](#forms)), even if some rules repeat.
- Return `ActionResult` from `@/lib/vendyx/action-result`: `{ isSuccess: true }` or `{ isSuccess: false, errorCode, message? }`. Expected errors are return values, not exceptions.
- `errorCode` is Vendyx's code (`CartErrorCode`, `CustomerErrorCode`...) or a common one from `ActionErrorCode`, in the same file: `InvalidInput`, `SessionExpired`, `UnexpectedError`. Codes are always written through those constants, never as strings. `message` is Vendyx's English message, for debugging. Actions never return customer-facing text: the UI decides what to show.
- Unexpected errors go to `console.error` and return `ActionErrorCode.UnexpectedError`.
- After a successful mutation, update what the customer sees:
  - `refresh` for per-customer data (cart, account), which isn't cached.
  - `updateTag` when the action changes cached data and the customer must see it in the same response.
  - `revalidateTag` for stale-while-revalidate refreshes (catalog changed from outside).
- `redirect` goes outside `try/catch`, because it throws.
- Return only what the UI needs, never the raw API response.

### Forms

How forms are built (schemas, `Form` and `Field`, errors per field, calling actions) is in `docs/forms.md`.

- Server Actions aren't used to read data.

## Authentication

Vendyx is the identity provider: it stores customers and passwords, verifies Google and issues the token. The storefront doesn't use an auth library; the session is the Vendyx token in its cookie.

### Signing in

- **Email and password:** `signIn` and `signUp`.
- **Google:** `GoogleSignInButton` loads Google Identity Services with the shop's own client ID (`NEXT_PUBLIC_GOOGLE_CLIENT_ID`), gets the Google ID token in the browser and passes it to `signInWithGoogle`, which sends it to Vendyx. There's no Google secret. The client ID must be the one configured for the shop in Vendyx, and the shop's domain must be an authorized JavaScript origin of that client in the Google console.
- **Password reset:** `requestPasswordReset` receives `email` and `redirectUrl` (the full URL of the shop's reset page) and asks Vendyx to send the email, which links to `<redirectUrl>?token=...`. `redirectUrl` must have the same origin as the request; otherwise anyone could send a real Vendyx email that hands the token to another site. It answers success even if the email doesn't exist, so it doesn't reveal accounts. `resetPassword` receives `token` and `password`; confirming the password is the form's job.
- Every successful sign-in action saves the cookie with `setCustomerToken`. The customer is attached to the cart only when going to checkout, the one place where the cart's customer matters.
- `src/lib` doesn't know the shop's routes: whatever needs a URL receives it from `src/app`.

### Session

- The cookie lasts as long as the token: its `maxAge` comes from the token's `exp` (read without verifying; Vendyx verifies it).
- If Vendyx rejects the token anyway (`VendyxUnauthorizedError`), reads (`getCustomer`, `getCustomerOrders`) treat it as no session, and actions delete the cookie and return `ActionErrorCode.SessionExpired`. Any other error is thrown, so a Vendyx outage doesn't look like a sign-out.

### Authorization

- Vendyx enforces it: `me`, orders and `updateCustomer` only answer to the token's owner. The storefront doesn't decide permissions.
- Account pages call `getCustomer()` and, if it's `null`, redirect to the shop's sign-in page themselves.
- Account actions check the token inside the action, never only in the UI.

## Checkout

The storefront doesn't build the payment page: it redirects to `cart.checkoutUrl`, the Vendyx hosted checkout. Going to checkout combines `cart` and `customer`, so it's an action of the cart screen in `src/app`:

```ts
'use server';

import { redirect } from 'next/navigation';

import { addCustomerToCart } from '@/lib/cart/actions/add-customer-to-cart';
import { getCart } from '@/lib/cart/data/get-cart';
import { getCustomer } from '@/lib/customer/data/get-customer';

export const goToCheckout = async () => {
  const cart = await getCart();
  if (!cart) redirect('/');

  const customer = await getCustomer();

  if (customer?.email) {
    await addCustomerToCart({
      email: customer.email,
      firstName: customer.firstName,
      lastName: customer.lastName,
      phoneNumber: customer.phoneNumber
    });
  }

  redirect(cart.checkoutUrl);
};
```

If attaching the customer fails, it still redirects: the customer fills in their data in the checkout.

## Route Handlers

Only for what a Server Action can't do: webhooks and endpoints called by third parties. They live in `src/app/api/<name>/route.ts` and verify the request's signature or secret before doing anything.

### Catalog revalidation

`src/app/api/revalidate/route.ts` receives Vendyx's webhooks and revalidates the whole catalog (`CatalogCacheTags.Products` and `CatalogCacheTags.Collections`) and the shop (`ShopCacheTags.Shop`) with `revalidateTag(tag, 'max')`, so a change in the admin shows up without waiting for `cacheLife`. It doesn't read the body: any call refreshes the whole catalog and the shop.

- In Vendyx (Settings → Webhooks), the shop registers `<SITE_URL>/api/revalidate` for the catalog events: `product.created`, `product.updated`, `product.removed`, `collection.created`, `collection.updated` and `collection.removed`. Variant, price and stock edits made in the admin arrive as `product.updated`.
- With `'max'`, nothing is fetched at once: each page is refreshed when someone visits it, and meanwhile the previous version is served.
- Vendyx doesn't retry failed webhooks; `cacheLife` is the safety net if one is lost.
- **Not verified yet:** the endpoint doesn't check Vendyx's signature, so anyone with the URL can force a revalidation. Verifying `x-webhook-signature` (HMAC-SHA256 of the raw body with the webhook's secret) is pending until Vendyx shows that secret to the shop.

## UI

- Links with `next/link` and fonts with `next/font`.
- Images from Vendyx with `VendyxImage` (`@/shared/components/vendyx-image/vendyx-image`), never `next/image` or a bare `<img>`: Vendyx's CDN resizes them and serves them as WebP. It takes the asset's `source` and a `size`, and asks the CDN for that width (`?w=`) plus double for high density screens (`srcSet` 1x/2x).

  | Size | Width | For |
  |------|-------|-----|
  | `small` | 320px | Thumbnails, cart lines, product cards in dense grids. |
  | `medium` | 640px | Product cards, collection covers. |
  | `large` | 1280px | Product gallery, hero. |

  The size is the width the image is shown at, not a breakpoint. A shop that needs other widths changes `IMAGE_WIDTHS` in the component instead of building URLs by hand.
- Every image has `alt`, `width` and `height`; images below the fold use `loading="lazy"`, and the main image of the page (the product's first image, the hero) uses `fetchPriority="high"`. Images that don't come from Vendyx (in `public/`) use a plain `<img>`.
- Each route exports `metadata` or `generateMetadata`. Product and collection pages, the sitemap and robots follow `docs/seo.md`.
- Components, tokens and styling rules are in `docs/design-system.md`.
- Tailwind v4: the theme lives in `src/app/globals.css` with `@theme`. There's no `tailwind.config.js` and none is created.
