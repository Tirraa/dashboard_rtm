/* v8 ignore start */
// Stryker disable all
// * ... Adapter
// * ... https://github.com/QuiiBz/next-international/blob/main/packages/international-types/index.ts#L112
type PluralSuffix = 'other' | 'zero' | 'many' | 'one' | 'two' | 'few';
export type RemovePlural<Key extends string> = Key extends `${infer Head}#${PluralSuffix}` ? Head : Key;
// Stryker restore all
/* v8 ignore stop */
