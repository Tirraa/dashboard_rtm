import type { PaginatedElementsProps } from '@/components/ui/PaginatedElements';
import type { FunctionComponent } from 'react';

import PaginatedElementsBodyWrapper from '@/components/ui/hoc/PaginatedElementsBodyWrapper';
import PaginatedElements from '@/components/ui/PaginatedElements';

interface MaybePaginatedElementsProps extends PaginatedElementsProps {}

const paginationIsNotRequired = (pagesAmount: number) => pagesAmount <= 1;
export const computePagesAmount = (total: number, perChunk: number) => Math.ceil(total / perChunk);

/**
 * @hoc
 * @extends {PaginatedElements} - WithControls?
 */
const MaybePaginatedElements: FunctionComponent<MaybePaginatedElementsProps> = ({
  paginatedElementsBodyWrapperProps,
  paginationButtonsPosition,
  paginationButtonsJustify,
  paginatedElements,
  elementsPerPage
}) => {
  const pagesAmount = computePagesAmount(paginatedElements.length, elementsPerPage);

  return paginationIsNotRequired(pagesAmount) ? (
    <PaginatedElementsBodyWrapper paginatedElementsBodyWrapperProps={paginatedElementsBodyWrapperProps}>
      {paginatedElements}
    </PaginatedElementsBodyWrapper>
  ) : (
    <PaginatedElements
      paginatedElementsBodyWrapperProps={paginatedElementsBodyWrapperProps}
      paginationButtonsPosition={paginationButtonsPosition}
      paginationButtonsJustify={paginationButtonsJustify}
      paginatedElements={paginatedElements}
      elementsPerPage={elementsPerPage}
      pagesAmount={pagesAmount}
    />
  );
};

export default MaybePaginatedElements;
