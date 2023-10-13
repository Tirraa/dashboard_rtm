// * ... https://github.com/QuiiBz/next-international/blob/main/packages/international-types/index.ts#L112
type PluralSuffix = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other';
export type RemovePlural<Key extends string> = Key extends `${infer Head}#${PluralSuffix}` ? Head : Key;
