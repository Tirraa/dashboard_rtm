import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { Limit } from '@rtm/shared-types/Numbers';

// {ToDo} Write test
export function getSanitizedCurrentFilterIndex(searchParams: URLSearchParams, maxFilter: Limit, filtersKey: string) {
  const FIRST_FILTER_INDEX = 0;
  const maybeUnsafeFilterFromUrl: MaybeNull<string> = searchParams.get(filtersKey);
  const unsafeFilterFromUrl = maybeUnsafeFilterFromUrl === null ? FIRST_FILTER_INDEX : Number(maybeUnsafeFilterFromUrl);

  if (isNaN(unsafeFilterFromUrl)) return FIRST_FILTER_INDEX;
  if (unsafeFilterFromUrl < FIRST_FILTER_INDEX) return FIRST_FILTER_INDEX;
  if (unsafeFilterFromUrl > maxFilter) return maxFilter;
  return unsafeFilterFromUrl;
}
