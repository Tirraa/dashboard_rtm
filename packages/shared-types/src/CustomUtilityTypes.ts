type SplitKeys<S extends string> = S extends `${infer Head}${KeySeparator}${infer Tail}` ? [Head, ...SplitKeys<Tail>] : [S];

type JoinKeys<T extends string[]> = T extends []
  ? never
  : T extends [infer Head, ...infer Tail]
    ? Head extends string
      ? Tail extends string[]
        ? `${Head}${KeySeparator}${JoinKeys<Tail>}`
        : never
      : never
    : never;

export type MakeHomogeneousValuesObjType<Obj extends object, ObjValuesType> = {
  [K in keyof Obj]: Obj[K] extends object ? MakeHomogeneousValuesObjType<Obj[K], ObjValuesType> : ObjValuesType;
};

export type JSPrimitives = string | number | boolean | null | undefined;

export type KeySeparator = '.';

export type DeepPathToLiteralKeys<DeepPath extends string> = JoinKeys<SplitKeys<DeepPath>>;

// * ... https://github.com/microsoft/TypeScript/issues/56080
export type Tuple<T1, T2 = never> = [] & T2 extends never ? [T1, T1] : [T1, T2];

export type Maybe<T> = T | null;
export type MaybeObjectValue<T> = T | undefined;

// * ... https://github.com/microsoft/TypeScript/issues/56080
export type CompareFun<T extends Tuple<unknown>, CTX extends unknown[] = never> = Function & CTX extends never
  ? (x1: T[0], x2: T[1]) => CompareFunReturnValue
  : (x1: T[0], x2: T[1], ...ctx: [...CTX]) => CompareFunReturnValue;

type CompareFunReturnValue = number;
