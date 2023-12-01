import type { LanguageFlag, VocabType } from '##/types/magic/i18n';
import DEFAULT_LANGUAGE_OBJ from '../../src/i18n/locales/fr';
import { getEnumKeys } from '../../src/lib/functions/typescript/getEnumKeys';

export enum ELanguagesFlag {
  fr,
  en
}

const _i18ns = {
  auth: 'auth',
  blogCategories: 'blog-categories',
  dashboard: 'dashboard',
  infos: '_infos',
  manualSEO: 'manual-SEO',
  navbar: 'navbar',
  pagesTitles: 'pages-titles',
  vocab: 'vocab'
} as const satisfies I18ns;

export const i18ns: ValidateI18ns<typeof _i18ns> = _i18ns;

export const LANGUAGES: LanguageFlag[] = getEnumKeys(ELanguagesFlag);
export const DEFAULT_LANGUAGE: LanguageFlag = DEFAULT_LANGUAGE_OBJ._infos.lng;

// * ... Checkers

type I18ns = Record<PropertyKey, keyof VocabType>;

type ValidateI18ns<I18NS_CONST extends I18ns> = keyof VocabType extends keyof FlipI18ns<I18NS_CONST>
  ? I18NS_CONST
  : typeof _i18ns extends I18ns
    ? `Missing value: ${GetMissingValues<VocabType, FlipI18ns<typeof _i18ns>>['PWNED_BY_I18NS_CONST_IS_NOT_EXHAUSTIVE']}`
    : 'INVALID I18NS';

// * ... Checkers magic helpers

type FlipI18ns<I18NS_CONST extends I18ns> = {
  [P in keyof I18NS_CONST as I18NS_CONST[P]]: P;
};

type DiffKeys<OBJ_A extends object, OBJ_B extends object> = {
  [K in Exclude<keyof OBJ_A, keyof OBJ_B>]: K;
};

type ComputeMissingValues<VOCAB_TYPE extends VocabType, FLIPPED_I18NS_CONST extends object> = {
  PWNED_BY_I18NS_CONST_IS_NOT_EXHAUSTIVE: keyof DiffKeys<VOCAB_TYPE, FLIPPED_I18NS_CONST>;
};

type GetMissingValues<VOCAB_TYPE extends VocabType, FLIPPED_I18NS_CONST extends object> = keyof DiffKeys<
  VOCAB_TYPE,
  FLIPPED_I18NS_CONST
> extends never
  ? never
  : ComputeMissingValues<VOCAB_TYPE, FLIPPED_I18NS_CONST>;
