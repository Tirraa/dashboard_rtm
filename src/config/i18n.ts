import { getEnumFirstKey } from '@/lib/misc/getEnumKeys';
import { LanguageFlag } from '@/types/i18n';

export type VocabBase = typeof import('@/i18n/locales/fr').default;
export enum ELanguagesFlag {
  fr,
  en
}

export const i18ns = {
  navbar: 'navbar',
  dashboard: 'dashboard',
  blogCategories: 'blog-categories'
} as const;

export const DEFAULT_LANGUAGE: LanguageFlag = getEnumFirstKey(ELanguagesFlag) as LanguageFlag;
