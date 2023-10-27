import { FunctionComponent } from 'react';
import PaginatedElements, { PaginatedElementsProps } from '../PaginatedElements';

interface MaybePaginatedElementsProps extends PaginatedElementsProps {}

const paginationIsNotRequired = (pagesAmount: number) => pagesAmount <= 1;
export const computePagesAmount = (total: number, perChunk: number) => Math.ceil(total / perChunk);

export const MaybePaginatedElements: FunctionComponent<MaybePaginatedElementsProps> = ({
  paginatedElements,
  elementsPerPage,
  paginationButtonsPosition,
  paginationButtonsJustify
}) => {
  const pagesAmount = computePagesAmount(paginatedElements.length, elementsPerPage);
  if (paginationIsNotRequired(pagesAmount)) return paginatedElements;

  return <PaginatedElements {...{ paginatedElements, elementsPerPage, paginationButtonsPosition, paginationButtonsJustify, pagesAmount }} />;
};

export default MaybePaginatedElements;
