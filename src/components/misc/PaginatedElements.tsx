'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { FunctionComponent, ReactNode, useState } from 'react';
import ReactPaginate from 'react-paginate';

interface PaginatedElementsProps {
  paginatedElements: ReactNode[];
  elementsPerPage: number;
}

const classList = { className: 'w-10 h-10 flex items-centers justify-center bg-gray-500 rounded-md' };

const PaginatedElements: FunctionComponent<PaginatedElementsProps> = ({ paginatedElements, elementsPerPage }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pagesAmount = Math.ceil(paginatedElements.length / elementsPerPage);

  if (pagesAmount <= 1) return <>{paginatedElements}</>;

  const startIndex = (currentPage - 1) * elementsPerPage;
  const endIndex = startIndex + elementsPerPage;
  const currentElements = paginatedElements.slice(startIndex, endIndex);

  function handlePageClick(event: { selected: number }) {
    const targetPage = event.selected + 1;
    if (currentPage !== targetPage) setCurrentPage(targetPage);
  }

  return (
    <>
      {currentElements}
      <ReactPaginate
        breakLabel="..."
        previousLabel={
          <span {...classList}>
            <ChevronLeftIcon />
          </span>
        }
        nextLabel={
          <span {...classList}>
            <ChevronRightIcon />
          </span>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pagesAmount}
        renderOnZeroPageCount={null}
        containerClassName="flex items-center justify-center mt-8 mb-4 select-none"
        previousLinkClassName={`flex items-center justify-center rounded-md ${currentPage <= 1 ? 'opacity-50 cursor-default' : ''}`}
        nextLinkClassName={`flex items-center justify-center rounded-md ${currentPage >= pagesAmount ? 'opacity-50 cursor-default' : ''}`}
        pageLinkClassName={'flex items-center justify-center border border-solid border-blue-500 hover:bg-blue-500 p-2 rounded-md'}
        activeClassName="bg-gray-600 rounded-md text-white"
      />
    </>
  );
};

export default PaginatedElements;
