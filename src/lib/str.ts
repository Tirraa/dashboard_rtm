import type { AppPath } from '@rtm/shared-types/Next';

import { DEFAULT_LANGUAGE } from '##/config/i18n';
import ROUTES_ROOTS from '##/config/routes';

import { compareAlphabeticallyDesc, compareAlphabeticallyAsc } from './portable/str/compareAlphabetically';
import { getPathnameWithoutI18nFlag, getPathnameMaybeI18nFlag } from './i18n';
import indexOfNthOccurrence from './portable/str/indexOfNthOccurrence';
import getFormattedDate from './portable/str/getFormattedDate';
import getSlashEnvelope from './portable/str/getSlashEnvelope';
import countCharacter from './portable/str/countCharacter';
import endsWithChars from './portable/str/endsWithChar';
import capitalize from './portable/str/capitalize';

export function hrefMatchesPathname(href: AppPath, pathname: AppPath, root: AppPath = ROUTES_ROOTS.WEBSITE): boolean {
  const pathnameWithoutI18n = getSlashEnvelope(getPathnameWithoutI18nFlag(pathname));
  const _href = getSlashEnvelope(href);
  const _root = getSlashEnvelope(root);

  // Stryker Workaround 1. Tautology is pointless.
  // Stryker disable next-line ConditionalExpression
  if (pathnameWithoutI18n === _href) return true;
  if (_href !== _root && pathnameWithoutI18n.startsWith(_href)) return true;
  return false;
}

export function hrefAndPathnameExactMatch(href: AppPath, pathname: AppPath): boolean {
  const _pathname = pathname.replace(/\/+$/, '');
  const _href = href.replace(/\/+$/, '');

  if (_pathname === _href) return true;

  const pathnameI18nFlag = getPathnameMaybeI18nFlag(_pathname);
  const pathnameWithoutI18nflag = getPathnameWithoutI18nFlag(_pathname);

  if ((pathnameI18nFlag === DEFAULT_LANGUAGE || pathnameI18nFlag === '') && pathnameWithoutI18nflag === _href) return true;

  const hrefWithoutI18nFlag = getPathnameWithoutI18nFlag(_href);
  const hrefI18nFlag = getPathnameMaybeI18nFlag(_href);

  if (hrefI18nFlag === DEFAULT_LANGUAGE && pathnameWithoutI18nflag === hrefWithoutI18nFlag) return true;
  if (hrefI18nFlag === '' && pathnameWithoutI18nflag === _href) return true;

  if (hrefI18nFlag === '' && pathnameWithoutI18nflag === href) return true;

  if (hrefI18nFlag === pathnameI18nFlag && pathnameWithoutI18nflag === hrefWithoutI18nFlag) return true;
  return false;
}

export {
  compareAlphabeticallyDesc,
  compareAlphabeticallyAsc,
  indexOfNthOccurrence,
  getFormattedDate,
  getSlashEnvelope,
  countCharacter,
  endsWithChars,
  capitalize
};
