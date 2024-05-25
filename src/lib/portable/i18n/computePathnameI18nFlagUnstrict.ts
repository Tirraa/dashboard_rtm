import type { Index } from '@rtm/shared-types/Numbers';
import type { AppPath } from '@rtm/shared-types/Next';

import indexOfNthOccurrence from '../str/indexOfNthOccurrence';

function computePathnameI18nFlagUnstrict(pathname: AppPath, providedEndIndex?: Index): string {
  // eslint-disable-next-line no-magic-numbers
  const compute = (pathname: AppPath, endIndex: Index) => (endIndex === -1 ? pathname.substring(1) : pathname.substring(1, endIndex));

  if (providedEndIndex !== undefined) return compute(pathname, providedEndIndex);

  // eslint-disable-next-line no-magic-numbers
  const endIndex = indexOfNthOccurrence(pathname, '/', 2);
  return compute(pathname, endIndex);
}

export default computePathnameI18nFlagUnstrict;
