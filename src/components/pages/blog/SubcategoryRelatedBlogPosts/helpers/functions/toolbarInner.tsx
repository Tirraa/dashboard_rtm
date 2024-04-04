import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { Quantity, Count, Id } from '@rtm/shared-types/Numbers';
import type { MutableRefObject, ReactElement } from 'react';
import type { FiltersAssoc } from '@/config/Blog/client';
import type { AppPath } from '@rtm/shared-types/Next';

import { PAGE_KEY } from '@/components/ui/helpers/PaginatedElements/constants';

import { buildDropdown } from '../../../helpers/functions/paginationWidget';
import FiltersSelectWidget from '../../../FiltersSelectWidget';
import PaginationWidget from '../../../PaginationWidget';

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const shouldShowPaginationWidget = (pagesAmount: Quantity): boolean => pagesAmount > 1;

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const shouldShowFiltersSelectWidget = (postsAmount: Quantity): boolean => postsAmount > 1;

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
  paginationWidgetProps: {
    showPaginationWidget: boolean;
    pagesAmount: Quantity;
    currentPage: Count;
  },
  filtersWidgetProps: {
    newSelectedFilter: MutableRefObject<MaybeNull<Id>>;
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
        newSelectedFilter={filtersWidgetProps.newSelectedFilter}
        selectedFilter={filtersWidgetProps.selectedFilter}
        filtersAssoc={filtersWidgetProps.filtersAssoc}
        triggerClassName="z-20 mb-1 self-end"
        key="filters-widget"
      />
    );
  }

  if (paginationWidgetProps.showPaginationWidget) {
    elements.push(
      <PaginationWidget
        pagesAmount={paginationWidgetProps.pagesAmount}
        currentPage={paginationWidgetProps.currentPage}
        className="w-full justify-end"
        key="pagination-widget"
      />
    );
  }

  return elements;
}

function buildWidgetsForBottom(
  paginationWidgetProps: {
    showPaginationWidget: boolean;
    pagesAmount: Quantity;
    currentPage: Count;
  },
  pathname: AppPath,
  searchParams: URLSearchParams
): ReactElement[] {
  const elements: ReactElement[] = [];
  const isBottomWidget = true;

  const maybeDropdown = getMaybeDropdown(
    paginationWidgetProps.showPaginationWidget,
    paginationWidgetProps.pagesAmount,
    paginationWidgetProps.currentPage,
    pathname,
    searchParams,
    isBottomWidget
  );

  if (maybeDropdown !== null) elements.push(maybeDropdown);

  return elements;
}

// {ToDo} Write tests when the function is fully implemented
export function buildTopWidgets(
  paginationWidgetProps: {
    pagesAmount: Quantity;
    postsAmount: Quantity;
    currentPage: Count;
  },
  filtersWidgetProps: {
    newSelectedFilter: MutableRefObject<MaybeNull<Id>>;
    setSelectedFilterSwitch: (s: boolean) => unknown;
    filtersAssoc: FiltersAssoc;
    selectedFilter: Id;
  }
): ReactElement[] {
  const showPaginationWidget = shouldShowPaginationWidget(paginationWidgetProps.pagesAmount);
  const showFiltersSelectWidget = shouldShowFiltersSelectWidget(paginationWidgetProps.postsAmount);

  return buildWidgetsForTop(
    {
      pagesAmount: paginationWidgetProps.pagesAmount,
      currentPage: paginationWidgetProps.currentPage,
      showPaginationWidget
    },
    {
      setSelectedFilterSwitch: filtersWidgetProps.setSelectedFilterSwitch,
      newSelectedFilter: filtersWidgetProps.newSelectedFilter,
      selectedFilter: filtersWidgetProps.selectedFilter,
      filtersAssoc: filtersWidgetProps.filtersAssoc,
      showFiltersSelectWidget
    }
  );
}

export function buildBottomWidgets(
  pathname: AppPath,
  searchParams: URLSearchParams,
  paginationWidgetProps: {
    pagesAmount: Quantity;
    currentPage: Count;
  }
): ReactElement[] {
  const showPaginationWidget = shouldShowPaginationWidget(paginationWidgetProps.pagesAmount);

  return buildWidgetsForBottom(
    {
      pagesAmount: paginationWidgetProps.pagesAmount,
      currentPage: paginationWidgetProps.currentPage,
      showPaginationWidget
    },
    pathname,
    searchParams
  );
}
