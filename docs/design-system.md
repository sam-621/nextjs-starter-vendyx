# Design system

Base components and tokens from [coss ui](https://coss.com/ui), built on [Base UI](https://base-ui.com). They're a starting point: each shop restyles them in these same files instead of writing its own.

## Where components come from

- Registry: `@coss` → `https://coss.com/ui/r/{name}.json`, configured in `components.json`.
- Catalog and examples: https://coss.com/ui. Full registry index: https://coss.com/ui/r/registry.json.
- Add or update a component:

  ```bash
  npx shadcn@latest add @coss/<name>
  ```

- Components land in `src/shared/components/ui`, hooks in `src/shared/hooks` and `cn` in `src/shared/utils/cn.ts`. If the CLI leaves something outside those paths, move it and fix the imports.
- After adding one, check what the CLI added: it may install dependencies the component doesn't need or append tokens to `src/app/globals.css` that already exist. Don't keep duplicates.
- Base UI primitives use `render` instead of `asChild`: `<Button render={<Link href="/cart" />}>`.

## Installed components

- **Forms:** `form`, `field`, `fieldset`, `label`, `input`, `input-group`, `textarea`, `checkbox`, `radio-group`, `select`, `number-field`, `toggle`, `toggle-group`.
- **Navigation and overlays:** `menu`, `tabs`, `segmented-control`, `dialog`, `sheet`, `popover`, `tooltip`, `accordion`, `breadcrumb`, `pagination`, `scroll-area`.
- **Feedback and content:** `button`, `badge`, `alert`, `toast`, `skeleton`, `spinner`, `separator`, `card`, `empty`, `avatar`.

Anything else from the catalog (`combobox`, `drawer`, `table`, `calendar`...) is added with the CLI when a shop needs it.

## Tokens

They live in `src/app/globals.css` (Tailwind v4, no `tailwind.config.js`).

- **Brand:** `--brand` and `--brand-foreground` (text on the brand color), in `:root` and `.dark`. `primary` and `primary-foreground` point to them. It's the one place a shop sets its color; by default it's coss's neutral.
- **coss colors:** `background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `info`, `success`, `warning` (each with its `-foreground`), `border`, `input` and `ring`, in `:root` and `.dark`.
- **Radius:** `--radius`, with `rounded-sm`, `rounded-md`, `rounded-lg` and `rounded-xl` derived from it.
- **Fonts:** `font-sans` and `font-heading` (Inter) and `font-mono` (Geist Mono), loaded with `next/font` in `src/app/layout.tsx`. To change a font, change it there and keep the CSS variable.
- **Dark theme:** `.dark` class on an ancestor. The template doesn't switch themes; a shop that wants it adds the toggle.

## Rules

- Colors only through tokens (`bg-primary`, `text-muted-foreground`, `border-border`). No literal values (`#fff`, `bg-blue-500`) in screens.
- A shop's look is changed in the tokens first and in `src/shared/components/ui` second. Screens don't override a component's base styles with one-off classes; if a variant is missing, it's added to the component (for example, a new `variant` in `button.tsx`).
- Pieces built from several coss components (a product card, a quantity selector) go in `src/shared/components/`, outside `ui/`, or next to the screen in `_components/`.
- If coss doesn't have a component, it's built with Base UI and tokens, not with another library.
- Email fields use `inputMode="email"`, not `type="email"`: the browser's native validation blocks the submit and shows its own message, and validation belongs to the form's schema.
- Icons come from `lucide-react`.
- Files in `src/shared/components/ui` follow the registry's code, not `code-style.md`. When a component is updated with the CLI, re-apply the shop's style changes and the animations below.

## Animations

Base UI marks the moment an element appears or disappears with `data-starting-style` and `data-ending-style`. coss already animates `dialog`, `sheet`, `popover`, `tooltip`, `accordion` and `toast`; the template adds the ones coss doesn't ship:

- **`menu` and `select` popups:** open and close with `transition-[scale,opacity] duration-150` from `scale-98 opacity-0`.
- **`checkbox` and `radio` indicators:** appear and disappear with `transition-[opacity,scale] duration-150 ease-out` from `scale-50 opacity-0`. They don't use `data-unchecked:hidden`, because it hides the indicator before the exit animation plays.
- **`button`:** sinks 1px when pressed (`active:translate-y-px`, `data-pressed:translate-y-px`), except with `motion-reduce`.

A new component that opens, closes or toggles follows the same pattern: `transition-*` plus `data-starting-style` and `data-ending-style`, short durations (100–200ms), and nothing that moves when the user asks for reduced motion.
