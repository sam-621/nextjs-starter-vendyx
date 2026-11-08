import { flattenError, type ZodError } from 'zod';

export const getFieldErrors = (error: ZodError) => {
  const { fieldErrors } = flattenError(error) as { fieldErrors: Record<string, string[]> };

  return Object.fromEntries(
    Object.entries(fieldErrors).map(([field, messages]) => [field, messages[0]])
  );
};
