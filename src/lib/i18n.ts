import { DEFAULT_LANGUAGE } from '##/config/i18n';
import ROUTES_ROOTS from '##/config/routes';
import type { LanguageFlag } from '##/types/magic/I18n';
import type { AppPath, AppPathAsIs } from '@rtm/shared-types/Next';
import isValidLanguageFlag from './portable/i18n/isValidLanguageFlag';
import indexOfNthOccurrence from './portable/str/indexOfNthOccurrence';

function computePathnameI18nFlagUnstrict(pathname: AppPath, providedEndIndex?: number): string {
  const compute = (pathname: AppPath, endIndex: number) => (endIndex === -1 ? pathname.substring(1) : pathname.substring(1, endIndex));

  if (providedEndIndex !== undefined) return compute(pathname, providedEndIndex);

  const endIndex = indexOfNthOccurrence(pathname, '/', 2);
  return compute(pathname, endIndex);
}

function computePathnameI18nFlagStrict(pathname: AppPath, providedEndIndex?: number): LanguageFlag {
  const languageFlag = computePathnameI18nFlagUnstrict(pathname, providedEndIndex);
  if (!isValidLanguageFlag(languageFlag)) return DEFAULT_LANGUAGE;
  return languageFlag;
}

export function getPathnameWithoutI18nFlag(pathname: AppPath): AppPathAsIs | AppPath {
  const secondSlashIndex = indexOfNthOccurrence(pathname, '/', 2);

  const pathnameI18nFlag = computePathnameI18nFlagUnstrict(pathname, secondSlashIndex);
  if (!isValidLanguageFlag(pathnameI18nFlag)) return pathname;

  const pathnameWithouti18n = secondSlashIndex === -1 ? ROUTES_ROOTS.WEBSITE : pathname.substring(secondSlashIndex);
  return pathnameWithouti18n;
}

export function getPathnameI18nFlag(pathname: AppPath): LanguageFlag {
  const pathnameI18nFlag = computePathnameI18nFlagStrict(pathname);
  return pathnameI18nFlag;
}

export function getPathnameMaybeI18nFlag(pathname: AppPath): '' | LanguageFlag {
  const languageFlag = computePathnameI18nFlagUnstrict(pathname);
  if (!isValidLanguageFlag(languageFlag)) return '';
  return languageFlag;
}
