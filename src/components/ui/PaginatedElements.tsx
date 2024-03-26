'use client';

import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { FunctionComponent, ReactElement } from 'react';

import { useSearchParams } from 'next/navigation';

import { PAGE_KEY } from '../pages/blog/PaginationWidget';

interface PaginatedElementsProps {
  paginatedElements: ReactElement[];
  elementsPerPage: number;
  pagesAmount: number;
  pagesRange?: number;
}

export const FIRST_PAGE_IDX = 1;
export const MIN_PAGES_AMOUNT = 1;

export function getSanitizedCurrentPage(searchParams: URLSearchParams, maxPage: number, pageKey: string = PAGE_KEY) {
  const maybeUnsafePageFromUrl: MaybeNull<string> = searchParams.get(pageKey);
  const unsafePageFromUrl = maybeUnsafePageFromUrl === null ? FIRST_PAGE_IDX : Number(maybeUnsafePageFromUrl);

  if (isNaN(unsafePageFromUrl)) return FIRST_PAGE_IDX;
  if (unsafePageFromUrl < FIRST_PAGE_IDX) return FIRST_PAGE_IDX;
  if (unsafePageFromUrl > maxPage) return maxPage;
  return unsafePageFromUrl;
}

const PaginatedElements: FunctionComponent<PaginatedElementsProps> = ({ paginatedElements, elementsPerPage, pagesAmount }) => {
  const searchParams = useSearchParams();

  if (paginatedElements.length <= elementsPerPage) return paginatedElements;
  const pageFromUrl = getSanitizedCurrentPage(searchParams, pagesAmount);

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const startIndex = (pageFromUrl - 1) * elementsPerPage;
  const endIndex = startIndex + elementsPerPage;
  const currentSlice = paginatedElements.slice(startIndex, endIndex);

  return currentSlice;
};

export default PaginatedElements;
