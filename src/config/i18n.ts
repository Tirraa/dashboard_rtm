import { getEnumFirstKey } from '@/lib/misc/getEnumKeys';
import { LanguageFlag } from '@/types/i18n';

export type VocabBase = typeof import('../i18n/locales/fr').default;
export enum ELanguageFlag {
  fr,
  en
}

export const i18ns = {
  navbar: 'navbar',
  dashboard: 'dashboard',
  blogCategories: 'blog-categories'
} as const;

export const DEFAULT_LANGUAGE: LanguageFlag = getEnumFirstKey(ELanguageFlag) as LanguageFlag;
