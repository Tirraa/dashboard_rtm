import type { AppPathAsIs, AppPath } from '@rtm/shared-types/Next';

import ROUTES_ROOTS from '##/config/routes';

import computePathnameI18nFlagUnstrict from '../../portable/i18n/computePathnameI18nFlagUnstrict';
import indexOfNthOccurrence from '../../portable/str/indexOfNthOccurrence';
import isValidLanguageFlag from '../../portable/i18n/isValidLanguageFlag';

function getPathnameWithoutI18nFlag(pathname: AppPath): AppPathAsIs | AppPath {
  // eslint-disable-next-line no-magic-numbers
  const secondSlashIndex = indexOfNthOccurrence(pathname, '/', 2);

  const pathnameI18nFlag = computePathnameI18nFlagUnstrict(pathname, secondSlashIndex);
  if (!isValidLanguageFlag(pathnameI18nFlag)) return pathname;

  // eslint-disable-next-line no-magic-numbers
  const pathnameWithouti18n = secondSlashIndex === -1 ? ROUTES_ROOTS.WEBSITE : pathname.substring(secondSlashIndex);
  return pathnameWithouti18n;
}

export default getPathnameWithoutI18nFlag;
