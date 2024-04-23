'use client';

import type { Quantity, Count } from '@rtm/shared-types/Numbers';
import type { WithClassname } from '@rtm/shared-types/Next';
import type { FunctionComponent } from 'react';

import { FIRST_PAGE_PARAM, PAGE_KEY } from '@/components/ui/helpers/PaginatedElements/constants';
import { PaginationContent, PaginationItem, Pagination } from '@/components/ui/Pagination';
import useIsLargeScreen from '@/components/hooks/useIsLargeScreen';
import { useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { cn } from '@/lib/tailwind';

import { doBuildPaginationItems, buildPreviousBtn, buildNextBtn } from './helpers/functions/paginationWidget';

export interface PaginationWidgetProps extends Partial<WithClassname> {
  pagesAmount: Quantity;
  currentPage: Count;
}

// {ToDo} https://github.com/Tirraa/dashboard_rtm/issues/126
const PaginationWidget: FunctionComponent<PaginationWidgetProps> = ({ pagesAmount, currentPage, className }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isLargeScreen = useIsLargeScreen();

  // eslint-disable-next-line no-magic-numbers
  const prevBtnPageId = useMemo(() => Math.max(FIRST_PAGE_PARAM, currentPage - 1), [currentPage]);
  // eslint-disable-next-line no-magic-numbers
  const nextBtnPageId = useMemo(() => Math.min(pagesAmount, currentPage + 1), [pagesAmount, currentPage]);

  const buildPaginationItems = useCallback(
    () => doBuildPaginationItems(currentPage, pagesAmount, pathname, searchParams, isLargeScreen, PAGE_KEY),
    [pagesAmount, currentPage, pathname, searchParams, isLargeScreen]
  );

  // eslint-disable-next-line no-magic-numbers
  if (pagesAmount <= 1) return null;

  const previousBtn = buildPreviousBtn(prevBtnPageId, pathname, searchParams, currentPage, PAGE_KEY);
  const nextBtn = buildNextBtn(nextBtnPageId, pathname, searchParams, currentPage, pagesAmount, PAGE_KEY);

  return (
    <Pagination className={cn('m-0 w-fit', className)}>
      <PaginationContent>
        <PaginationItem>{previousBtn}</PaginationItem>
        {buildPaginationItems()}
        <PaginationItem>{nextBtn}</PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationWidget;
