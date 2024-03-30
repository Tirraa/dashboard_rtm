import type { Quantity, Count, Limit, Index } from '@rtm/shared-types/Numbers';
import type { MaybeNull, Couple } from '@rtm/shared-types/CustomUtilityTypes';
import type { ReactElement } from 'react';

import { FIRST_PAGE_PARAM } from './constants';

export function getSanitizedCurrentPage(searchParams: URLSearchParams, maxPage: Limit, pageKey: string) {
  const maybeUnsafePageFromUrl: MaybeNull<string> = searchParams.get(pageKey);
  const unsafePageFromUrl = maybeUnsafePageFromUrl === null ? FIRST_PAGE_PARAM : Number(maybeUnsafePageFromUrl);

  if (isNaN(unsafePageFromUrl)) return FIRST_PAGE_PARAM;
  if (unsafePageFromUrl < FIRST_PAGE_PARAM) return FIRST_PAGE_PARAM;
  if (unsafePageFromUrl > maxPage) return maxPage;
  return unsafePageFromUrl;
}

function getPaginatedElementsCurrentSliceStartAndEndIndexes(page: Count, elementsPerPage: Quantity): Couple<Index> {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const startIndex = Math.max(0, page - 1) * elementsPerPage;
  const endIndex = startIndex + elementsPerPage;

  return [startIndex, endIndex];
}

export function findPageNumberByPaginatedElementIndex(paginatedElementIndex: Index, elementsPerPage: Quantity, pagesAmount: Quantity): Count {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const lastIndex: Limit = elementsPerPage * pagesAmount - 1;
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const sanitizedIndex: Index = Math.min(Math.max(0, paginatedElementIndex), lastIndex);

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const retrievedPage: Count = Math.trunc(sanitizedIndex / elementsPerPage) + 1;
  return retrievedPage;
}

export function getPaginatedElementsCurrentSlice(page: Count, elementsPerPage: Quantity, paginatedElements: ReactElement[]): ReactElement[] {
  if (paginatedElements.length <= elementsPerPage) return paginatedElements;
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const [startIndex, endIndex] = getPaginatedElementsCurrentSliceStartAndEndIndexes(page, elementsPerPage);
  const currentSlice = paginatedElements.slice(startIndex, endIndex);

  return currentSlice;
}
