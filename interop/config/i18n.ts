import type { I18nVocabScope, MakeI18nsBase, LanguageFlag, I18nsBase } from '@rtm/shared-types/I18n';

import getEnumKeys from '../../src/lib/portable/typescript/getEnumKeys';
import DEFAULT_LANGUAGE_OBJ from '../../src/i18n/locales/fr';

export enum ELanguagesFlag {
  fr,
  en
}

const _i18nsBase = {
  metadescriptions: 'metadescriptions',
  pagesTitles: 'pages-titles',
  searchMenu: 'search-menu',
  dashboard: 'dashboard',
  filters: 'filters',
  navbar: 'navbar',
  errors: 'errors',
  infos: '_infos',
  vocab: 'vocab',
  blog: 'blog',
  auth: 'auth'
} as const satisfies I18nsBase;

const i18nsBase: MakeI18nsBase<typeof _i18nsBase> = _i18nsBase;

export const i18ns = {
  ...i18nsBase,
  brokenPagefindIntegrationError: `${i18nsBase.errors}.brokenPagefindIntegration`,
  dashboardPagesTitles: `${i18nsBase.dashboard}.pages-titles`,
  searchMenuOptions: `${i18nsBase.searchMenu}.options`,
  searchMenuSrOnly: `${i18nsBase.searchMenu}.sr-only`,
  blogTagsFilters: `${i18nsBase.blog}.tags-filters`,
  blogCategories: `${i18nsBase.blog}.categories`,
  blogAuthors: `${i18nsBase.blog}.authors`,
  srOnly: `${i18nsBase.vocab}.sr-only`,
  blogTags: `${i18nsBase.blog}.tags`,
  blogToc: `${i18nsBase.blog}.toc`
} as const satisfies Record<PropertyKey, I18nVocabScope> & typeof i18nsBase;

export const DEFAULT_LANGUAGE = DEFAULT_LANGUAGE_OBJ._infos.lng satisfies LanguageFlag;
export const LANGUAGES: LanguageFlag[] = getEnumKeys(ELanguagesFlag);

export type DefaultLanguage = typeof DEFAULT_LANGUAGE;
