export type RequiredFieldsOnly<T> = {
  [K in keyof T as T[K] extends Required<T>[K] ? K : never]: T[K];
};

export type MakeHomogeneousValuesObjType<Obj extends object, ObjValuesType> = {
  [K in keyof Obj]: Obj[K] extends object ? MakeHomogeneousValuesObjType<Obj[K], ObjValuesType> : ObjValuesType;
};

export type JSPrimitives = string | number | boolean | null | undefined;

export type KeySeparator = '.';

export type Split<S extends string, Delimiter extends string = KeySeparator> = S extends `${infer First}${Delimiter}${infer Rest}`
  ? [First, ...Split<Rest, Delimiter>]
  : [S];

export type UnionToLiteral<U> = U extends string ? Join<Split<U>> : never;

export type Join<T extends string[], Delimiter extends string = KeySeparator> = T extends []
  ? never
  : T extends [infer First, ...infer Rest]
  ? First extends string
    ? Rest extends string[]
      ? `${First}${Delimiter}${Join<Rest, Delimiter>}`
      : never
    : never
  : never;
