# nextjs-starter-vendyx

Next.js storefront template for Vendyx shops.

## Getting started

```sh
yarn install
cp .env.example .env.local
yarn dev
```

Open [http://localhost:3001](http://localhost:3001).

The server and the build stop with a message naming the variable if one is missing or malformed.

## Environment variables

| Variable | Required | What for |
|----------|----------|----------|
| `VENDYX_API_URL` | No | Vendyx API. `https://api.vendyx.so` by default. |
| `VENDYX_SHOP_ID` | Yes | The shop's id in Vendyx. |
| `VENDYX_STOREFRONT_API_KEY` | Yes | The shop's storefront API key. Server only. |
| `VENDYX_LOCALE` | No | `en`, `es` or `fr` for translated catalog content. |
| `SITE_URL` | In production | The shop's public URL. Falls back to `http://localhost:3001` in development. |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google OAuth client ID. See [Google sign in](#google-sign-in). |

## Revalidate webhook

In the Vendyx admin, add a webhook to `https://<shop domain>/api/revalidate` for each product and collection event. Without it, catalog changes don't show up until the next deploy.

## Google sign in

Create an OAuth client in Google Cloud, configure its client ID for the shop in Vendyx and set the same one in `NEXT_PUBLIC_GOOGLE_CLIENT_ID`. Without it, the Google button doesn't render.

## Scripts

| Command | What for |
|---------|----------|
| `yarn dev` | Local server on port 3001. |
| `yarn build` | Typecheck and production build. |
| `yarn start` | Serves the production build. |
| `yarn lint:check` | Checks ESLint and Prettier. |
| `yarn lint:fix` | Fixes lint, formatting and import order. |
| `yarn gen:types` | Regenerates the Vendyx types from the hosted API, after adding or changing an operation. |

## Working with Claude Code

- `CLAUDE.md`: rules and which doc to read before writing code. `AGENTS.md` points to the Next.js docs bundled with the installed version.
- `docs/`: architecture, code style, design system, forms and SEO.
- `work/`: the project log (`work/log.md`) and the spec and log of each feature (`work/features/<slug>/`). Start a feature with `/session-start <slug>`.
- `/commit`: commits following the repo's format.
