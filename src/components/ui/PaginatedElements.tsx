/* v8 ignore start */
// Stryker disable all

'use client';

import type { Limit, Count } from '@rtm/shared-types/Numbers';
import type { FunctionComponent, ReactElement } from 'react';

import { getPaginatedElementsCurrentSlice } from './helpers/PaginatedElements/functions/paginatedElements';

interface PaginatedElementsProps {
  paginatedElements: ReactElement[];
  elementsPerPage: Limit;
  currentPage: Count;
}

const PaginatedElements: FunctionComponent<PaginatedElementsProps> = ({ paginatedElements, elementsPerPage, currentPage }) => {
  const currentSlice = getPaginatedElementsCurrentSlice(currentPage, elementsPerPage, paginatedElements);

  return currentSlice;
};

export default PaginatedElements;

// Stryker restore all
/* v8 ignore stop */
