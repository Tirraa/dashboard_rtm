import de from '@/i18n/locales/de';
import en from '@/i18n/locales/en';
import fr from '@/i18n/locales/fr';
import getEnumKeys from '@/lib/misc/getEnumKeys';
import { LanguageFlag, VocabType } from '@/types/i18n';

const DEFAULT_LANGUAGE_OBJ = fr;

export type VocabBase = typeof DEFAULT_LANGUAGE_OBJ;
export enum ELanguagesFlag {
  fr,
  en,
  de
}

// {ToDo} Hotfix: Wait and see - https://github.com/QuiiBz/next-international/issues/190#issuecomment-1736785232
export const FALLBACK_LANGUAGES: Record<LanguageFlag, VocabType> = {
  fr,
  en,
  de
};

export const i18ns = {
  navbar: 'navbar',
  dashboard: 'dashboard',
  blogCategories: 'blog-categories',
  auth: 'auth'
} as const;

export const DEFAULT_LANGUAGE = DEFAULT_LANGUAGE_OBJ._infos.lng as LanguageFlag;
export const LANGUAGES: LanguageFlag[] = getEnumKeys(ELanguagesFlag) as LanguageFlag[];
