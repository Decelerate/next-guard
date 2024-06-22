type ExcludeTrue<T> = T extends true ? never : T;

export type UnionOfFunctionReturnTypes<
  FuncArray extends ((...args: any) => any)[]
> = ExcludeTrue<Awaited<ReturnType<FuncArray[number]>>>;

export type ReturnTypeOverride<
  F extends (...args: any) => any,
  O,
  A = true
> = true extends A ? Awaited<ReturnType<F>> | Awaited<O> : ReturnType<F> | O;

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
