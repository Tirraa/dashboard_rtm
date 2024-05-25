import type { AppPath } from '@rtm/shared-types/Next';

import { APP_PROTECTED_PATHS } from '@/middleware';

import getPathnameWithoutI18nFlag from '../notPortable/i18n/getPathnameWithoutI18nFlag';

function isProtectedRoute(pathname: AppPath) {
  const currentRoute = getPathnameWithoutI18nFlag(pathname);
  const isProtectedRoute = APP_PROTECTED_PATHS.find((r) => currentRoute.startsWith(r));
  return Boolean(isProtectedRoute);
}

export default isProtectedRoute;
