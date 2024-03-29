'use client';

import type { Quantity, Limit } from '@rtm/shared-types/Numbers';
import type { FunctionComponent, ReactElement } from 'react';

import { useSearchParams } from 'next/navigation';

import { getPaginatedElementsCurrentSlice, getSanitizedCurrentPage } from './helpers/PaginatedElements/functions';
import { PAGE_KEY } from './helpers/PaginatedElements/constants';

interface PaginatedElementsProps {
  paginatedElements: ReactElement[];
  elementsPerPage: Limit;
  pagesAmount: Quantity;
}

const PaginatedElements: FunctionComponent<PaginatedElementsProps> = ({ paginatedElements, elementsPerPage, pagesAmount }) => {
  const searchParams = useSearchParams();
  const pageFromUrl = getSanitizedCurrentPage(searchParams, pagesAmount, PAGE_KEY);

  const currentSlice = getPaginatedElementsCurrentSlice(pageFromUrl, elementsPerPage, paginatedElements);

  return currentSlice;
};

export default PaginatedElements;
