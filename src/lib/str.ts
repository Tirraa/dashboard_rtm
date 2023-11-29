import capitalize from './functions/str/capitalize';
import compareAlphabetically from './functions/str/compareAlphabetically';
import countCharacter from './functions/str/countCharacter';
import endsWithChars from './functions/str/endsWithChar';
import fromKebabCaseToSentenceCase from './functions/str/fromKebabCaseToSentenceCase';
import getFormattedDate from './functions/str/getFormattedDate';
import getSlashEnvelope from './functions/str/getSlashEnvelope';
import indexOfNthOccurrence from './functions/str/indexOfNthOccurrence';
import pluralize from './functions/str/pluralize';
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
