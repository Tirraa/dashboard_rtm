import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { Quantity, Count, Id } from '@rtm/shared-types/Numbers';
import type { BlogTag } from '##/config/contentlayer/blog/blogTags';
import type { MutableRefObject, ReactElement } from 'react';
import type { FiltersAssoc } from '@/config/Blog/client';
import type { AppPath } from '@rtm/shared-types/Next';
import type { BlogTagId } from '@/types/Blog';

import { PAGE_KEY } from '@/components/ui/helpers/PaginatedElements/constants';

import type { ETagsSwitch } from '../enums';

import { buildDropdown } from '../../../helpers/functions/paginationWidget';
import shouldShowTagsCommandWidget from './shouldShowTagsCommandWidget';
import shouldShowPaginationWidget from './shouldShowPaginationWidget';
import FiltersSelectWidget from '../../../FiltersSelectWidget';
import TagsCommandWidget from '../../../TagsCommandWidget';
import PaginationWidget from '../../../PaginationWidget';

// eslint-disable-next-line no-magic-numbers
const shouldShowFiltersSelectWidget = (postsAmount: Quantity): boolean => postsAmount > 1;

const getMaybeDropdown = (
  showPaginationWidget: boolean,
  pagesAmount: Quantity,
  currentPage: Count,
  pathname: AppPath,
  searchParams: URLSearchParams,
  isBottomWidget?: boolean
): MaybeNull<ReactElement> =>
  !showPaginationWidget
    ? null
    : buildDropdown(pagesAmount, currentPage, pathname, searchParams, PAGE_KEY, { dropdownContentClassName: 'z-20', isBottomWidget });

function buildWidgetsForTopRight(
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
        selectContentClassName="z-20"
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

function buildWidgetsForBottomRight(
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

export function buildTopLeftWidgets(tagsCommandWidgetProps: {
  memorizedPageBeforeFiltering: MutableRefObject<MaybeNull<Id>>;
  newSelectedTagsIds: MutableRefObject<MaybeNull<Id[]>>;
  setSelectedTagSwitch: (s: ETagsSwitch) => unknown;
  selectedTagsIds: BlogTagId[];
  tags: BlogTag[];
}): ReactElement[] {
  const showTagsCommandWidget = shouldShowTagsCommandWidget(tagsCommandWidgetProps.tags.length);

  const elements: ReactElement[] = [];

  if (showTagsCommandWidget) {
    elements.push(
      <TagsCommandWidget
        memorizedPageBeforeFiltering={tagsCommandWidgetProps.memorizedPageBeforeFiltering}
        setSelectedTagSwitch={tagsCommandWidgetProps.setSelectedTagSwitch}
        newSelectedTagsIds={tagsCommandWidgetProps.newSelectedTagsIds}
        selectedTagsIds={tagsCommandWidgetProps.selectedTagsIds}
        tags={tagsCommandWidgetProps.tags}
        key="tags-filter-widget"
      />
    );
  }

  return elements;
}

export function buildTopRightWidgets(
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

  return buildWidgetsForTopRight(
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

export function buildBottomRightWidgets(
  pathname: AppPath,
  searchParams: URLSearchParams,
  paginationWidgetProps: {
    pagesAmount: Quantity;
    currentPage: Count;
  }
): ReactElement[] {
  const showPaginationWidget = shouldShowPaginationWidget(paginationWidgetProps.pagesAmount);

  return buildWidgetsForBottomRight(
    {
      pagesAmount: paginationWidgetProps.pagesAmount,
      currentPage: paginationWidgetProps.currentPage,
      showPaginationWidget
    },
    pathname,
    searchParams
  );
}
