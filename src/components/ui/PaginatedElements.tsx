'use client';

import type { FunctionComponent, ReactElement } from 'react';
import type { WithClassname } from '@rtm/shared-types/Next';
import type { FlexJustify } from '@rtm/shared-types/HTML';

import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/20/solid';
import { createURLSearchParams, getDirection } from '@rtm/shared-lib/html';
import { useSearchParams, useRouter } from 'next/navigation';
import { useScopedI18n } from '@/i18n/client';
import { useEffect, useState } from 'react';
import { i18ns } from '##/config/i18n';
import { capitalize } from '@/lib/str';
import { cn } from '@/lib/tailwind';
import dynamic from 'next/dynamic';

import type { PaginatedElementsBodyWrapperProps } from './hoc/PaginatedElementsBodyWrapper';

import PaginatedElementsBodyWrapper from './hoc/PaginatedElementsBodyWrapper';
import { computePagesAmount } from './hoc/MaybePaginatedElements';

const ReactPaginate = dynamic(() => import('react-paginate'), { ssr: false });

export interface PaginatedElementsProps extends PaginatedElementsBodyWrapperProps, Partial<WithClassname> {
  paginationButtonsPosition?: 'bottom' | 'top';
  paginationButtonsJustify?: FlexJustify;
  paginatedElements: ReactElement[];
  elementsPerPage: number;
  pagesAmount?: number;
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
  paginationButtonsPosition: position,
  paginationButtonsJustify: justify,
  paginatedElementsBodyWrapperProps,
  pagesAmount: forcedPagesAmount,
  pagesRange: pagesRangeValue,
  paginatedElements,
  elementsPerPage,
  className
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const scopedT = useScopedI18n(i18ns.vocab);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => setIsMounted(true), []);
  const dir = isMounted ? getDirection() : 'ltr';

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const pagesRange = pagesRangeValue ?? 3;

  const pagesAmount = forcedPagesAmount ?? computePagesAmount(paginatedElements.length, elementsPerPage);
  const unsafePageFromUrl = searchParams.get('page');
  const pageFromUrl = initializeCurrentPage(Number(unsafePageFromUrl), pagesAmount);

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const startIndex = (pageFromUrl - 1) * elementsPerPage;
  const endIndex = startIndex + elementsPerPage;
  const currentElements = paginatedElements.slice(startIndex, endIndex);

  const ypos = position ?? 'bottom';
  const xpos = justify ?? 'normal';
  const posClassName = ypos === 'bottom' ? 'mt-4' : 'mb-4';
  const chevronsClassName = 'scale-75';

  const nextAndPrevIconsClassList = 'w-10 h-10 lg:w-8 lg:h-7 flex items-centers justify-center bg-accent rounded-md';

  function handlePageClick(event: { selected: number }) {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const page = event.selected + 1;
    const q = createURLSearchParams({ page }, searchParams);
    router.push(q, { scroll: false });
  }

  const flexJustifyClass = `justify-${xpos}`;
  const paginationNode = (
    <div className={cn('min-h-[40px] lg:min-h-[32px]', posClassName)}>
      <ReactPaginate
        previousLabel={
          <span className={nextAndPrevIconsClassList}>
            {dir === 'ltr' ? <ChevronLeftIcon className={chevronsClassName} /> : <ChevronRightIcon className={chevronsClassName} />}
          </span>
        }
        nextLabel={
          <span className={nextAndPrevIconsClassList}>
            {dir === 'ltr' ? <ChevronRightIcon className={chevronsClassName} /> : <ChevronLeftIcon className={chevronsClassName} />}
          </span>
        }
        nextLinkClassName={cn('flex items-center justify-center rounded-md', { 'pointer-events-none opacity-50': pageFromUrl >= pagesAmount })}
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        previousLinkClassName={cn('flex items-center justify-center rounded-md', { 'pointer-events-none opacity-50': pageFromUrl <= 1 })}
        pageLinkClassName="flex items-center justify-center hover:bg-accent p-2 px-4 lg:p-1 lg:px-3 rounded-md"
        ariaLabelBuilder={(pageNumber) => `${capitalize(scopedT('page'))} ${pageNumber}`}
        containerClassName="flex items-center justify-center mt-8 mb-4 select-none"
        pageRangeDisplayed={pagesRange < pagesAmount ? pagesRange : pagesAmount}
        className={cn('flex items-center gap-2', flexJustifyClass)}
        activeClassName="pointer-events-none bg-accent rounded-md"
        previousAriaLabel={scopedT('prev')}
        nextAriaLabel={scopedT('next')}
        onPageChange={handlePageClick}
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        forcePage={pageFromUrl - 1}
        pageCount={pagesAmount}
        breakLabel="..."
      />
    </div>
  );

  const currentElementsNode = (
    <PaginatedElementsBodyWrapper paginatedElementsBodyWrapperProps={paginatedElementsBodyWrapperProps}>
      {currentElements}
    </PaginatedElementsBodyWrapper>
  );

  return ypos === 'bottom' ? (
    <div className={cn('flex flex-col', className)}>
      {currentElementsNode}
      {paginationNode}
    </div>
  ) : (
    <div className={cn('flex flex-col', className)}>
      {paginationNode}
      {currentElementsNode}
    </div>
  );
};

export default PaginatedElements;
