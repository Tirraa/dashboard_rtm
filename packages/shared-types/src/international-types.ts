/* v8 ignore start */
// Stryker disable all

// * ... Adapter (mirroring)
// https://github.com/QuiiBz/next-international/blob/main/packages/international-types/index.ts#L112

// eslint-disable-next-line perfectionist/sort-union-types
type PluralSuffix = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other';

// * ... Adapter (mirroring)
// https://github.com/QuiiBz/next-international/blob/main/packages/international-types/index.ts#L114
export type RemovePlural<Key extends string> = Key extends `${infer Head}#${PluralSuffix}` ? Head : Key;
// Stryker restore all
/* v8 ignore stop */
