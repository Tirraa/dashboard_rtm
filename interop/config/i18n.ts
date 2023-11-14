import type { LanguageFlag, VocabType } from '##/types/hell/i18n';
import DEFAULT_LANGUAGE_OBJ from '../../src/i18n/locales/fr';
import { getEnumKeys } from '../../src/lib/app-agnostic/typescript/getEnumKeys';

export enum ELanguagesFlag {
  fr,
  en
}

export const i18ns = {
  auth: 'auth',
  blogCategories: 'blog-categories',
  dashboard: 'dashboard',
  infos: '_infos',
  manualSEO: 'manual-SEO',
  navbar: 'navbar',
  pagesTitles: 'pages-titles',
  vocab: 'vocab'
} as const satisfies Record<string, keyof VocabType>;

export const LANGUAGES: LanguageFlag[] = getEnumKeys(ELanguagesFlag) as LanguageFlag[];
export const DEFAULT_LANGUAGE: LanguageFlag = DEFAULT_LANGUAGE_OBJ._infos.lng;
