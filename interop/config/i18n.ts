import type { I18ns, LanguageFlag, MakeI18ns } from '##/types/magic/i18n';
import DEFAULT_LANGUAGE_OBJ from '../../src/i18n/locales/fr';
import { getEnumKeys } from '../../src/lib/functions/typescript/getEnumKeys';

export enum ELanguagesFlag {
  fr,
  en
}

const _i18ns = {
  auth: 'auth',
  blogCategories: 'blog-categories',
  dashboard: 'dashboard',
  infos: '_infos',
  manualSEO: 'manual-SEO',
  navbar: 'navbar',
  pagesTitles: 'pages-titles',
  vocab: 'vocab'
} as const satisfies I18ns;

export const i18ns: MakeI18ns<typeof _i18ns> = _i18ns;

export const LANGUAGES: LanguageFlag[] = getEnumKeys(ELanguagesFlag);
export const DEFAULT_LANGUAGE: LanguageFlag = DEFAULT_LANGUAGE_OBJ._infos.lng;
