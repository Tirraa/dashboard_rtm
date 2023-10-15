import DEFAULT_LANGUAGE_OBJ from '@/i18n/locales/fr';
import getEnumKeys from '@/lib/misc/getEnumKeys';
import { LanguageFlag } from '@/types/i18n';

export enum ELanguagesFlag {
  fr,
  en
}

export const i18ns = {
  vocab: 'vocab',
  navbar: 'navbar',
  dashboard: 'dashboard',
  blogCategories: 'blog-categories',
  auth: 'auth',
  manualSEO: 'manual-SEO',
  ugly: 'ugly'
} as const;

export const DEFAULT_LANGUAGE: LanguageFlag = DEFAULT_LANGUAGE_OBJ._infos.lng;
export const LANGUAGES: LanguageFlag[] = getEnumKeys(ELanguagesFlag) as LanguageFlag[];
