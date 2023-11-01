'use client';

import { i18ns } from '@/config/i18n';
import { useScopedI18n } from '@/i18n/client';
import { cn } from '@/lib/tailwind';
import type { FlexJustify } from '@/types/HTML';
import { Pagination } from '@nextui-org/pagination';
import { useRouter, useSearchParams } from 'next/navigation';
import type { FunctionComponent, ReactNode } from 'react';
import { computePagesAmount } from './hoc/MaybePaginatedElements';
import type { PaginatedElementsBodyWrapperProps } from './hoc/PaginatedElementsBodyWrapper';
import PaginatedElementsBodyWrapper from './hoc/PaginatedElementsBodyWrapper';

export interface PaginatedElementsProps extends PaginatedElementsBodyWrapperProps {
  paginatedElements: ReactNode[];
  elementsPerPage: number;
  paginationButtonsPosition?: 'top' | 'bottom';
  paginationButtonsJustify?: FlexJustify;
  pagesAmount?: number;
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
  paginatedElementsBodyWrapperProps
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const scopedT = useScopedI18n(i18ns.vocab);

  const pagesAmount = forcedPagesAmount ?? computePagesAmount(paginatedElements.length, elementsPerPage);
  const unsafePageFromUrl = searchParams.get('page');
  const pageFromUrl = initializeCurrentPage(Number(unsafePageFromUrl), pagesAmount);

  const startIndex = (pageFromUrl - 1) * elementsPerPage;
  const endIndex = startIndex + elementsPerPage;
  const currentElements = paginatedElements.slice(startIndex, endIndex);

  const ypos = position ?? 'bottom';
  const xpos = justify ?? 'normal';
  const posClassName = ypos === 'bottom' ? 'mt-4' : 'mb-4';

  const [handlePageClick, setAriaLabels] = [
    (n: number) => router.push(`?page=${n}`, { scroll: false }),
    (s?: string) => (s === 'next' || s === 'prev' ? scopedT(s) : s ?? '')
  ];

  const paginationNode = (
    <Pagination
      onChange={handlePageClick}
      getItemAriaLabel={setAriaLabels}
      total={pagesAmount}
      page={pageFromUrl}
      className={cn(`flex justify-${xpos}`, posClassName)}
      showControls
      disableAnimation
    />
  );

  const currentElementsNode = (
    <PaginatedElementsBodyWrapper {...{ paginatedElementsBodyWrapperProps }}>{currentElements}</PaginatedElementsBodyWrapper>
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
