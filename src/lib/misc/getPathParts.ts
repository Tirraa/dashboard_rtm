import type { AppPath } from '@rtm/shared-types/Next';

import getPathnameWithoutI18nFlag from '../notPortable/i18n/getPathnameWithoutI18nFlag';

function getPathParts(pathname: AppPath) {
  let pathnameWithoutI18nFlag = getPathnameWithoutI18nFlag(pathname);
  // eslint-disable-next-line no-magic-numbers
  if (pathnameWithoutI18nFlag.charAt(0) === '/') pathnameWithoutI18nFlag = pathnameWithoutI18nFlag.substring(1);

  return pathnameWithoutI18nFlag.split('/');
}

export default getPathParts;
