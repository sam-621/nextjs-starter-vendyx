# Testing

Unit tests with [Vitest](https://vitest.dev) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro). Vendyx already tests its business rules (prices, stock, discounts, orders); the storefront tests what it decides on its own: what the customer can see and do on screen.

## What gets a test

- **UI logic that decides what the customer can do:** a variant selector that disables combinations without stock, a quantity selector that stops at the available stock, an add to cart button that's disabled until a variant is chosen.
- **Form hooks:** which field gets which error, what happens with each `errorCode`.
- **Pure functions** in `src/shared/utils` and `src/lib/*/utils`: price formatting, plain text, JSON-LD, metadata.

## What doesn't

- coss components in `src/shared/components/ui`: they're the registry's code.
- `async` Server Components and pages: Vitest doesn't support them.
- Server Actions and data functions against Vendyx: they need the API and belong to flow testing, which isn't set up yet.
- Styles, layout and snapshots.

## Where

Next to the file it tests, with `.test.ts` or `.test.tsx`: `variant-selector.tsx` → `variant-selector.test.tsx`. Vitest only picks up tests under `src/`.

## Setup

| File | What it does |
|------|--------------|
| `vitest.config.mts` | React plugin, `@/` paths from `tsconfig.json` and the `jsdom` environment. |
| `vitest.setup.ts` | `jest-dom` matchers (`toBeDisabled`, `toHaveAttribute`...) and `cleanup` after each test. |

## How

- Render the component and look for what the customer sees, by role and accessible name: `getByRole('button', { name: 'Add to cart' })`, `getByLabelText('Size')`. `getByTestId` only when there's no accessible way.
- Interact with `userEvent`, not `fireEvent`: it clicks and types like a person.
- Assert on the result on screen (`toBeDisabled`, `toHaveTextContent`), not on state, props or internal functions.
- Test data is typed with the codegen types (`ProductDetailsFragment`...), only with the fields the component reads.
- `next/navigation` and actions are replaced with `vi.mock` when the component uses them, and the test checks what the component does with their result.
- `describe` with the component's or function's name, and `test` for each case, never `it`.
- One behavior per `test`. Its name says what the customer gets on screen, starting with a UI verb: `renders`, `does not render`, `shows`, `hides`, `disables`, `enables`. It describes the result, not how it's achieved: `renders the image at the width of its size`, not `requests the width from the CDN`.
- Pure functions use the verb of what they return: `returns`, `formats`, `throws`.

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';

import { VariantSelector } from './variant-selector';

describe('VariantSelector', () => {
  test('disables sizes without stock for the chosen color', async () => {
    render(<VariantSelector product={PRODUCT} />);

    await userEvent.click(screen.getByRole('radio', { name: 'Black' }));

    expect(screen.getByRole('radio', { name: 'M' })).toBeDisabled();
    expect(screen.getByRole('radio', { name: 'L' })).toBeEnabled();
  });
});
```

## Commands

- `yarn test`: runs every test once. It's what the agent runs after writing or changing a test.
- `yarn test:watch`: keeps them running while you work.
