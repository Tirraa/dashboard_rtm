import type { AppPath } from '@rtm/shared-types/Next';

import ROUTES_ROOTS from '##/config/routes';

import fromKebabCaseToSentenceCase from './portable/str/fromKebabCaseToSentenceCase';
import compareAlphabetically from './portable/str/compareAlphabetically';
import indexOfNthOccurrence from './portable/str/indexOfNthOccurrence';
import getFormattedDate from './portable/str/getFormattedDate';
import getSlashEnvelope from './portable/str/getSlashEnvelope';
import countCharacter from './portable/str/countCharacter';
import endsWithChars from './portable/str/endsWithChar';
import { getPathnameWithoutI18nFlag } from './i18n';
import capitalize from './portable/str/capitalize';

export function hrefMatchesPathname(href: AppPath, pathname: AppPath, root: AppPath = ROUTES_ROOTS.WEBSITE): boolean {
  const pathnameWithoutI18n = getSlashEnvelope(getPathnameWithoutI18nFlag(pathname));
  const _href = getSlashEnvelope(href);
  const _root = getSlashEnvelope(root);

  if (pathnameWithoutI18n === _href) return true;
  if (_href !== _root && pathnameWithoutI18n.startsWith(_href)) return true;
  return false;
}

export {
  fromKebabCaseToSentenceCase,
  compareAlphabetically,
  indexOfNthOccurrence,
  getFormattedDate,
  getSlashEnvelope,
  countCharacter,
  endsWithChars,
  capitalize
};
