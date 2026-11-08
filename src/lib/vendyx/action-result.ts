export const ActionErrorCode = {
  InvalidInput: 'INVALID_INPUT',
  SessionExpired: 'SESSION_EXPIRED',
  UnexpectedError: 'UNEXPECTED_ERROR'
} as const;

export type ActionErrorCode = (typeof ActionErrorCode)[keyof typeof ActionErrorCode];

export type ActionResult<C extends string = never> =
  { isSuccess: true } | { isSuccess: false; errorCode: C | ActionErrorCode; message?: string };
