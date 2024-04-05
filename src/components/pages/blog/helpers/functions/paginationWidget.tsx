import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { Quantity, Count } from '@rtm/shared-types/Numbers';
import type { AppPath } from '@rtm/shared-types/Next';
import type { ReactElement } from 'react';

import { PaginationEllipsis, PaginationPrevious, PaginationItem, PaginationLink, PaginationNext } from '@/components/ui/Pagination';
import { dispatchClickOnLinkOrButtonFirstChild, createURLSearchParams } from '@rtm/shared-lib/html';
import { FIRST_PAGE_PARAM } from '@/components/ui/helpers/PaginatedElements/constants';
import { DropdownMenuItem } from '@/components/ui/DropdownMenu';
import { cn } from '@/lib/tailwind';
import Link from 'next/link';

const getItemHref = (i: Count, pathname: AppPath, searchParams: URLSearchParams, pageKey: string) =>
  pathname + createURLSearchParams({ [pageKey]: i === FIRST_PAGE_PARAM ? null : i }, searchParams);

const buildDropdownMenu = (dropdownItems: ReactElement[], pageNumberIndicator?: Count, isBottomWidget?: boolean) =>
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  dropdownItems.length === 0 ? null : (
    <PaginationEllipsis pageNumberIndicator={pageNumberIndicator} isBottomWidget={isBottomWidget} dropdownItems={dropdownItems} key={'ellipsis'} />
  );

const buildPaginationItem = (i: Count, isActive: boolean, pathname: AppPath, searchParams: URLSearchParams, pageKey: string) => (
  <PaginationItem key={`page-${i}`}>
    <PaginationLink
      className={cn('border-none font-bold transition-opacity', {
        'pointer-events-none underline opacity-50': isActive
      })}
      href={getItemHref(i, pathname, searchParams, pageKey)}
      aria-current={isActive ? 'page' : undefined}
      isActive={isActive}
    >
      {i}
    </PaginationLink>
  </PaginationItem>
);

function buildPaginationItemsForMobile(
  pagesAmount: Quantity,
  currentPage: Count,
  pathname: AppPath,
  searchParams: URLSearchParams,
  pageKey: string
): MaybeNull<ReactElement> {
  const maybeDropdown: MaybeNull<ReactElement> = buildDropdown(pagesAmount, currentPage, pathname, searchParams, pageKey);
  if (maybeDropdown === null) return null;
  return <li key="pagination-dropdown-mobile">{maybeDropdown}</li>;
}

function buildPaginationItemsForDesktopTrivialCase(
  pagesAmount: Quantity,
  currentPage: Count,
  pathname: AppPath,
  searchParams: URLSearchParams,
  pageKey: string
) {
  const elements: ReactElement[] = [];

  for (let i = FIRST_PAGE_PARAM; i <= pagesAmount; i++) {
    const isActive = currentPage === i;
    elements.push(buildPaginationItem(i, isActive, pathname, searchParams, pageKey));
  }

  return elements;
}

