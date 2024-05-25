/* v8 ignore start */
// Stryker disable all

import type { MaybeObjectValue, MaybeUndefined } from '@rtm/shared-types/CustomUtilityTypes';
import type { AppPath } from '@rtm/shared-types/Next';

import { VIP_SHORTCUTS } from '@/middleware';

import getPathnameWithoutI18nFlag from '../notPortable/i18n/getPathnameWithoutI18nFlag';

function getAuthenticatedUserRouteShortcut(pathname: AppPath): MaybeUndefined<AppPath> {
  const currentRoute = getPathnameWithoutI18nFlag(pathname);
  const vipShortcut = (VIP_SHORTCUTS as Record<PropertyKey, MaybeObjectValue<AppPath>>)[currentRoute];
  return vipShortcut;
}

export default getAuthenticatedUserRouteShortcut;

// Stryker restore all
/* v8 ignore stop */
