import type { Quantity, Count, Index } from '@rtm/shared-types/Numbers';
import type { Couple } from '@rtm/shared-types/CustomUtilityTypes';
import type { ReactElement } from 'react';

function getPaginatedElementsCurrentSliceStartAndEndIndexes(page: Count, elementsPerPage: Quantity): Couple<Index> {
  // eslint-disable-next-line no-magic-numbers
  const startIndex = Math.max(0, page - 1) * elementsPerPage;
  const endIndex = startIndex + elementsPerPage;

  return [startIndex, endIndex];
}

export function getPaginatedElementsCurrentSlice(page: Count, elementsPerPage: Quantity, paginatedElements: ReactElement[]): ReactElement[] {
  // Stryker Workaround 1. Pointless mutant, just a minor optimization.
  // Stryker disable next-line EqualityOperator,ConditionalExpression
  if (paginatedElements.length <= elementsPerPage) return paginatedElements;
  const [startIndex, endIndex] = getPaginatedElementsCurrentSliceStartAndEndIndexes(page, elementsPerPage);
  const currentSlice = paginatedElements.slice(startIndex, endIndex);

  return currentSlice;
}
