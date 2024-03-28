'use client';

import type { FunctionComponent, ReactElement } from 'react';

import { useSearchParams } from 'next/navigation';

import { getSanitizedCurrentPage } from './helpers/PaginatedElements/getSanitizedCurrentPage';

interface PaginatedElementsProps {
  paginatedElements: ReactElement[];
  elementsPerPage: number;
  pagesAmount: number;
  pagesRange?: number;
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
