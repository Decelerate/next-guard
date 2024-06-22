type ExcludeTrue<T> = T extends true ? never : T;

export type UnionOfFunctionReturnTypes<
  FuncArray extends ((...args: any) => any)[]
> = ExcludeTrue<Awaited<ReturnType<FuncArray[number]>>>;

export type ReturnTypeOverride<
  F extends (...args: any) => any,
  O,
  A = true
> = true extends A ? Awaited<ReturnType<F>> | Awaited<O> : ReturnType<F> | O;
