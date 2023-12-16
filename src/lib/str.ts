import { getPathnameWithoutI18nFlag } from './i18n';
import capitalize from './portable/str/capitalize';
import compareAlphabetically from './portable/str/compareAlphabetically';
import countCharacter from './portable/str/countCharacter';
import endsWithChars from './portable/str/endsWithChar';
import fromKebabCaseToSentenceCase from './portable/str/fromKebabCaseToSentenceCase';
import getFormattedDate from './portable/str/getFormattedDate';
import getSlashEnvelope from './portable/str/getSlashEnvelope';
import indexOfNthOccurrence from './portable/str/indexOfNthOccurrence';

import ROUTES_ROOTS from '##/config/routes';
import type { AppPath } from '@rtm/shared-types/Next';

export function hrefMatchesPathname(href: AppPath, pathname: AppPath, root: AppPath = ROUTES_ROOTS.WEBSITE): boolean {
  const pathnameWithoutI18n = getSlashEnvelope(getPathnameWithoutI18nFlag(pathname));
  const _href = getSlashEnvelope(href);
  const _root = getSlashEnvelope(root);

  if (pathnameWithoutI18n === _href) return true;
  if (_href !== _root && pathnameWithoutI18n.startsWith(_href)) return true;
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
  indexOfNthOccurrence
};
