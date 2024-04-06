import type { BlogPostPreviewComponentWithMetadatas } from '@/types/Blog';
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { FiltersAssoc } from '@/config/Blog/client';
import type { Id } from '@rtm/shared-types/Numbers';

import FiltersSelectWidget from '@/components/pages/blog/FiltersSelectWidget';
import TagsCommandWidget from '@/components/pages/blog/TagsCommandWidget';
import PaginationWidget from '@/components/pages/blog/PaginationWidget';
import { createElement, createRef } from 'react';
import { describe, expect, it } from 'vitest';

import { buildBottomRightWidgets, buildTopRightWidgets, buildTopLeftWidgets } from '../toolbarInner';

describe('buildBottomRightWidgets', () => {
  it('should return an empty list, given no reason to generate a pagination dropdown', () => {
    const pathname = 'pathname';
    const searchParams = new URLSearchParams();

    const pagesAmount = 1;
    const currentPage = 1;

    const bottomRightWidgets = buildBottomRightWidgets(pathname, searchParams, { pagesAmount, currentPage });
    expect(bottomRightWidgets).toStrictEqual([]);
  });

  it('should match snapshot', () => {
    const pathname = 'pathname';
    const searchParams = new URLSearchParams();

    const pagesAmount = 4;
    const currentPage = 1;

    const bottomRightWidgets = buildBottomRightWidgets(pathname, searchParams, { pagesAmount, currentPage });
    expect(bottomRightWidgets).toMatchSnapshot();
  });
});

describe('buildTopLeftWidgets', () => {
  it('should return empty list, given there is only one tag', () => {
    const tagsCommandWidgetProps = {
      memorizedPageBeforeFiltering: createRef<MaybeNull<Id>>(),
      newSelectedTagsIds: createRef<MaybeNull<Id[]>>(),
      setSelectedTagSwitch: () => {},
      tags: ['tag'] as any,
      selectedTagsIds: []
    };

    const topLeftWidgets = buildTopLeftWidgets(tagsCommandWidgetProps);
    expect(topLeftWidgets).toStrictEqual([]);
  });

  it('should return crafted top left widgets, given there is enough tags', () => {
    const tagsCommandWidgetProps = {
      memorizedPageBeforeFiltering: createRef<MaybeNull<Id>>(),
      newSelectedTagsIds: createRef<MaybeNull<Id[]>>(),
      tags: ['tag_one', 'tag_two', 'tag_three'] as any,
      setSelectedTagSwitch: () => {},
      selectedTagsIds: []
    };

    const topLeftWidgets = buildTopLeftWidgets(tagsCommandWidgetProps);

    const tagsCommandWidgetElement = createElement(TagsCommandWidget, {
      memorizedPageBeforeFiltering: tagsCommandWidgetProps.memorizedPageBeforeFiltering,

      setSelectedTagSwitch: tagsCommandWidgetProps.setSelectedTagSwitch,
      newSelectedTagsIds: tagsCommandWidgetProps.newSelectedTagsIds,
      selectedTagsIds: tagsCommandWidgetProps.selectedTagsIds,
      tags: tagsCommandWidgetProps.tags,
      key: 'tags-filter-widget'
    });

    const expected = [tagsCommandWidgetElement];

    expect(topLeftWidgets).toStrictEqual(expected);
  });
});

describe('buildTopRightWidgets', () => {
  const __filtersAssoc: FiltersAssoc = [
    {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers,@typescript-eslint/no-unused-vars
      score: (post1: BlogPostPreviewComponentWithMetadatas, post2: BlogPostPreviewComponentWithMetadatas) => 0,
      // @ts-ignore
      i18nTitle: ''
    }
  ];

  it('should return empty list, given there is only one page and only one post', () => {
    const paginationWidgetProps = {
      pagesAmount: 1,
      postsAmount: 1,
      currentPage: 1
    };

    const filtersWidgetProps = {
      newSelectedFilter: createRef<MaybeNull<Id>>(),
      setSelectedFilterSwitch: () => {},
      filtersAssoc: __filtersAssoc,
      selectedFilter: 0
    };

    const topRightWidgets = buildTopRightWidgets(paginationWidgetProps, filtersWidgetProps);
    expect(topRightWidgets).toStrictEqual([]);
  });

  it('should return a list containing only the FiltersSelectWidget, given only one page but several posts', () => {
    const paginationWidgetProps = {
      pagesAmount: 1,
      postsAmount: 2,
      currentPage: 1
    };

    const filtersWidgetProps = {
      newSelectedFilter: createRef<MaybeNull<Id>>(),
      setSelectedFilterSwitch: () => {},
      filtersAssoc: __filtersAssoc,
      selectedFilter: 0
    };

    const filtersSelectWidgetElement = createElement(FiltersSelectWidget, {
      setSelectedFilterSwitch: filtersWidgetProps.setSelectedFilterSwitch,
      newSelectedFilter: filtersWidgetProps.newSelectedFilter,
      selectedFilter: filtersWidgetProps.selectedFilter,
      filtersAssoc: filtersWidgetProps.filtersAssoc,
      triggerClassName: 'z-20 mb-1 self-end',
      key: 'filters-widget'
    });

    const expected = [filtersSelectWidgetElement];

    const topRightWidgets = buildTopRightWidgets(paginationWidgetProps, filtersWidgetProps);
    expect(topRightWidgets).toStrictEqual(expected);
  });

  it('should return a list containing both the FiltersSelectWidget and the PaginationWidget, given several pages and several posts', () => {
    const paginationWidgetProps = {
      postsAmount: 10,
      pagesAmount: 2,
      currentPage: 1
    };

    const filtersWidgetProps = {
      newSelectedFilter: createRef<MaybeNull<Id>>(),
      setSelectedFilterSwitch: () => {},
      filtersAssoc: __filtersAssoc,
      selectedFilter: 0
    };

    const filtersSelectWidgetElement = createElement(FiltersSelectWidget, {
      setSelectedFilterSwitch: filtersWidgetProps.setSelectedFilterSwitch,
      newSelectedFilter: filtersWidgetProps.newSelectedFilter,
      selectedFilter: filtersWidgetProps.selectedFilter,
      filtersAssoc: filtersWidgetProps.filtersAssoc,
      triggerClassName: 'z-20 mb-1 self-end',
      key: 'filters-widget'
    });

    const paginationWidgetElement = createElement(PaginationWidget, {
      pagesAmount: paginationWidgetProps.pagesAmount,
      currentPage: paginationWidgetProps.currentPage,
      className: 'w-full justify-end',
      key: 'pagination-widget'
    });

    const expected = [filtersSelectWidgetElement, paginationWidgetElement];

    const topRightWidgets = buildTopRightWidgets(paginationWidgetProps, filtersWidgetProps);
    expect(topRightWidgets).toStrictEqual(expected);
  });
});
