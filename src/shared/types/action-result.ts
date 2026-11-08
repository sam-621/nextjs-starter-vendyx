export type ActionResult<C extends string = string> =
  { isSuccess: true } | { isSuccess: false; error: string; errorCode?: C };
