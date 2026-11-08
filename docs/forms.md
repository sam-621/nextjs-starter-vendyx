# Forms

How every form in the storefront is built: sign in, sign up, password reset, profile, address, discount code, add to cart.

## Pieces

| Piece | Where | What it does |
|-------|-------|--------------|
| Form schema | The form's hook, `use-<form>-form.ts`, next to the form component | Validates what the customer types, with the shop's messages and screen-only fields (confirm password, accept terms). |
| `Form`, `Field`, `FieldLabel`, `FieldError` | `@/shared/components/ui` (coss, Base UI) | Collect the values, show errors under each field, focus the first invalid one and clear a field's error when it's edited. |
| Server Action | `src/lib/<module>/actions` | Validates its input with its own schema, talks to Vendyx and returns `ActionResult` with an `errorCode`, never text. |
| `getErrorMessage(errorCode)` | `@/shared/utils/error-messages` | Turns an error code into the shop's message. |
| `getFieldErrors(error)` | `@/shared/utils/form-errors` | Turns a zod error into `{ field: message }` for the `Form`. |

The form schema and the action's schema are separate on purpose, even if some rules repeat: the action protects itself, the form decides what the customer sees.

## Flow

1. The customer submits. `Form` calls `onFormSubmit(values)` with the values by field `name`, and the page isn't reloaded.
2. The form validates `values` with its schema. If it fails, `getFieldErrors` goes into the `Form`'s `errors` and each `FieldError` shows its message. Nothing reaches the server.
3. If it passes, the form calls the action inside `startTransition` and waits for the result. `isPending` drives the button's loading state.
4. If the action fails, the form decides where the error goes: a code that belongs to a field (`EmailAlreadyExists` → `email`) goes to that field's `errors`; anything else goes to an `Alert` above the form.
5. If it succeeds, the form does what the screen needs: navigate, close a dialog, show a toast.

The action is called from code, never from the `<form action>` prop: React 19 empties a form after an `action` finishes, even when it fails, and the customer would lose what they typed.

## Example

A form is two files side by side: the component, which only renders, and its hook, which holds the schema, the state and `onSubmit`.

```
_components/sign-up-form/
├── sign-up-form.tsx       SignUpForm: only UI
└── use-sign-up-form.ts    useSignUpForm: schema, FormValues, state and onSubmit
```

### `use-sign-up-form.ts`

```ts
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { signUp } from '@/lib/customer/actions/sign-up';
import { CustomerErrorCode } from '@/lib/vendyx/types';
import { getErrorMessage } from '@/shared/utils/error-messages';
import { getFieldErrors } from '@/shared/utils/form-errors';

export const useSignUpForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  const onSubmit = (values: Record<string, unknown>) => {
    const parsed = FormSchema.safeParse(values);

    if (!parsed.success) {
      setErrors(getFieldErrors(parsed.error));
      return;
    }

    setFormError(null);

    startTransition(async () => {
      const { email, password } = parsed.data;
      const result = await signUp({ email, password });

      if (result.isSuccess) {
        router.push('/account');
        return;
      }

      const field = FIELD_ERROR_CODES[result.errorCode];
      const message = getErrorMessage(result.errorCode);

      if (field) setErrors({ [field]: message });
      else setFormError(message);
    });
  };

  return { errors, formError, isPending, onSubmit };
};

const FormSchema = z
  .object({
    email: z.email('Ingresa un correo válido'),
    password: z.string().min(8, 'Usa al menos 8 caracteres'),
    confirmPassword: z.string()
  })
  .refine(values => values.password === values.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Las contraseñas no coinciden'
  });

type FormValues = z.infer<typeof FormSchema>;

const FIELD_ERROR_CODES: Partial<Record<string, keyof FormValues>> = {
  [CustomerErrorCode.EmailAlreadyExists]: 'email',
  [CustomerErrorCode.InvalidEmail]: 'email'
};
```

### `sign-up-form.tsx`

```tsx
'use client';

import { Alert, AlertDescription } from '@/shared/components/ui/alert';
import { Button } from '@/shared/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { Form } from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';

import { useSignUpForm } from './use-sign-up-form';

export const SignUpForm = () => {
  const { errors, formError, isPending, onSubmit } = useSignUpForm();

  return (
    <Form errors={errors} onFormSubmit={onSubmit}>
      {formError && (
        <Alert variant="error">
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      )}

      <Field name="email">
        <FieldLabel>Correo</FieldLabel>
        <Input autoComplete="email" inputMode="email" />
        <FieldError />
      </Field>

      <Field name="password">
        <FieldLabel>Contraseña</FieldLabel>
        <Input autoComplete="new-password" type="password" />
        <FieldError />
      </Field>

      <Field name="confirmPassword">
        <FieldLabel>Confirma tu contraseña</FieldLabel>
        <Input autoComplete="new-password" type="password" />
        <FieldError />
      </Field>

      <Button loading={isPending} type="submit">
        Crear cuenta
      </Button>
    </Form>
  );
};
```

### Navigating after success

The hook navigates with `router.push`: where to go after signing up is the screen's decision, and actions in `src/lib` don't know the shop's routes. A shop that wants to save that extra request can wrap the action in its screen's `_actions/` and call `redirect()` there; the navigation then travels in the action's response.

## Rules

- Each field is a `Field` with a `name`; that `name` is the key in `values`, in `errors` and in the form schema.
- Fields don't use `required`, `minLength` or `type="email"`: the form schema is the only client-side validation, so every message comes from the shop. Email fields use `inputMode="email"`.
- `errors` is the only error state per field. There's no separate `useState` per field.
- Errors that don't belong to a field go in one `Alert` at the top of the form.
- The submit button shows `isPending` and stays a `type="submit"` button; the form doesn't disable its fields while pending unless the screen needs it.
- Codes that a screen handles differently are handled before `getErrorMessage`: for example, `ActionErrorCode.SessionExpired` redirects to the sign-in page.
- Every form is a component plus its hook in the same folder: `<form>-form.tsx` (`<Form>Form`) only renders; `use-<form>-form.ts` (`use<Form>Form`) holds the schema, `FormValues`, the state, the hooks it needs and `onSubmit`, and returns what the component reads.
- A form used by one screen lives next to it in `_components/`; one used by several (sign in in a page and in a dialog) goes in `src/shared/components/`.
