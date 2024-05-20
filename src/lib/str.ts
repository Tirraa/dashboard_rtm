import type { AppPath, Href } from '@rtm/shared-types/Next';

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

export function hrefAndPathnameExactMatch(href: Href, pathname: AppPath): boolean {
  const removeTrailingSlashes = (path: AppPath | Href) => path.replace(/\/+$/, '');

  const [_pathname, _href] = [removeTrailingSlashes(pathname), removeTrailingSlashes(href)];
  if (_pathname === _href) return true;

  const [pathnameI18nFlag, hrefI18nFlag] = [getPathnameMaybeI18nFlag(_pathname), getPathnameMaybeI18nFlag(_href)];
  const [pathnameWithoutI18nflag, hrefWithoutI18nFlag] = [getPathnameWithoutI18nFlag(_pathname), getPathnameWithoutI18nFlag(_href)];

  // Stryker Workaround 1. This code should be refactored, mutants analysis is unusable atm.
  // Stryker disable all
  return (
    ((pathnameI18nFlag === DEFAULT_LANGUAGE || pathnameI18nFlag === null) && pathnameWithoutI18nflag === _href) ||
    (hrefI18nFlag === DEFAULT_LANGUAGE && pathnameWithoutI18nflag === hrefWithoutI18nFlag) ||
    (hrefI18nFlag === null && (pathnameWithoutI18nflag === href || pathnameWithoutI18nflag === _href))
  );
  // Stryker restore all
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