function buildPaginationItemsForDesktop(
  pagesAmount: Quantity,
  currentPage: Count,
  pathname: AppPath,
  searchParams: URLSearchParams,
  pageKey: string
) {
  const maxUserInterfaceItemsAmount = 3;
  const minUserInterfaceItemsAmount = 2;

  if (pagesAmount === maxUserInterfaceItemsAmount || pagesAmount === minUserInterfaceItemsAmount) {
    return buildPaginationItemsForDesktopTrivialCase(pagesAmount, currentPage, pathname, searchParams, pageKey);
  }

  const activePageIsLastPage = currentPage === pagesAmount;

  const dropdownItems = [];
  let leftItem: MaybeNull<ReactElement> = null;
  let rightItem: MaybeNull<ReactElement> = null;

  function buildDropdownItem(i: Count, isCurrent: boolean = false) {
    const href = getItemHref(i, pathname, searchParams, pageKey);
    const item = (
      <DropdownMenuItem
        onClick={(event) => dispatchClickOnLinkOrButtonFirstChild(event.target)}
        className={cn('p-0', {
          'opacity-50': isCurrent
        })}
        key={`page-${i}`}
      >
        <Link
          className={cn('block w-full border-none px-2 py-1.5 text-center font-bold')}
          aria-current={isCurrent ? 'page' : undefined}
          title={String(i)}
          href={href}
        >
          {i}
        </Link>
      </DropdownMenuItem>
    );
    return item;
  }

  for (let i = FIRST_PAGE_PARAM; i <= pagesAmount; i++) {
    const isActive = currentPage === i;

    if (i === pagesAmount) {
      rightItem = buildPaginationItem(i, isActive, pathname, searchParams, pageKey);
      if (activePageIsLastPage) {
        const dropdownItem = buildDropdownItem(i, true);
        dropdownItems.push(dropdownItem);
      } else {
        const dropdownItem = buildDropdownItem(i);
        dropdownItems.push(dropdownItem);
      }

      if (!leftItem) {
        leftItem = buildPaginationItem(FIRST_PAGE_PARAM, false, pathname, searchParams, pageKey);
      }
      continue;
    }

    if (isActive) {
      leftItem = buildPaginationItem(i, isActive, pathname, searchParams, pageKey);

      const dropdownItem = buildDropdownItem(i, true);
      dropdownItems.push(dropdownItem);

      continue;
    }

    const dropdownItem = buildDropdownItem(i);
    dropdownItems.push(dropdownItem);
  }

  const dropdown: MaybeNull<ReactElement> = buildDropdownMenu(dropdownItems);
  if (dropdown === null) return [leftItem, rightItem];
  return [leftItem, <li key="pagination-dropdown-desktop">{dropdown}</li>, rightItem];
}

export function buildDropdown(
  pagesAmount: Quantity,
  pageFromUrl: Count,
  pathname: AppPath,
  searchParams: URLSearchParams,
  pageKey: string,
  isBottomWidget?: boolean
) {
  const dropdownItems: ReactElement[] = [];
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (pagesAmount === 1) return null;

  for (let i = FIRST_PAGE_PARAM; i <= pagesAmount; i++) {
    const isActive = pageFromUrl === i;
    const href = getItemHref(i, pathname, searchParams, pageKey);

    const dropdownItem = (
      <DropdownMenuItem onClick={(event) => dispatchClickOnLinkOrButtonFirstChild(event.target)} className="h-10 p-0" key={`page-${i}`}>
        <Link
          className={cn('flex h-full w-full items-center justify-center border-none px-2 text-center font-bold', {
            'rounded-md bg-primary': isActive
          })}
          aria-current={isActive ? 'page' : undefined}
          title={String(i)}
          href={href}
        >
          {i}
        </Link>
      </DropdownMenuItem>
    );

    dropdownItems.push(dropdownItem);
  }

  return buildDropdownMenu(dropdownItems, pageFromUrl, isBottomWidget);
}

export const doBuildPaginationItems = (
  currentPage: Count,
  pagesAmount: Quantity,
  pathname: AppPath,
  searchParams: URLSearchParams,
  isLargeScreen: boolean,
  pageKey: string
) =>
  isLargeScreen
    ? buildPaginationItemsForDesktop(pagesAmount, currentPage, pathname, searchParams, pageKey)
    : buildPaginationItemsForMobile(pagesAmount, currentPage, pathname, searchParams, pageKey);

export const buildPreviousBtn = (prevBtnPageId: Count, pathname: AppPath, searchParams: URLSearchParams, currentPage: Count, pageKey: string) => {
  const isDisabled = currentPage <= FIRST_PAGE_PARAM;

  return (
    <PaginationPrevious
      href={pathname + createURLSearchParams({ [pageKey]: prevBtnPageId <= FIRST_PAGE_PARAM ? null : prevBtnPageId }, searchParams)}
      className={cn('max-lg:h-10 max-lg:w-10 max-lg:p-0', { 'pointer-events-none opacity-50': isDisabled })}
      aria-disabled={isDisabled}
    />
  );
};

export const buildNextBtn = (
  nextBtnPageId: Count,
  pathname: AppPath,
  searchParams: URLSearchParams,
  currentPage: Count,
  pagesAmount: Quantity,
  pageKey: string
) => {
  const isDisabled = currentPage >= pagesAmount;

  return (
    <PaginationNext
      className={cn('max-lg:h-10 max-lg:w-10 max-lg:p-0', { 'pointer-events-none opacity-50': isDisabled })}
      href={pathname + createURLSearchParams({ [pageKey]: nextBtnPageId }, searchParams)}
      aria-disabled={isDisabled}
    />
  );
};
