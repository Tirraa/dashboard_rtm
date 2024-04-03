import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { Quantity, Count } from '@rtm/shared-types/Numbers';
import type { AppPath } from '@rtm/shared-types/Next';
import type { ReactElement } from 'react';

import { PaginationEllipsis, PaginationPrevious, PaginationItem, PaginationLink, PaginationNext } from '@/components/ui/Pagination';
import { FIRST_PAGE_PARAM, PAGE_KEY } from '@/components/ui/helpers/PaginatedElements/constants';
import { preserveKeyboardNavigation, createURLSearchParams } from '@rtm/shared-lib/html';
import { DropdownMenuItem } from '@/components/ui/DropdownMenu';
import { cn } from '@/lib/tailwind';
import Link from 'next/link';

const getItemHref = (i: Count, pathname: AppPath, searchParams: URLSearchParams) =>
  pathname + createURLSearchParams({ [PAGE_KEY]: i === FIRST_PAGE_PARAM ? null : i }, searchParams);

const buildDropdownMenu = (dropdownItems: ReactElement[], pageNumberIndicator?: Count, isBottomWidget?: boolean) =>
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  dropdownItems.length === 0 ? null : (
    <PaginationEllipsis pageNumberIndicator={pageNumberIndicator} isBottomWidget={isBottomWidget} dropdownItems={dropdownItems} key={'ellipsis'} />
  );

export function buildDropdown(pagesAmount: Quantity, pageFromUrl: Count, pathname: AppPath, searchParams: URLSearchParams, isBottomWidget?: boolean) {
  const dropdownItems: ReactElement[] = [];

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
}

export function doBuildPaginationsItems(
  currentPage: Count,
  pagesAmount: Quantity,
  pathname: AppPath,
  searchParams: URLSearchParams,
  isLargeScreen: boolean
) {
  const activePageIsLastPage = currentPage === pagesAmount;

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

  function buildForDesktop() {
    const dropdownItems = [];
    let leftItem: MaybeNull<ReactElement> = null;
    let rightItem: MaybeNull<ReactElement> = null;

    for (let i = FIRST_PAGE_PARAM; i <= pagesAmount; i++) {
      const isActive = currentPage === i;

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
  }

  const buildForMobile = () => buildDropdown(pagesAmount, currentPage, pathname, searchParams);

  if (isLargeScreen) return buildForDesktop();
  return buildForMobile();
}

export const buildPreviousBtn = (prevBtnPageId: Count, pathname: AppPath, searchParams: URLSearchParams, currentPage: Count) => (
  <PaginationPrevious
    href={pathname + createURLSearchParams({ [PAGE_KEY]: prevBtnPageId === FIRST_PAGE_PARAM ? null : prevBtnPageId }, searchParams)}
    className={cn('max-lg:h-10 max-lg:w-10 max-lg:p-0', { 'pointer-events-none opacity-50': currentPage <= FIRST_PAGE_PARAM })}
  />
);

export const buildNextBtn = (nextBtnPageId: Count, pathname: AppPath, searchParams: URLSearchParams, currentPage: Count, pagesAmount: Quantity) => (
  <PaginationNext
    className={cn('max-lg:h-10 max-lg:w-10 max-lg:p-0', { 'pointer-events-none opacity-50': currentPage >= pagesAmount })}
    href={pathname + createURLSearchParams({ [PAGE_KEY]: nextBtnPageId }, searchParams)}
  />
);
