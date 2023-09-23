import defaultLanguage from '@/i18n/locales/fr';
import getEnumKeys from '@/lib/misc/getEnumKeys';
import { LanguageFlag } from '@/types/i18n';

export type VocabBase = typeof defaultLanguage;
export enum ELanguagesFlag {
  fr,
  en
}

export const i18ns = {
  navbar: 'navbar',
  dashboard: 'dashboard',
  blogCategories: 'blog-categories',
  auth: 'auth'
} as const;

export const DEFAULT_LANGUAGE = defaultLanguage._infos.lng;
export const LANGUAGES: LanguageFlag[] = getEnumKeys(ELanguagesFlag) as LanguageFlag[];

export { defaultLanguage as fallbackLocale };
