export const isGuardError = (value: unknown): value is GuardError => {
  return (
    typeof value === "object" &&
    value !== null &&
    "message" in value &&
    "status" in value &&
    "error" in value
  );
};

export type GuardError = {
  message: string;
  status: number;
  error: string;
};

export type VerifyReturn = GuardError | boolean;

export const Guard = <
  F extends (...args: Parameters<F>) => ReturnType<F>,
  V extends (() => Promise<VerifyReturn>)[]
>(
  func: F,
  ...verification: V
) => {
  return async (
    ...args: Parameters<F>
  ): Promise<ReturnType<F> | GuardError> => {
    for (let verify of verification) {
      // Beautiful fix made by @xonlly https://github.com/xonlly
      /**
       * For a bit of context, this issue was provided by NextJS, which doesn't authorize
       * server functions to be non async, so we need to check if the function is a
       * Promise and await it if it is.
       */
      if (verify instanceof Promise) {
        verify = await verify;
      }

      const result = await verify();

      if (isGuardError(result)) {
        return result;
      }
    }

    return func(...args);
  };
};
