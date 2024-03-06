/* v8 ignore start */
// Stryker disable all

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

export type JSPrimitives = undefined | boolean | string | number | null;

export type KeySeparator = '.';

export type DeepPathToLiteralKeys<DeepPath extends string> = JoinKeys<SplitKeys<DeepPath>>;

// https://github.com/microsoft/TypeScript/issues/56080
export type Couple<Left, Right = never> = /*__CAST `never` TO__*/ [] & Right extends never ? [Left, Left] : [Left, Right];

export type MaybeNull<T> = null | T;
export type MaybeUndefined<T> = undefined | T;
export type MaybeObjectValue<T> = MaybeUndefined<T>;
export type MaybeSessionUser<T> = MaybeUndefined<T>;
export type MaybeSessionUserField<T> = MaybeUndefined<T> | MaybeNull<T>;

// https://github.com/microsoft/TypeScript/issues/56080
export type CompareFun<T extends Couple<unknown>, CTX extends unknown[] = never> = /*__CAST `never` TO__*/ Function & CTX extends never
  ? // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    (left: T[0], right: T[1]) => CompareFunReturnValue
  : // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    (left: T[0], right: T[1], ...ctx: [...CTX]) => CompareFunReturnValue;

type CompareFunReturnValue = number;

export type EmptyString = '';

// Stryker restore all
/* v8 ignore stop */
