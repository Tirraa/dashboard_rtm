/* v8 ignore start */
// Stryker disable all

import type { LocalesGetterConfigObjTypeConstraint, LocalesObjEntity, LocalesObj } from '@rtm/shared-types/I18n';

import { LANGUAGES } from '##/config/i18n';

// https://stackoverflow.com/questions/77315286/is-it-possible-to-keep-a-strict-type-argument-on-promise-when-using-an-import & https://github.com/microsoft/TypeScript/issues/56242
const GENERATED_LOCALES_OBJ = Object.fromEntries(
  LANGUAGES.map((language) => [language, () => import(`@/i18n/locales/${language}`)] satisfies LocalesObjEntity)
) as LocalesObj satisfies LocalesGetterConfigObjTypeConstraint;

export default GENERATED_LOCALES_OBJ;

// Stryker restore all
/* v8 ignore stop */
