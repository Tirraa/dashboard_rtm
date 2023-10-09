import { LANGUAGES } from '@/config/i18n';
import { LocalesGetterConfigObjTypeConstraint, LocalesObj } from '@/types/i18n';

export const LOCALES_OBJ = Object.fromEntries(
  LANGUAGES.map((language) => [language, () => import(`@/i18n/locales/${language}`)])
) as LocalesObj satisfies LocalesGetterConfigObjTypeConstraint;

export default LOCALES_OBJ;
