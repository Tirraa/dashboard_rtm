'use client';

import type { FunctionComponent, ReactElement } from 'react';

import { useSearchParams } from 'next/navigation';

interface PaginatedElementsProps {
  paginatedElements: ReactElement[];
  elementsPerPage: number;
  pagesAmount: number;
  pagesRange?: number;
}

function initializeCurrentPage(pageFromUrl: number, maxPage: number) {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (isNaN(pageFromUrl)) return 1;
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (pageFromUrl < 1) return 1;
  if (pageFromUrl > maxPage) return maxPage;
  return pageFromUrl;
}

const PaginatedElements: FunctionComponent<PaginatedElementsProps> = ({ paginatedElements, elementsPerPage, pagesAmount }) => {
  const searchParams = useSearchParams();

  const unsafePageFromUrl = searchParams.get('page');
  const pageFromUrl = initializeCurrentPage(Number(unsafePageFromUrl), pagesAmount);

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const startIndex = (pageFromUrl - 1) * elementsPerPage;
  const endIndex = startIndex + elementsPerPage;
  const currentElements = paginatedElements.slice(startIndex, endIndex);

  return currentElements;
};

export default PaginatedElements;
