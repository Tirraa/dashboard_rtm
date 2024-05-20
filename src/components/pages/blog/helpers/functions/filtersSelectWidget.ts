import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { Limit } from '@rtm/shared-types/Numbers';

import { FIRST_FILTER_INDEX } from '../constants';

export function getSanitizedCurrentFilterIndex(searchParams: URLSearchParams, maxFilter: Limit, filtersKey: string) {
  const maybeUnsafeFilterFromUrl: MaybeNull<string> = searchParams.get(filtersKey);
  // Stryker Workaround 1. Pointless mutant
  // Stryker disable next-line ConditionalExpression
  const unsafeFilterFromUrl = maybeUnsafeFilterFromUrl === null ? FIRST_FILTER_INDEX : Number(maybeUnsafeFilterFromUrl);

  if (isNaN(unsafeFilterFromUrl)) return FIRST_FILTER_INDEX;
  // Stryker Workaround 2. Pointless mutant
  // Stryker disable next-line EqualityOperator
  if (unsafeFilterFromUrl < FIRST_FILTER_INDEX) return FIRST_FILTER_INDEX;
  // Stryker Workaround 3. Pointless mutant
  // Stryker disable next-line EqualityOperator
  if (unsafeFilterFromUrl > maxFilter) return maxFilter;
  return unsafeFilterFromUrl;
}
