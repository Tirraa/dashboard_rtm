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

// * ... Magic

type ValidateI18ns<T extends I18ns> = keyof VocabType extends keyof FlipI18ns<T>
  ? T
  : '✗ Missing value: i18ns must include all the keys of VocabType, exhaustively, as its values.';

type FlipI18ns<T extends I18ns> = {
  [P in keyof T as T[P]]: P;
};

type I18ns = Record<PropertyKey, keyof VocabType>;
