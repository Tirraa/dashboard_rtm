'use client';

import type { WithClassname } from '@rtm/shared-types/Next';
import type { FunctionComponent } from 'react';

import { PaginationPrevious, PaginationContent, PaginationItem, PaginationLink, PaginationNext, Pagination } from '@/components/ui/Pagination';
import { useSearchParams, usePathname } from 'next/navigation';
import { createURLSearchParams } from '@rtm/shared-lib/html';
import { useCallback } from 'react';
import { cn } from '@/lib/tailwind';

export interface PaginationWidgetProps extends Partial<WithClassname> {
  pagesAmount: number;
}

export const PAGE_KEY = 'page';

function initializeCurrentPage(pageFromUrl: number, maxPage: number) {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (isNaN(pageFromUrl)) return 1;
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (pageFromUrl < 1) return 1;
  if (pageFromUrl > maxPage) return maxPage;
  return pageFromUrl;
}

const PaginationWidget: FunctionComponent<PaginationWidgetProps> = ({ pagesAmount, className }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const unsafePageFromUrl = searchParams.get(PAGE_KEY);
  const pageFromUrl = initializeCurrentPage(Number(unsafePageFromUrl), pagesAmount);

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
            href={pathname + createURLSearchParams({ [PAGE_KEY]: i }, searchParams)}
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

  const previousBtn = (
    <PaginationPrevious
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      href={pathname + createURLSearchParams({ [PAGE_KEY]: Math.max(1, pageFromUrl - 1) }, searchParams)}
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      className={cn({ 'pointer-events-none opacity-50': pageFromUrl <= 1 })}
    />
  );

  const nextBtn = (
    <PaginationNext
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      href={pathname + createURLSearchParams({ [PAGE_KEY]: Math.min(pagesAmount, pageFromUrl + 1) }, searchParams)}
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
