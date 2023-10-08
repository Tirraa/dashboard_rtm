import { LANGUAGES } from '@/config/i18n';
import { LocalesGetterConfigObjTypeConstraint, LocalesObj } from '@/types/i18n';

export const LOCALES_OBJ = Object.fromEntries(
  LANGUAGES.map((locale) => [locale, () => import(`@/i18n/locales/${locale}`)])
) as LocalesObj satisfies LocalesGetterConfigObjTypeConstraint;

export default LOCALES_OBJ;
