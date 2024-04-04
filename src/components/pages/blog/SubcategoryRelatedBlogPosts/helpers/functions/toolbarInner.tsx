import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { Quantity, Count, Id } from '@rtm/shared-types/Numbers';
import type { FiltersAssoc } from '@/config/Blog/client';
import type { AppPath } from '@rtm/shared-types/Next';
import type { ReactElement } from 'react';

import { PAGE_KEY } from '@/components/ui/helpers/PaginatedElements/constants';

import { buildDropdown } from '../../../helpers/functions/paginationWidget';
import FiltersSelectWidget from '../../../FiltersSelectWidget';
import PaginationWidget from '../../../PaginationWidget';

const getMaybeDropdown = (
  showPaginationWidget: boolean,
  pagesAmount: Quantity,
  currentPage: Count,
  pathname: AppPath,
  searchParams: URLSearchParams,
  isBottomWidget?: boolean
): MaybeNull<ReactElement> =>
  !showPaginationWidget ? null : buildDropdown(pagesAmount, currentPage, pathname, searchParams, PAGE_KEY, isBottomWidget);

function buildWidgetsForTop(
  pagesAmount: Quantity,
  currentPage: Count,
  showPaginationWidget: boolean,
  filtersWidgetProps: {
    setSelectedFilter: (selectedFilter: Id) => unknown;
    setSelectedFilterSwitch: (s: boolean) => unknown;
    showFiltersSelectWidget: boolean;
    filtersAssoc: FiltersAssoc;
    selectedFilter: Id;
  }
): ReactElement[] {
  const elements: ReactElement[] = [];

  if (filtersWidgetProps.showFiltersSelectWidget) {
    elements.push(
      <FiltersSelectWidget
        setSelectedFilterSwitch={filtersWidgetProps.setSelectedFilterSwitch}
        setSelectedFilter={filtersWidgetProps.setSelectedFilter}
        selectedFilter={filtersWidgetProps.selectedFilter}
        filtersAssoc={filtersWidgetProps.filtersAssoc}
        triggerClassName="z-20 mb-1 self-end"
        key="filters-widget"
      />
    );
  }

  if (showPaginationWidget) {
    elements.push(<PaginationWidget className="w-full justify-end" pagesAmount={pagesAmount} currentPage={currentPage} key="pagination-widget" />);
  }

  return elements;
}

function buildWidgetsForBottom(
  pagesAmount: Quantity,
  currentPage: Count,
  pathname: AppPath,
  searchParams: URLSearchParams,
  isBottomWidget: boolean,
  showPaginationWidget: boolean
): ReactElement[] {
  const elements: ReactElement[] = [];

  const maybeDropdown = getMaybeDropdown(showPaginationWidget, pagesAmount, currentPage, pathname, searchParams, isBottomWidget);

  if (maybeDropdown !== null) elements.push(maybeDropdown);

  return elements;
}

// {ToDo} Write tests when the function is fully implemented
export function buildWidgets(
  pagesAmount: Quantity,
  postsAmount: Quantity,
  currentPage: Count,
  pathname: AppPath,
  searchParams: URLSearchParams,
  filtersWidgetProps: {
    setSelectedFilter: (selectedFilter: Id) => unknown;
    setSelectedFilterSwitch: (s: boolean) => unknown;
    filtersAssoc: FiltersAssoc;
    selectedFilter: Id;
  },
  isBottomWidget?: boolean
): ReactElement[] {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const showPaginationWidget = pagesAmount > 1;
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const showFiltersSelectWidget = postsAmount > 1;

  const widgets = !isBottomWidget
    ? buildWidgetsForTop(pagesAmount, currentPage, showPaginationWidget, {
        setSelectedFilterSwitch: filtersWidgetProps.setSelectedFilterSwitch,
        setSelectedFilter: filtersWidgetProps.setSelectedFilter,
        selectedFilter: filtersWidgetProps.selectedFilter,
        filtersAssoc: filtersWidgetProps.filtersAssoc,
        showFiltersSelectWidget
      })
    : buildWidgetsForBottom(pagesAmount, currentPage, pathname, searchParams, showPaginationWidget, isBottomWidget);

  return widgets;
}
