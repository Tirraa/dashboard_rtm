import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { Limit } from '@rtm/shared-types/Numbers';

import { FIRST_PAGE_IDX } from './constants';

export function getSanitizedCurrentPage(searchParams: URLSearchParams, maxPage: Limit, pageKey: string) {
  const maybeUnsafePageFromUrl: MaybeNull<string> = searchParams.get(pageKey);
  const unsafePageFromUrl = maybeUnsafePageFromUrl === null ? FIRST_PAGE_IDX : Number(maybeUnsafePageFromUrl);

  if (isNaN(unsafePageFromUrl)) return FIRST_PAGE_IDX;
  if (unsafePageFromUrl < FIRST_PAGE_IDX) return FIRST_PAGE_IDX;
  if (unsafePageFromUrl > maxPage) return maxPage;
  return unsafePageFromUrl;
}
