'use client';

import { useScopedI18n } from '@/i18n/client';
import { cn } from '@/lib/tailwind';
import { FlexJustify } from '@/types/HTML';
import { Pagination } from '@nextui-org/pagination';
import { useRouter, useSearchParams } from 'next/navigation';
import { FunctionComponent, ReactNode } from 'react';

interface PaginatedElementsProps {
  paginatedElements: ReactNode[];
  elementsPerPage: number;
  paginationButtonsPosition?: 'top' | 'bottom';
  paginationButtonsJustify?: FlexJustify;
}

function initializeCurrentPage(pageFromUrl: number, maxPage: number) {
  if (isNaN(pageFromUrl)) return 1;
  if (pageFromUrl < 1) return 1;
  if (pageFromUrl > maxPage) return maxPage;
  return pageFromUrl;
}

const paginationIsNotRequired = (pagesAmount: number) => pagesAmount <= 1;

export const PaginatedElements: FunctionComponent<PaginatedElementsProps> = ({
  paginatedElements,
  elementsPerPage,
  paginationButtonsPosition: position,
  paginationButtonsJustify: justify
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const scopedT = useScopedI18n('vocab');

  const pagesAmount = Math.ceil(paginatedElements.length / elementsPerPage);
  if (paginationIsNotRequired(pagesAmount)) return paginatedElements;

  const unsafePageFromUrl = searchParams.get('page');
  const pageFromUrl = initializeCurrentPage(Number(unsafePageFromUrl), pagesAmount);

  const startIndex = (pageFromUrl - 1) * elementsPerPage;
  const endIndex = startIndex + elementsPerPage;
  const currentElements = paginatedElements.slice(startIndex, endIndex);
  const ypos = position ?? 'bottom';
  const xpos = justify ?? 'start';
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

  return ypos === 'bottom' ? (
    <>
      {currentElements}
      {paginationNode}
    </>
  ) : (
    <>
      {paginationNode}
      {currentElements}
    </>
  );
};

export default PaginatedElements;
