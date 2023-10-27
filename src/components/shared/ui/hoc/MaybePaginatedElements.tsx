import { FunctionComponent } from 'react';
import PaginatedElements, { PaginatedElementsProps } from '../PaginatedElements';
import PaginatedElementsBodyWrapper from '../PaginatedElementsBodyWrapper';

interface MaybePaginatedElementsProps extends PaginatedElementsProps {}

const paginationIsNotRequired = (pagesAmount: number) => pagesAmount <= 1;
export const computePagesAmount = (total: number, perChunk: number) => Math.ceil(total / perChunk);

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
