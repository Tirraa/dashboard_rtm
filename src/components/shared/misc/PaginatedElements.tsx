'use client';

import { FlexJustify } from '@/types/HTML';
import { Pagination } from '@nextui-org/pagination';
import { FunctionComponent, ReactNode, useState } from 'react';

interface PaginatedElementsProps {
  paginatedElements: ReactNode[];
  elementsPerPage: number;
  paginationButtonsPosition?: 'top' | 'bottom';
  paginationButtonsJustify?: FlexJustify;
}

// {ToDo} Some sr-only elements/aria-labels for accessibility concerns would be welcome!
export const PaginatedElements: FunctionComponent<PaginatedElementsProps> = ({
  paginatedElements,
  elementsPerPage,
  paginationButtonsPosition: position,
  paginationButtonsJustify: justify
}) => {
  const ypos = position ?? 'bottom';
  const xpos = justify ?? 'start';
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pagesAmount = Math.ceil(paginatedElements.length / elementsPerPage);

  if (pagesAmount <= 1) return paginatedElements;

  const startIndex = (currentPage - 1) * elementsPerPage;
  const endIndex = startIndex + elementsPerPage;
  const currentElements = paginatedElements.slice(startIndex, endIndex);

  const handlePageClick = (page: number) => setCurrentPage(page);

  if (ypos === 'bottom') {
    return (
      <>
        <div>{currentElements}</div>
        <Pagination showControls total={pagesAmount} initialPage={1} onChange={handlePageClick} className={`flex justify-${xpos} mt-4`} />
      </>
    );
  }

  return (
    <>
      <Pagination showControls total={pagesAmount} initialPage={1} onChange={handlePageClick} className={`flex justify-${xpos} mb-4`} />
      <div>{currentElements}</div>
    </>
  );
};

export default PaginatedElements;
