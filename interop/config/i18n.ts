import type { I18nVocabScope, I18nsBase, LanguageFlag, MakeI18nsBase } from '##/types/magic/I18n';
import DEFAULT_LANGUAGE_OBJ from '../../src/i18n/locales/fr';
import getEnumKeys from '../../src/lib/portable/typescript/getEnumKeys';

export enum ELanguagesFlag {
  fr,
  en
}

const _i18nsBase = {
  auth: 'auth',
  blogCategories: 'blog-categories',
  dashboard: 'dashboard',
  infos: '_infos',
  manualSEO: 'manual-SEO',
  navbar: 'navbar',
  pagesTitles: 'pages-titles',
  vocab: 'vocab'
} as const satisfies I18nsBase;

const i18nsBase: MakeI18nsBase<typeof _i18nsBase> = _i18nsBase;

export const i18ns = {
  ...i18nsBase,
  dashboardPagesTitles: 'dashboard.pages-titles'
} as const satisfies typeof i18nsBase & Record<string, I18nVocabScope>;

export const LANGUAGES: LanguageFlag[] = getEnumKeys(ELanguagesFlag);
export const DEFAULT_LANGUAGE: LanguageFlag = DEFAULT_LANGUAGE_OBJ._infos.lng;
