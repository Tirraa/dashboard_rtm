import type { AppPath } from '@rtm/shared-types/Next';

import ROUTES_ROOTS from '##/config/routes';

import getPathnameWithoutI18nFlag from '../../notPortable/i18n/getPathnameWithoutI18nFlag';
import getSlashEnvelope from '../../portable/str/getSlashEnvelope';

function hrefMatchesPathname(href: AppPath, pathname: AppPath, root: AppPath = ROUTES_ROOTS.WEBSITE): boolean {
  const pathnameWithoutI18n = getSlashEnvelope(getPathnameWithoutI18nFlag(pathname));
  const _href = getSlashEnvelope(href);
  const _root = getSlashEnvelope(root);

  // Stryker Workaround 1. Tautology is pointless.
  // Stryker disable next-line ConditionalExpression
  if (pathnameWithoutI18n === _href) return true;
  if (_href !== _root && pathnameWithoutI18n.startsWith(_href)) return true;
  return false;
}

export default hrefMatchesPathname;
