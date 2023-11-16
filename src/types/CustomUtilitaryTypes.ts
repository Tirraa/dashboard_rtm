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

export type RequiredFieldsOnly<T> = {
  [K in keyof T as T[K] extends Required<T>[K] ? K : never]: T[K];
};

export type MakeHomogeneousValuesObjType<Obj extends object, ObjValuesType> = {
  [K in keyof Obj]: Obj[K] extends object ? MakeHomogeneousValuesObjType<Obj[K], ObjValuesType> : ObjValuesType;
};

export type JSPrimitives = string | number | boolean | null | undefined;

export type KeySeparator = '.';

export type DeepPathToLiteralKeys<DeepPath> = DeepPath extends string ? JoinKeys<SplitKeys<DeepPath>> : never;

export type Maybe<T> = T | null;
export type MaybeObjectValue<T> = T | undefined;
