# Code style

## General

- **No comments.** No explanatory comments, no JSDoc, no `TODO`. Only if the user asks, and only the one they asked for.
- **Code in English**: names, types, keys and values.
- No `any`; `unknown` + narrowing.
- `import type` for what is only a type.
- Unused variables prefixed with `_`.
- `@/` to import from outside the module; relative imports within the same module.
- `async`/`await` over `.then()` chains.

## Formatting and imports

- Single quotes, semicolons, width 100, no trailing commas, 2 spaces (`.prettierrc`).
- `yarn lint:fix` sorts imports (`simple-import-sort`): side effects → `node:` → `react`, `next` and external → `@/...` → `../` → `./` → CSS. They aren't sorted by hand.

## Naming

| What | Rule | Example |
|------|------|---------|
| Files and folders | kebab-case; private folders in `src/app` start with `_` | `_components/product-gallery/gallery-thumbnail.tsx` |
| Page | `page.tsx` in its route folder, `export default function Page` | `app/(shop)/cart/page.tsx` |
| Component | PascalCase, named export | `AddToCartButton` |
| Hook | `use<Thing>` in `_hooks/use-<thing>.ts` or `shared/hooks/` | `useVariantSelection` |
| Data function | `get<Thing>` in `data/get-<thing>.ts` | `getProduct` |
| Server Action | verb + noun in `actions/<verb>-<noun>.ts` or `_actions/` | `addToCart` in `add-to-cart.ts` |
| Cache tags | `<Module>CacheTags` | `CartCacheTags.Cart` |
| Vendyx operation | SCREAMING_SNAKE_CASE with `_QUERY`, `_MUTATION` or `_FRAGMENT` suffix | `GET_PRODUCT_QUERY` |
| Utils | `<topic>.ts`, or `<topic>-utils.ts` when the topic alone reads like a domain concept | `cn.ts`, `error-messages.ts`, `price-utils.ts` |
| Environment variable | SCREAMING_SNAKE_CASE; `NEXT_PUBLIC_` only if the browser needs it | `VENDYX_STOREFRONT_API_KEY` |

- A utility file only takes the `-utils` suffix when its name alone could be read as an entity or value object: `price-utils.ts` (not `price.ts`), `cart-id-utils.ts`, `customer-token-utils.ts`. When the name already says what it is (`cn.ts`, `error-messages.ts`), it goes without the suffix.
- A file's role goes in its name with a hyphen, never with a dot: `price-utils.ts`, `cart-operations.ts`, `vendyx-errors.ts`. The only dot before the extension is reserved for tests (`price-utils.test.ts`).

## Exports

- Named exports, no `export default`, except where Next requires it: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `global-error.tsx`, `template.tsx`, `default.tsx` and `next.config.ts`.
- Components as `export const X = () => {...}`. Next's files use `export default function Page()`.
- Props are always typed with a `type Props` in the same file, even when there's only one, never inline. It isn't exported and isn't named after the component.

```tsx
type Props = {
  amount: number;
};

export const Price = ({ amount }: Props) => {...};
```

## Components

- One exported component per file. Private helpers of the same file go below it.
- `'use client'` is the first line of the file, before imports.
- Composition through `children` over prop drilling.
- An `if` whose body doesn't fit on the same line gets braces. Never a body alone on the next line:

```ts
if (!result.accessToken) {
  return { isSuccess: false, errorCode: ActionErrorCode.UnexpectedError };
}
```

- No logic in JSX: conditions and mappings with more than one step go to a variable or function above the `return`.

## Server code

- Files that only run on the server start with `import 'server-only'` (`src/lib/vendyx` and `data/`).
- `'use server'` goes at the top of the action file, never inline inside a component.
- `'use cache'` goes at the top of the function body, followed by `cacheLife` and `cacheTag`.

## Styles

- Tailwind classes in `className`. No CSS modules or inline `style`, except for dynamic values Tailwind can't express.
- Conditional classes with a `cn()` util in `src/shared/utils/`.

## Text

- Customer-facing text lives in the components, in the shop's language.
- Prices and dates are formatted with `Intl` through utils, never by hand.
