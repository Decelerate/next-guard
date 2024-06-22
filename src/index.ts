import { ReturnTypeOverride, UnionOfFunctionReturnTypes } from "./types";

export const Guard = <
  F extends (...args: any) => any,
  V extends ((...args: any) => any)[]
>(
  func: F,
  ...verification: V
) => {
  return async (
    ...args: Parameters<F>
  ): Promise<ReturnTypeOverride<F, UnionOfFunctionReturnTypes<V>>> => {
    for (const verify of verification) {
      const result = await verify();

      if (!result) {
        return result;
      }
    }

    return await func(...args);
  };
};

