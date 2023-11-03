import type { PaginatedElementsProps } from '@/components/ui/PaginatedElements';
import PaginatedElements from '@/components/ui/PaginatedElements';
import PaginatedElementsBodyWrapper from '@/components/ui/hoc/PaginatedElementsBodyWrapper';
import type { FunctionComponent } from 'react';

interface MaybePaginatedElementsProps extends PaginatedElementsProps {}

const paginationIsNotRequired = (pagesAmount: number) => pagesAmount <= 1;
export const computePagesAmount = (total: number, perChunk: number) => Math.ceil(total / perChunk);

/**
 * @hoc
 */
export const MaybePaginatedElements: FunctionComponent<MaybePaginatedElementsProps> = ({
  paginatedElements,
  elementsPerPage,
  paginationButtonsPosition,
  paginationButtonsJustify,
  paginatedElementsBodyWrapperProps
}) => {
  const pagesAmount = computePagesAmount(paginatedElements.length, elementsPerPage);

  return paginationIsNotRequired(pagesAmount) ? (
    <PaginatedElementsBodyWrapper {...{ paginatedElementsBodyWrapperProps }}>{paginatedElements}</PaginatedElementsBodyWrapper>
  ) : (
    <PaginatedElements
      {...{
        paginatedElements,
        elementsPerPage,
        paginationButtonsPosition,
        paginationButtonsJustify,
        pagesAmount,
        paginatedElementsBodyWrapperProps
      }}
    />
  );
};

export default MaybePaginatedElements;
