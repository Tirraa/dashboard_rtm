import DEFAULT_LANGUAGE_OBJ from '@/i18n/locales/fr';
import getEnumKeys from '@/lib/misc/getEnumKeys';
import { LanguageFlag, VocabType } from '@/types/i18n';

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
  ugly: 'ugly',
  vocab: 'vocab'
} as const satisfies Record<string, keyof VocabType>;

export const DEFAULT_LANGUAGE: LanguageFlag = DEFAULT_LANGUAGE_OBJ._infos.lng;
export const LANGUAGES: LanguageFlag[] = getEnumKeys(ELanguagesFlag) as LanguageFlag[];
