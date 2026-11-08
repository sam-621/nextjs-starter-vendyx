@AGENTS.md

# nextjs-starter-vendyx

Next.js storefront template for Vendyx shops: each new shop starts from this repo and talks to the Vendyx storefront API.

Single Next.js app (App Router, Cache Components, Tailwind v4). Commands run from the repo root with `yarn`.

## Before writing code

| If you are going to... | Read |
|------------------------|------|
| Create or move routes, data functions, Server Actions or components | `docs/architecture.md` |
| Write any code | `docs/code-style.md` |
| Write or change UI, or add components | `docs/design-system.md` |
| Build or change a form | `docs/forms.md` |
| Build a product or collection page, or touch metadata, sitemap or robots | `docs/seo.md` |
| Use a Next.js API you are not sure about | its guide in `node_modules/next/dist/docs/` |

## Commands

| Command | Who runs it | What for |
|---------|-------------|----------|
| `yarn lint:check` | Agent | Checks ESLint + Prettier. |
| `yarn lint:fix` | Agent | Fixes lint, formatting and import order. |
| `yarn build` | Agent | Typecheck and production build. |
| `yarn gen:types` | Agent | Regenerates the Vendyx types from the hosted API. Run it after adding or changing an operation. |
| `yarn dev` | User only | Local server on port 3001. If it is needed, ask and wait. |
| `yarn start` | User only | Serves the production build. |

- Don't run `tsc --noEmit` to check edits; IDE diagnostics are enough. The real typecheck is `yarn build`.
- If a command isn't in `package.json` yet, say so instead of inventing another one.

## Environment variables

Copy `.env.example` to `.env.local`.

They're validated with zod when the server starts (`src/instrumentation.ts`) and when the build loads them: a missing or malformed variable stops it with a message naming it. The Vendyx ones are validated in `src/lib/vendyx/vendyx-config.ts` and `SITE_URL` in `src/shared/utils/site-url.ts`; a new variable is added to the schema of the file that reads it.

| Variable | What for |
|----------|----------|
| `VENDYX_API_URL` | Vendyx API. `https://api.vendyx.so` by default. |
| `VENDYX_SHOP_ID` | The shop's id in Vendyx. |
| `VENDYX_STOREFRONT_API_KEY` | The shop's storefront API key. Server only. |
| `VENDYX_LOCALE` | Optional: `en`, `es` or `fr` for translated catalog content. |
| `SITE_URL` | The shop's public URL (`https://tienda.com`), for canonical URLs, the sitemap and Open Graph. Fixed on purpose; see `docs/seo.md`. |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | The shop's Google OAuth client ID, for `GoogleSignInButton`. The same one configured for the shop in Vendyx. |

## Features

`features/<slug>/` holds the working context of a feature:

- `spec/product.md`: context, flow, business rules, current decisions and recommended work plan. `status` in the frontmatter (`active` | `done`).
- `spec/technical.md`: model, API and impact on existing code.
- `spec/ui.md`: UI capabilities and where they live, without styles.
- `log.md`: logbook with one entry per day and per author.

Templates in `features/_templates/`. A feature is only created when the user asks for it.

Work on a feature starts with `/session-start <slug>`. Without it, don't read or write in `features/` unless the user asks. Within that conversation:

- After finishing each task, add it to the author's entry for today in `log.md` (`## YYYY-MM-DD — <author>`, author = the part before the `@` of `git config user.email`). If the entry doesn't exist, create it at the end.
- After finishing a step of the recommended work plan, mark it `[x]` in `spec/product.md`.
- When creating the feature, finishing a step of the plan or closing it, add a `[slug]` line to the project log. The detail stays in the feature's `log.md`.
- If the user asks for something that changes a rule, decision, technical or UI part, or contradicts the `spec/` (for example, something that was out of scope), what they ask wins: update `product.md`, `technical.md` and `ui.md` without asking for confirmation. Changes to `docs/` still need confirmation.
- Git conflicts in `log.md`: accept both versions.
- Agents in `.claude/agents/`: `implementer` implements a part of the feature and `reviewer` checks the pending changes against `docs/` and the `spec/`. Neither writes in `features/` or touches git.

## Project log

`log.md` at the root is the project's general log: what has been done, broadly. A feature's detail lives in its own `log.md`.

- One entry per day and per author (`## YYYY-MM-DD — <author>`, same as in features). If it doesn't exist, create it at the end.
- One line per change, in changelog language: what changed, not how the code ended up. Start with the commit type (`feat:`, `fix:`, `refactor:`...).
- `[slug]` marks a line that summarizes a feature's work; without `[slug]` it's an isolated change and that line is its whole record.
- It's written without a command, in any conversation:
  - Without a feature session: each change applied in code or decision that someone who wasn't in the conversation would need to know.
  - With a feature session: only what the Features section asks for.
  - Not worth a line: formatting, renames, loose tests, changes reverted in the same conversation.
- If an isolated change needs more than 2 or 3 lines to be understood, say it may be a feature. Don't create it unless the user asks.
- Git conflicts in `log.md`: accept both versions.

## Docs

- `docs/` is the source of truth for how code is written. If an existing file contradicts it, the doc wins.
- If a new architecture or code style decision is made, or what was built no longer matches the doc, propose the change to the doc and write it only when the user confirms.

## General rules

- No comments in code.
- Commits only with `/commit`.

## Reports to the user

- In neutral Spanish, using `tú`: no voseo or regionalisms.
- Short, in one-line-per-item lists: **Quedó** and **Pendiente**.
- Don't explain how the code ended up or repeat what the diff already shows: the user reads it directly. If they want detail, they ask.
- Don't list the obvious as pending (committing, uncommitted changes). If nothing real is left, omit Pendiente.
- Don't ask decision questions or get ahead of what comes next: the user sets the direction and asks for what they need. Risks or warnings go one line each inside Pendiente, without a question.
