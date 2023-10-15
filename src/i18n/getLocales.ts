import { LANGUAGES } from '@/config/i18n';
import { LocalesGetterConfigObjTypeConstraint, LocalesObj, LocalesObjEntity } from '@/types/i18n';

export const GENERATED_LOCALES_OBJ = Object.fromEntries(
  LANGUAGES.map((language) => [language, () => import(`@/i18n/locales/${language}`)] satisfies LocalesObjEntity)
) as LocalesObj satisfies LocalesGetterConfigObjTypeConstraint;

export default GENERATED_LOCALES_OBJ;
