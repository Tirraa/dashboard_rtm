import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { Quantity, Count } from '@rtm/shared-types/Numbers';
import type { AppPath } from '@rtm/shared-types/Next';
import type { ReactElement } from 'react';

import { buildDropdown } from '../../../helpers/functions/paginationWidget';
import PaginationWidget from '../../../PaginationWidget';

const getMaybeDropdown = (
  showPaginationWidget: boolean,
  pagesAmount: Quantity,
  currentPage: Count,
  pathname: AppPath,
  searchParams: URLSearchParams,
  isBottomWidget?: boolean
): MaybeNull<ReactElement> => (!showPaginationWidget ? null : buildDropdown(pagesAmount, currentPage, pathname, searchParams, isBottomWidget));

function buildWidgetsForTop(showPaginationWidget: boolean, pagesAmount: Quantity, currentPage: Count): ReactElement[] {
  const elements: ReactElement[] = [];

  if (showPaginationWidget) {
    elements.push(<PaginationWidget className="w-full justify-end" pagesAmount={pagesAmount} currentPage={currentPage} key="pagination-widget" />);
  }

  return elements;
}

function buildWidgetsForBottom(
  showPaginationWidget: boolean,
  pagesAmount: Quantity,
  currentPage: Count,
  pathname: AppPath,
  searchParams: URLSearchParams,
  isBottomWidget: boolean
): ReactElement[] {
  const elements: ReactElement[] = [];

  const maybeDropdown = getMaybeDropdown(showPaginationWidget, pagesAmount, currentPage, pathname, searchParams, isBottomWidget);

  if (maybeDropdown !== null) elements.push(maybeDropdown);

  return elements;
}

// {ToDo} Write tests
export function buildWidgets(
  pagesAmount: Quantity,
  currentPage: Count,
  pathname: AppPath,
  searchParams: URLSearchParams,
  isBottomWidget?: boolean
): ReactElement[] {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const showPaginationWidget = pagesAmount > 1;

  const widgets = !isBottomWidget
    ? buildWidgetsForTop(showPaginationWidget, pagesAmount, currentPage)
    : buildWidgetsForBottom(showPaginationWidget, pagesAmount, currentPage, pathname, searchParams, isBottomWidget);

  return widgets;
}
