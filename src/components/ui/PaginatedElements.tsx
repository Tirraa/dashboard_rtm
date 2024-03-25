'use client';

import type { FunctionComponent, ReactElement } from 'react';
import type { WithClassname } from '@rtm/shared-types/Next';

import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/tailwind';

import type { PaginatedElementsBodyWrapperProps } from './hoc/PaginatedElementsBodyWrapper';

import PaginatedElementsBodyWrapper from './hoc/PaginatedElementsBodyWrapper';

export interface PaginatedElementsProps extends PaginatedElementsBodyWrapperProps, Partial<WithClassname> {
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

const PaginatedElements: FunctionComponent<PaginatedElementsProps> = ({
  paginatedElementsBodyWrapperProps,
  paginatedElements,
  elementsPerPage,
  pagesAmount,
  className
}) => {
  const searchParams = useSearchParams();

  const unsafePageFromUrl = searchParams.get('page');
  const pageFromUrl = initializeCurrentPage(Number(unsafePageFromUrl), pagesAmount);

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const startIndex = (pageFromUrl - 1) * elementsPerPage;
  const endIndex = startIndex + elementsPerPage;
  const currentElements = paginatedElements.slice(startIndex, endIndex);

  const currentElementsNode = (
    <PaginatedElementsBodyWrapper paginatedElementsBodyWrapperProps={paginatedElementsBodyWrapperProps}>
      {currentElements}
    </PaginatedElementsBodyWrapper>
  );

  return <div className={cn('flex flex-col', className)}>{currentElementsNode}</div>;
};

export default PaginatedElements;
