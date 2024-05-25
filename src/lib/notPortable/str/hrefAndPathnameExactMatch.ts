import type { AppPath, Href } from '@rtm/shared-types/Next';

import { DEFAULT_LANGUAGE } from '##/config/i18n';

import getPathnameWithoutI18nFlag from '../../notPortable/i18n/getPathnameWithoutI18nFlag';
import getPathnameMaybeI18nFlag from '../../notPortable/i18n/getPathnameMaybeI18nFlag';

function hrefAndPathnameExactMatch(href: Href, pathname: AppPath): boolean {
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

export default hrefAndPathnameExactMatch;
