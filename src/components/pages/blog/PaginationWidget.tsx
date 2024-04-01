'use client';

import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { WithClassname, AppPath } from '@rtm/shared-types/Next';
import type { Quantity, Count } from '@rtm/shared-types/Numbers';
import type { FunctionComponent, ReactElement } from 'react';

import {
  PaginationPrevious,
  PaginationEllipsis,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  Pagination
} from '@/components/ui/Pagination';
import { FIRST_PAGE_PARAM, PAGE_KEY } from '@/components/ui/helpers/PaginatedElements/constants';
import { getSanitizedCurrentPage } from '@/components/ui/helpers/PaginatedElements/functions';
import { preserveKeyboardNavigation, createURLSearchParams } from '@rtm/shared-lib/html';
import useIsLargeScreen from '@/components/hooks/useIsLargeScreen';
import { DropdownMenuItem } from '@/components/ui/DropdownMenu';
import { useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { cn } from '@/lib/tailwind';
import Link from 'next/link';

export interface PaginationWidgetProps extends Partial<WithClassname> {
  pagesAmount: Quantity;
}

const getItemHref = (i: Count, pathname: AppPath, searchParams: URLSearchParams) =>
  pathname + createURLSearchParams({ [PAGE_KEY]: i === FIRST_PAGE_PARAM ? null : i }, searchParams);

const buildDropdownMenu = (dropdownItems: ReactElement[], pageNumberIndicator?: Count, isBottomWidget?: boolean) =>
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  dropdownItems.length === 0 ? null : (
    <PaginationEllipsis pageNumberIndicator={pageNumberIndicator} isBottomWidget={isBottomWidget} dropdownItems={dropdownItems} key={'ellipsis'} />
  );

export const buildDropdownForMobileAndBottom = (
  pagesAmount: Quantity,
  pageFromUrl: Count,
  pathname: AppPath,
  searchParams: URLSearchParams,
  isBottomWidget?: boolean
) => {
  const dropdownItems = [];

  for (let i = FIRST_PAGE_PARAM; i <= pagesAmount; i++) {
    const isActive = pageFromUrl === i;
    const href = getItemHref(i, pathname, searchParams);

    const item = (
      <DropdownMenuItem onClick={(event) => preserveKeyboardNavigation(event.target)} className="h-10 p-0" key={`page-${i}`}>
        <Link
          className={cn('flex h-full w-full items-center justify-center border-none px-2 text-center font-bold', {
            'rounded-md bg-primary': isActive
          })}
          title={String(i)}
          href={href}
        >
          {i}
        </Link>
      </DropdownMenuItem>
    );

    dropdownItems.push(item);
  }

  return buildDropdownMenu(dropdownItems, pageFromUrl, isBottomWidget);
};

const PaginationWidget: FunctionComponent<PaginationWidgetProps> = ({ pagesAmount, className }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isLargeScreen = useIsLargeScreen();

  const pageFromUrl = getSanitizedCurrentPage(searchParams, pagesAmount, PAGE_KEY);

  const buildPaginationsItems = useCallback(() => {
    const activePageIsLastPage = pageFromUrl === pagesAmount;

    const buildPaginationItem = (i: Count, isActive: boolean) => (
      <PaginationItem key={`page-${i}`}>
        <PaginationLink
          className={cn('border-none font-bold transition-opacity', {
            'pointer-events-none underline opacity-50': isActive
          })}
          href={getItemHref(i, pathname, searchParams)}
          aria-current={isActive ? 'page' : undefined}
          isActive={isActive}
        >
          {i}
        </PaginationLink>
      </PaginationItem>
    );

    const buildForDesktop = () => {
      const dropdownItems = [];
      let leftItem: MaybeNull<ReactElement> = null;
      let rightItem: MaybeNull<ReactElement> = null;

      for (let i = FIRST_PAGE_PARAM; i <= pagesAmount; i++) {
        const isActive = pageFromUrl === i;

        if (i === pagesAmount) {
          rightItem = buildPaginationItem(i, isActive);
          if (!leftItem) leftItem = buildPaginationItem(FIRST_PAGE_PARAM, false);
          continue;
        }

        if (isActive) {
          leftItem = buildPaginationItem(i, isActive);
          continue;
        }

        if (i === FIRST_PAGE_PARAM && activePageIsLastPage) continue;

        const href = getItemHref(i, pathname, searchParams);
        const item = (
          <DropdownMenuItem onClick={(event) => preserveKeyboardNavigation(event.target)} key={`page-${i}`} className="p-0">
            <Link className="block w-full border-none px-2 py-1.5 text-center font-bold" title={String(i)} href={href}>
              {i}
            </Link>
          </DropdownMenuItem>
        );

        dropdownItems.push(item);
      }

      return [leftItem, buildDropdownMenu(dropdownItems), rightItem];
    };

    if (isLargeScreen) return buildForDesktop();
    return buildDropdownForMobileAndBottom(pagesAmount, pageFromUrl, pathname, searchParams);
  }, [pagesAmount, pageFromUrl, pathname, searchParams, isLargeScreen]);

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (pagesAmount <= 1) return null;

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const prevBtnPageId = Math.max(FIRST_PAGE_PARAM, pageFromUrl - 1);
  const previousBtn = (
    <PaginationPrevious
      href={pathname + createURLSearchParams({ [PAGE_KEY]: prevBtnPageId === FIRST_PAGE_PARAM ? null : prevBtnPageId }, searchParams)}
      className={cn('max-lg:h-10 max-lg:w-10 max-lg:p-0', { 'pointer-events-none opacity-50': pageFromUrl <= FIRST_PAGE_PARAM })}
    />
  );

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const nextBtnPageId = Math.min(pagesAmount, pageFromUrl + 1);
  const nextBtn = (
    <PaginationNext
      className={cn('max-lg:h-10 max-lg:w-10 max-lg:p-0', { 'pointer-events-none opacity-50': pageFromUrl >= pagesAmount })}
      href={pathname + createURLSearchParams({ [PAGE_KEY]: nextBtnPageId }, searchParams)}
    />
  );

  return (
    <Pagination className={cn('m-0 w-fit', className)}>
      <PaginationContent>
        <PaginationItem>{previousBtn}</PaginationItem>
        {buildPaginationsItems()}
        <PaginationItem>{nextBtn}</PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationWidget;
