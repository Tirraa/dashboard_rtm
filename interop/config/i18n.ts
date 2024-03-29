import type { I18nVocabScope, MakeI18nsBase, LanguageFlag, I18nsBase } from '@rtm/shared-types/I18n';

import getEnumKeys from '../../src/lib/portable/typescript/getEnumKeys';
import DEFAULT_LANGUAGE_OBJ from '../../src/i18n/locales/fr';

export enum ELanguagesFlag {
  fr,
  en
}

const _i18nsBase = {
  blogCategories: 'blog-categories',
  pagesTitles: 'pages-titles',
  dashboard: 'dashboard',
  blogTags: 'blog-tags',
  blogToc: 'blogToc',
  navbar: 'navbar',
  infos: '_infos',
  vocab: 'vocab',
  auth: 'auth'
} as const satisfies I18nsBase;

const i18nsBase: MakeI18nsBase<typeof _i18nsBase> = _i18nsBase;

export const i18ns = {
  ...i18nsBase,
  dashboardPagesTitles: 'dashboard.pages-titles',
  srOnly: 'vocab.sr-only'
} as const satisfies typeof i18nsBase & Record<PropertyKey, I18nVocabScope>;

export const DEFAULT_LANGUAGE = DEFAULT_LANGUAGE_OBJ._infos.lng satisfies LanguageFlag;
export const LANGUAGES: LanguageFlag[] = getEnumKeys(ELanguagesFlag);

export type DefaultLanguage = typeof DEFAULT_LANGUAGE;
