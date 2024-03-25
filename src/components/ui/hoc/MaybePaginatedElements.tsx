'use client';

import type { PaginatedElementsProps } from '@/components/ui/PaginatedElements';
import type { FunctionComponent } from 'react';

import PaginatedElementsBodyWrapper from '@/components/ui/hoc/PaginatedElementsBodyWrapper';
import PaginatedElements from '@/components/ui/PaginatedElements';

interface MaybePaginatedElementsProps extends PaginatedElementsProps {}

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const paginationIsNotRequired = (pagesAmount: number) => pagesAmount <= 1;

/**
 * @hoc
 * @extends {PaginatedElements} - WithControls?
 */
const MaybePaginatedElements: FunctionComponent<MaybePaginatedElementsProps> = ({
  paginatedElementsBodyWrapperProps,
  paginatedElements,
  elementsPerPage,
  pagesAmount,
  className
}) => {
  return paginationIsNotRequired(pagesAmount) ? (
    <PaginatedElementsBodyWrapper paginatedElementsBodyWrapperProps={paginatedElementsBodyWrapperProps}>
      {paginatedElements}
    </PaginatedElementsBodyWrapper>
  ) : (
    <PaginatedElements
      paginatedElementsBodyWrapperProps={paginatedElementsBodyWrapperProps}
      paginatedElements={paginatedElements}
      elementsPerPage={elementsPerPage}
      pagesAmount={pagesAmount}
      className={className}
    />
  );
};

export default MaybePaginatedElements;
