import type { Quantity, Count, Limit, Index } from '@rtm/shared-types/Numbers';
import type { MaybeNull, Couple } from '@rtm/shared-types/CustomUtilityTypes';
import type { BlogPostPreviewComponentWithMetadatas } from '@/types/Blog';
import type { ReactElementKey } from '@rtm/shared-types/React';
import type { ReactElement } from 'react';

import { FIRST_PAGE_PARAM } from './constants';

export function getSanitizedCurrentFilterIndex(searchParams: URLSearchParams, maxFilter: Limit, filtersKey: string) {
  const FIRST_FILTER_INDEX = 0;
  const maybeUnsafeFilterFromUrl: MaybeNull<string> = searchParams.get(filtersKey);
  const unsafeFilterFromUrl = maybeUnsafeFilterFromUrl === null ? FIRST_FILTER_INDEX : Number(maybeUnsafeFilterFromUrl);

  if (isNaN(unsafeFilterFromUrl)) return FIRST_FILTER_INDEX;
  if (unsafeFilterFromUrl < FIRST_FILTER_INDEX) return FIRST_FILTER_INDEX;
  if (unsafeFilterFromUrl > maxFilter) return maxFilter;
  return unsafeFilterFromUrl;
}

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

function findPageNumberByPaginatedElementIndex(paginatedElementIndex: Index, elementsPerPage: Quantity): Count {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const sanitizedIndex: Index = Math.max(0, paginatedElementIndex);

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const retrievedPage: Count = Math.trunc(sanitizedIndex / elementsPerPage) + 1;
  return retrievedPage;
}

function findFirstCommonElementIndex(
  oldSliceIds: ReactElementKey[],
  maybeFilteredPostsCollection: BlogPostPreviewComponentWithMetadatas[]
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
): Index | -1 {
  for (const postId of oldSliceIds) {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const maybeFirstCommonElementIndex: Index | -1 = maybeFilteredPostsCollection.findIndex((post) => post._id === postId);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (maybeFirstCommonElementIndex !== -1) return maybeFirstCommonElementIndex;
  }
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  return -1;
}

export function computeReconciliatedPageIndex(
  pagesSlicesRelatedPostsIdsHistory: Array<ReactElementKey[]>,
  maybeFilteredPostsCollection: BlogPostPreviewComponentWithMetadatas[],
  elementsPerPage: Quantity
) {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (pagesSlicesRelatedPostsIdsHistory.length <= 1) return -1;
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const oldSliceIds = pagesSlicesRelatedPostsIdsHistory[0];

  const commonElementIndex = findFirstCommonElementIndex(oldSliceIds, maybeFilteredPostsCollection);

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (commonElementIndex === -1) return -1;

  const newPage = findPageNumberByPaginatedElementIndex(commonElementIndex, elementsPerPage);
  return newPage;
}

export function getPaginatedElementsCurrentSlice(page: Count, elementsPerPage: Quantity, paginatedElements: ReactElement[]): ReactElement[] {
  if (paginatedElements.length <= elementsPerPage) return paginatedElements;
  const [startIndex, endIndex] = getPaginatedElementsCurrentSliceStartAndEndIndexes(page, elementsPerPage);
  const currentSlice = paginatedElements.slice(startIndex, endIndex);

  return currentSlice;
}
