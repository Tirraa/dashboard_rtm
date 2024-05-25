import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type LanguageFlag from '@rtm/shared-types/LanguageFlag';
import type { AppPath } from '@rtm/shared-types/Next';

import computePathnameI18nFlagUnstrict from '../../portable/i18n/computePathnameI18nFlagUnstrict';
import isValidLanguageFlag from '../../portable/i18n/isValidLanguageFlag';

function getPathnameMaybeI18nFlag(pathname: AppPath): MaybeNull<LanguageFlag> {
  const languageFlag = computePathnameI18nFlagUnstrict(pathname);
  if (!isValidLanguageFlag(languageFlag)) return null;
  return languageFlag;
}

export default getPathnameMaybeI18nFlag;
