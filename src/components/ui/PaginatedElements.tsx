'use client';

import { i18ns } from '@/config/i18n';
import { useScopedI18n } from '@/i18n/client';
import { createURLSearchParams } from '@/lib/html';
import { capitalize } from '@/lib/str';
import { cn } from '@/lib/tailwind';
import type { FlexJustify } from '@/types/HTML';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import type { FunctionComponent, ReactNode } from 'react';
import { computePagesAmount } from './hoc/MaybePaginatedElements';
import type { PaginatedElementsBodyWrapperProps } from './hoc/PaginatedElementsBodyWrapper';
import PaginatedElementsBodyWrapper from './hoc/PaginatedElementsBodyWrapper';

const ReactPaginate = dynamic(() => import('react-paginate'), { ssr: false });

export interface PaginatedElementsProps extends PaginatedElementsBodyWrapperProps {
  paginatedElements: ReactNode[];
  elementsPerPage: number;
  paginationButtonsPosition?: 'top' | 'bottom';
  paginationButtonsJustify?: FlexJustify;
  pagesAmount?: number;
  pagesRange?: number;
}

function initializeCurrentPage(pageFromUrl: number, maxPage: number) {
  if (isNaN(pageFromUrl)) return 1;
  if (pageFromUrl < 1) return 1;
  if (pageFromUrl > maxPage) return maxPage;
  return pageFromUrl;
}

export const PaginatedElements: FunctionComponent<PaginatedElementsProps> = ({
  paginatedElements,
  elementsPerPage,
  paginationButtonsPosition: position,
  paginationButtonsJustify: justify,
  pagesAmount: forcedPagesAmount,
  pagesRange: pagesRangeValue,
  paginatedElementsBodyWrapperProps
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const scopedT = useScopedI18n(i18ns.vocab);
  const pagesRange = pagesRangeValue ?? 3;

  const pagesAmount = forcedPagesAmount ?? computePagesAmount(paginatedElements.length, elementsPerPage);
  const unsafePageFromUrl = searchParams.get('page');
  const pageFromUrl = initializeCurrentPage(Number(unsafePageFromUrl), pagesAmount);

  const startIndex = (pageFromUrl - 1) * elementsPerPage;
  const endIndex = startIndex + elementsPerPage;
  const currentElements = paginatedElements.slice(startIndex, endIndex);

  const ypos = position ?? 'bottom';
  const xpos = justify ?? 'normal';
  const posClassName = ypos === 'bottom' ? 'mt-4' : 'mb-4';
  const chevronsClassName = 'scale-75';

  const nextAndPrevIconsClassList = 'w-10 h-10 flex items-centers justify-center bg-accent rounded-md';

  function handlePageClick(event: { selected: number }) {
    const page = event.selected + 1;
    const q = createURLSearchParams({ page });
    router.push(q, { scroll: false });
  }

  const flexJustifyClass = `justify-${xpos}`;
  const paginationNode = (
    <div className={cn('min-h-[40px]', posClassName)}>
      <ReactPaginate
        forcePage={pageFromUrl - 1}
        className={cn(`flex gap-2`, flexJustifyClass)}
        breakLabel="..."
        previousAriaLabel={scopedT('prev')}
        nextAriaLabel={scopedT('next')}
        previousLabel={
          <span className={nextAndPrevIconsClassList}>
            <ChevronLeftIcon className={chevronsClassName} />
          </span>
        }
        nextLabel={
          <span className={nextAndPrevIconsClassList}>
            <ChevronRightIcon className={chevronsClassName} />
          </span>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={pagesRange < pagesAmount ? pagesRange : pagesAmount}
        pageCount={pagesAmount}
        containerClassName="flex items-center justify-center mt-8 mb-4 select-none"
        previousLinkClassName={cn('flex items-center justify-center rounded-md', { 'opacity-50': pageFromUrl <= 1 })}
        nextLinkClassName={cn('flex items-center justify-center rounded-md', { 'opacity-50': pageFromUrl >= pagesAmount })}
        pageLinkClassName="flex items-center justify-center hover:bg-accent p-2 rounded-md"
        activeClassName="bg-accent rounded-md"
        ariaLabelBuilder={(pageNumber) => `${capitalize(scopedT('page'))} ${pageNumber}`}
      />
    </div>
  );

  const currentElementsNode = (
    <PaginatedElementsBodyWrapper paginatedElementsBodyWrapperProps={paginatedElementsBodyWrapperProps}>
      {currentElements}
    </PaginatedElementsBodyWrapper>
  );

  return ypos === 'bottom' ? (
    <>
      {currentElementsNode}
      {paginationNode}
    </>
  ) : (
    <>
      {paginationNode}
      {currentElementsNode}
    </>
  );
};

export default PaginatedElements;
