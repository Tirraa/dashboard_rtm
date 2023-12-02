import capitalize from './portable/str/capitalize';
import compareAlphabetically from './portable/str/compareAlphabetically';
import countCharacter from './portable/str/countCharacter';
import endsWithChars from './portable/str/endsWithChar';
import fromKebabCaseToSentenceCase from './portable/str/fromKebabCaseToSentenceCase';
import getFormattedDate from './portable/str/getFormattedDate';
import getSlashEnvelope from './portable/str/getSlashEnvelope';
import indexOfNthOccurrence from './portable/str/indexOfNthOccurrence';
import pluralize from './portable/str/pluralize';
import { getPathnameWithoutI18nFlag } from './i18n';

import ROUTES_ROOTS from '##/config/routes';
import type { AppPath } from '@rtm/shared-types/Next';

export function hrefMatchesPathname(href: AppPath, pathname: AppPath, root: AppPath = ROUTES_ROOTS.WEBSITE): boolean {
  const pathnameWithouti18n = getPathnameWithoutI18nFlag(pathname);
  if (pathnameWithouti18n === href) return true;
  if (href !== root && pathnameWithouti18n.startsWith(getSlashEnvelope(href))) return true;
  return false;
}

export {
  capitalize,
  compareAlphabetically,
  countCharacter,
  endsWithChars,
  fromKebabCaseToSentenceCase,
  getFormattedDate,
  getSlashEnvelope,
  indexOfNthOccurrence,
  pluralize
};
