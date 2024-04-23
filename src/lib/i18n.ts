import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { AppPathAsIs, AppPath } from '@rtm/shared-types/Next';
import type { LanguageFlag } from '@rtm/shared-types/I18n';
import type { Index } from '@rtm/shared-types/Numbers';

import ROUTES_ROOTS from '##/config/routes';

import indexOfNthOccurrence from './portable/str/indexOfNthOccurrence';
import isValidLanguageFlag from './portable/i18n/isValidLanguageFlag';

function computePathnameI18nFlagUnstrict(pathname: AppPath, providedEndIndex?: Index): string {
  // eslint-disable-next-line no-magic-numbers
  const compute = (pathname: AppPath, endIndex: Index) => (endIndex === -1 ? pathname.substring(1) : pathname.substring(1, endIndex));

  if (providedEndIndex !== undefined) return compute(pathname, providedEndIndex);

  // eslint-disable-next-line no-magic-numbers
  const endIndex = indexOfNthOccurrence(pathname, '/', 2);
  return compute(pathname, endIndex);
}

export function getPathnameWithoutI18nFlag(pathname: AppPath): AppPathAsIs | AppPath {
  // eslint-disable-next-line no-magic-numbers
  const secondSlashIndex = indexOfNthOccurrence(pathname, '/', 2);

  const pathnameI18nFlag = computePathnameI18nFlagUnstrict(pathname, secondSlashIndex);
  if (!isValidLanguageFlag(pathnameI18nFlag)) return pathname;

  // eslint-disable-next-line no-magic-numbers
  const pathnameWithouti18n = secondSlashIndex === -1 ? ROUTES_ROOTS.WEBSITE : pathname.substring(secondSlashIndex);
  return pathnameWithouti18n;
}

export function getPathnameMaybeI18nFlag(pathname: AppPath): MaybeNull<LanguageFlag> {
  const languageFlag = computePathnameI18nFlagUnstrict(pathname);
  if (!isValidLanguageFlag(languageFlag)) return null;
  return languageFlag;
}
