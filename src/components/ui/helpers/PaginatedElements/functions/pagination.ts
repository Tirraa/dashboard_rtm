import type { Quantity, Count, Index, Limit } from '@rtm/shared-types/Numbers';
import type { BlogPostPreviewComponentWithMetadatas } from '@/types/Blog';
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { ReactElementKey } from '@rtm/shared-types/React';

import { FIRST_PAGE_PARAM } from '../constants';

export function getSanitizedCurrentPage(searchParams: URLSearchParams, maxPage: Limit, pageKey: string) {
  const maybeUnsafePageFromUrl: MaybeNull<string> = searchParams.get(pageKey);
  // Stryker Workaround 1. Pointless mutant
  // Stryker disable next-line ConditionalExpression
  const unsafePageFromUrl = maybeUnsafePageFromUrl === null ? FIRST_PAGE_PARAM : Number(maybeUnsafePageFromUrl);

  if (isNaN(unsafePageFromUrl)) return FIRST_PAGE_PARAM;
  // Stryker Workaround 2. Pointless mutant
  // Stryker disable next-line EqualityOperator
  if (unsafePageFromUrl < FIRST_PAGE_PARAM) return FIRST_PAGE_PARAM;
  // Stryker Workaround 3. Pointless mutant
  // Stryker disable next-line EqualityOperator
  if (unsafePageFromUrl > maxPage) return maxPage;
  return unsafePageFromUrl;
}

function findPageNumberByPaginatedElementIndex(paginatedElementIndex: Index, elementsPerPage: Quantity): Count {
  // eslint-disable-next-line no-magic-numbers
  const sanitizedIndex: Index = Math.max(0, paginatedElementIndex);

  // eslint-disable-next-line no-magic-numbers
  const retrievedPage: Count = Math.trunc(sanitizedIndex / elementsPerPage) + 1;
  return retrievedPage;
}

function findFirstCommonElementIndex(
  oldSliceIds: ReactElementKey[],
  maybeFilteredPostsCollection: BlogPostPreviewComponentWithMetadatas[]
  // eslint-disable-next-line no-magic-numbers
): Index | -1 {
  for (const postId of oldSliceIds) {
    // eslint-disable-next-line no-magic-numbers
    const maybeFirstCommonElementIndex: Index | -1 = maybeFilteredPostsCollection.findIndex((post) => post._id === postId);
    /* eslint-disable no-magic-numbers */
    // Stryker Workaround 4. Pointless mutant
    // Stryker disable next-line ConditionalExpression,UnaryOperator
    if (maybeFirstCommonElementIndex !== -1) return maybeFirstCommonElementIndex;
    /* eslint-enable no-magic-numbers */
  }
  /* eslint-disable no-magic-numbers */
  // Stryker Workaround 5. Pointless mutant
  // Stryker disable next-line UnaryOperator
  return -1;
  /* eslint-enable no-magic-numbers */
}

export function computeReconciliatedPageIndex(
  oldSliceIds: ReactElementKey[],
  maybeFilteredPostsCollection: BlogPostPreviewComponentWithMetadatas[],
  elementsPerPage: Quantity
  // eslint-disable-next-line no-magic-numbers
): Index {
  const commonElementIndex = findFirstCommonElementIndex(oldSliceIds, maybeFilteredPostsCollection);

  /* eslint-disable no-magic-numbers */
  // Stryker Workaround 6. Pointless mutant
  // Stryker disable next-line ConditionalExpression
  if (commonElementIndex === -1) return FIRST_PAGE_PARAM;
  /* eslint-enable no-magic-numbers */

  const newPage = findPageNumberByPaginatedElementIndex(commonElementIndex, elementsPerPage);
  return newPage;
}
