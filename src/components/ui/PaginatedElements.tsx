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

const FIRST_PAGE_IDX = 1;

function getSanitizedCurrentPage(pageFromUrl: number, maxPage: number) {
  if (isNaN(pageFromUrl)) return FIRST_PAGE_IDX;
  if (pageFromUrl < FIRST_PAGE_IDX) return FIRST_PAGE_IDX;
  if (pageFromUrl > maxPage) return maxPage;
  return pageFromUrl;
}

const PaginatedElements: FunctionComponent<PaginatedElementsProps> = ({ paginatedElements, elementsPerPage, pagesAmount }) => {
  const searchParams = useSearchParams();

  if (paginatedElements.length <= elementsPerPage) return paginatedElements;

  const maybeUnsafePageFromUrl: MaybeNull<string> = searchParams.get(PAGE_KEY);
  const unsafePageFromUrl = maybeUnsafePageFromUrl === null ? FIRST_PAGE_IDX : Number(maybeUnsafePageFromUrl);

  const pageFromUrl = getSanitizedCurrentPage(unsafePageFromUrl, pagesAmount);

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const startIndex = (pageFromUrl - 1) * elementsPerPage;
  const endIndex = startIndex + elementsPerPage;
  const currentSlice = paginatedElements.slice(startIndex, endIndex);

  return currentSlice;
};

export default PaginatedElements;
