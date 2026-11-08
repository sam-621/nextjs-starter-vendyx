import type { ActionErrorCode } from '../constants/action-error-code';

export type ActionResult<C extends string = never> =
  { isSuccess: true } | { isSuccess: false; errorCode: C | ActionErrorCode; message?: string };
