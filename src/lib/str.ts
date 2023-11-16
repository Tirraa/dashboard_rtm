import buildAbsolutePathFromParts from './app-agnostic/str/buildAbsolutePathFromParts';
import buildPageTitle from './app-agnostic/str/buildPageTitle';
import buildPathFromParts from './app-agnostic/str/buildPathFromParts';
import capitalize from './app-agnostic/str/capitalize';
import compareAlphabetically from './app-agnostic/str/compareAlphabetically';
import fromKebabCaseToSentenceCase from './app-agnostic/str/fromKebabCaseToSentenceCase';
import getFormattedDate from './app-agnostic/str/getFormattedDate';
import getLastPathPart from './app-agnostic/str/getLastPathPart';
import getSlashEnvelope from './app-agnostic/str/getSlashEnvelope';
import indexOfNthOccurrence from './app-agnostic/str/indexOfNthOccurrence';
import pluralize from './app-agnostic/str/pluralize';
import { getPathnameWithoutI18nFlag } from './i18n';

import ROUTES_ROOTS from '@/config/routes';
import type { AppPath } from '@/types/Next';

export function hrefMatchesPathname(href: AppPath, pathname: AppPath, root: AppPath = ROUTES_ROOTS.WEBSITE): boolean {
  const pathnameWithouti18n = getPathnameWithoutI18nFlag(pathname);
  if (pathnameWithouti18n === href) return true;
  if (href !== root && pathnameWithouti18n.startsWith(getSlashEnvelope(href))) return true;
  return false;
}

export {
  buildAbsolutePathFromParts,
  buildPageTitle,
  buildPathFromParts,
  capitalize,
  compareAlphabetically,
  fromKebabCaseToSentenceCase,
  getFormattedDate,
  getLastPathPart,
  getSlashEnvelope,
  indexOfNthOccurrence,
  pluralize
};
