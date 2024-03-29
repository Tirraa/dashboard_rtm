'use client';

import type { WithClassname } from '@rtm/shared-types/Next';
import type { Quantity } from '@rtm/shared-types/Numbers';
import type { FunctionComponent } from 'react';

import { PaginationPrevious, PaginationContent, PaginationItem, PaginationLink, PaginationNext, Pagination } from '@/components/ui/Pagination';
import { getSanitizedCurrentPage } from '@/components/ui/helpers/PaginatedElements/getSanitizedCurrentPage';
import { FIRST_PAGE_IDX, PAGE_KEY } from '@/components/ui/helpers/PaginatedElements/constants';
import { useSearchParams, usePathname } from 'next/navigation';
import { createURLSearchParams } from '@rtm/shared-lib/html';
import { useCallback } from 'react';
import { cn } from '@/lib/tailwind';

export interface PaginationWidgetProps extends Partial<WithClassname> {
  pagesAmount: Quantity;
}

const PaginationWidget: FunctionComponent<PaginationWidgetProps> = ({ pagesAmount, className }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const pageFromUrl = getSanitizedCurrentPage(searchParams, pagesAmount);

  const generatePaginationsItems = useCallback(() => {
    const items = [];

    for (let i = 1; i <= pagesAmount; i++) {
      const isActive = pageFromUrl === i;
      items.push(
        <PaginationItem key={`page-${i}`}>
          <PaginationLink
            className={cn('border-none font-bold', {
              'pointer-events-none bg-primary text-white hover:bg-primary hover:text-white': isActive
            })}
            href={pathname + createURLSearchParams({ [PAGE_KEY]: i === FIRST_PAGE_IDX ? null : i }, searchParams)}
            isActive={isActive}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  }, [pagesAmount, pageFromUrl, pathname, searchParams]);

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (pagesAmount <= 1) return null;

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const prevBtnPageId = Math.max(1, pageFromUrl - 1);
  const previousBtn = (
    <PaginationPrevious
      href={pathname + createURLSearchParams({ [PAGE_KEY]: prevBtnPageId === FIRST_PAGE_IDX ? null : prevBtnPageId }, searchParams)}
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      className={cn({ 'pointer-events-none opacity-50': pageFromUrl <= 1 })}
    />
  );

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const nextBtnPageId = Math.min(pagesAmount, pageFromUrl + 1);
  const nextBtn = (
    <PaginationNext
      href={pathname + createURLSearchParams({ [PAGE_KEY]: nextBtnPageId }, searchParams)}
      className={cn({ 'pointer-events-none opacity-50': pageFromUrl >= pagesAmount })}
    />
  );

  return (
    <Pagination className={cn('m-0 w-fit', className)}>
      <PaginationContent>
        <PaginationItem>{previousBtn}</PaginationItem>
        {generatePaginationsItems()}
        <PaginationItem>{nextBtn}</PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationWidget;
