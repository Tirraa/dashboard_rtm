import type { BlogPostPreviewComponentWithMetadatas } from '@/types/Blog';
import type { FiltersAssoc } from '@/config/Blog/client';

// eslint-disable-next-line import/no-extraneous-dependencies
import { compareDesc } from 'date-fns/compareDesc';
import { describe, expect, it } from 'vitest';
import * as React from 'react';

import {
  doGetMaybeFilteredPostsCollection,
  doComputePaginatedElements,
  getSortedPostsCollection,
  shouldShowBottomToolbar,
  shouldShowTopToolbar
} from '../client';
import { computeReconciliatedPageIndex } from '../pagination';
import { FIRST_PAGE_PARAM } from '../../constants';

const emptyPostsCollection: BlogPostPreviewComponentWithMetadatas[] = [];

const fakeTags = ['tag1', 'tag2', 'tag3', 'tag4'];
// eslint-disable-next-line no-magic-numbers
const fakeTagsIndexes = [0, 1, 2, 3];

const __filtersAssoc: FiltersAssoc = [
  {
    // eslint-disable-next-line no-magic-numbers,no-unused-vars
    score: (post1: BlogPostPreviewComponentWithMetadatas, post2: BlogPostPreviewComponentWithMetadatas) => 0,
    // @ts-ignore
    i18nTitle: ''
  },
  {
    // eslint-disable-next-line no-magic-numbers,no-unused-vars
    score: (post1: BlogPostPreviewComponentWithMetadatas, post2: BlogPostPreviewComponentWithMetadatas) =>
      compareDesc(new Date(post1.date), new Date(post2.date)),
    // @ts-ignore
    i18nTitle: ''
  }
];

const onlyOnePostPostsCollection: BlogPostPreviewComponentWithMetadatas[] = [
  {
    blogPostPreviewComp: React.createElement('div', {}, 'The only one'),
    date: '2021-01-01',
    tagsIndexes: [],
    title: 'Title',
    language: 'en',
    _id: '1',
    tags: []
  }
];

const twoPostsPostsCollection: BlogPostPreviewComponentWithMetadatas[] = [
  {
    // eslint-disable-next-line no-magic-numbers
    tagsIndexes: [fakeTagsIndexes[0], fakeTagsIndexes[1], fakeTagsIndexes[3]],
    blogPostPreviewComp: React.createElement('div', {}, 'The first'),
    // @ts-ignore
    // eslint-disable-next-line no-magic-numbers
    tags: [fakeTags[0], fakeTags[1], fakeTags[3]],
    date: '2021-01-01',
    title: 'Title',
    language: 'en',
    _id: '1'
  },
  {
    blogPostPreviewComp: React.createElement('div', {}, 'The second'),
    date: '2022-01-01',
    tagsIndexes: [],
    title: 'Title',
    language: 'en',
    _id: '2',
    tags: []
  }
];

const fivePostsPostsCollection: BlogPostPreviewComponentWithMetadatas[] = [
  {
    // eslint-disable-next-line no-magic-numbers
    tagsIndexes: [fakeTagsIndexes[0], fakeTagsIndexes[1], fakeTagsIndexes[3]],
    blogPostPreviewComp: React.createElement('div', {}, 'The first'),
    // @ts-ignore
    // eslint-disable-next-line no-magic-numbers
    tags: [fakeTags[0], fakeTags[1], fakeTags[3]],
    date: '2021-01-01',
    title: 'Title',
    language: 'en',
    _id: '1'
  },
  {
    blogPostPreviewComp: React.createElement('div', {}, 'The second'),
    date: '2022-01-01',
    tagsIndexes: [],
    title: 'Title',
    language: 'en',
    _id: '2',
    tags: []
  },
  {
    // eslint-disable-next-line no-magic-numbers
    tagsIndexes: [fakeTagsIndexes[0], fakeTagsIndexes[1], fakeTagsIndexes[3]],
    blogPostPreviewComp: React.createElement('div', {}, 'The third'),
    // @ts-ignore
    // eslint-disable-next-line no-magic-numbers
    tags: [fakeTags[0], fakeTags[1], fakeTags[3]],
    date: '2021-01-01',
    title: 'Title',
    language: 'en',
    _id: '3'
  },
  {
    // eslint-disable-next-line no-magic-numbers
    tagsIndexes: [fakeTagsIndexes[0], fakeTagsIndexes[1], fakeTagsIndexes[3]],
    blogPostPreviewComp: React.createElement('div', {}, 'The fourth'),
    // @ts-ignore
    // eslint-disable-next-line no-magic-numbers
    tags: [fakeTags[0], fakeTags[1], fakeTags[3]],
    date: '2021-01-01',
    title: 'Title',
    language: 'en',
    _id: '4'
  },
  {
    // eslint-disable-next-line no-magic-numbers
    tagsIndexes: [fakeTagsIndexes[0], fakeTagsIndexes[1], fakeTagsIndexes[3]],
    blogPostPreviewComp: React.createElement('div', {}, 'The fifth'),
    // @ts-ignore
    // eslint-disable-next-line no-magic-numbers
    tags: [fakeTags[0], fakeTags[1], fakeTags[3]],
    date: '2021-01-01',
    title: 'Title',
    language: 'en',
    _id: '5'
  }
];

describe('shouldShowTopToolbar', () => {
  it('should return false or true depending on postsCollection length', () => {
    expect(shouldShowTopToolbar(emptyPostsCollection)).toBe(false);
    expect(shouldShowTopToolbar(onlyOnePostPostsCollection)).toBe(false);
    expect(shouldShowTopToolbar(twoPostsPostsCollection)).toBe(true);
  });
});

describe('shouldShowBottomToolbar', () => {
  it('should return false or true depending on pagesAmount', () => {
    // eslint-disable-next-line no-magic-numbers
    expect(shouldShowBottomToolbar(0)).toBe(false);
    // eslint-disable-next-line no-magic-numbers
    expect(shouldShowBottomToolbar(1)).toBe(false);
    // eslint-disable-next-line no-magic-numbers
    expect(shouldShowBottomToolbar(2)).toBe(true);
  });
});

describe('doGetMaybeFilteredPostsCollection', () => {
  it('should return the same list as its input, given no selected tags', () => {
    const maybeFilteredPostsCollection = doGetMaybeFilteredPostsCollection([], twoPostsPostsCollection);
    expect(maybeFilteredPostsCollection).toStrictEqual(twoPostsPostsCollection);
  });

  it('should return a filtered list, given selected tags', () => {
    // eslint-disable-next-line no-magic-numbers
    const maybeFilteredPostsCollection = doGetMaybeFilteredPostsCollection([fakeTagsIndexes[0]], twoPostsPostsCollection);
    // eslint-disable-next-line no-magic-numbers
    expect(maybeFilteredPostsCollection).toStrictEqual([twoPostsPostsCollection[0]]);
  });

  it('should return an empty list, given invalid selected tags', () => {
    // eslint-disable-next-line no-magic-numbers
    const invalidTagIndex = Math.max(...fakeTagsIndexes) + 1;
    const maybeFilteredPostsCollection = doGetMaybeFilteredPostsCollection([invalidTagIndex], twoPostsPostsCollection);
    expect(maybeFilteredPostsCollection).toStrictEqual([]);
  });
});

describe('getSortedPostsCollection', () => {
  it('should return original list, unchanged', () => {
    const filterFunIndex = 0;
    const maybeFilteredPostsCollection = twoPostsPostsCollection;

    const toSorted = getSortedPostsCollection(filterFunIndex, maybeFilteredPostsCollection, __filtersAssoc);

    expect(toSorted).toStrictEqual(twoPostsPostsCollection);
  });

  it('should return a new list, sorted', () => {
    const filterFunIndex = 1;
    const maybeFilteredPostsCollection = twoPostsPostsCollection;

    const toSorted = getSortedPostsCollection(filterFunIndex, maybeFilteredPostsCollection, __filtersAssoc);

    // eslint-disable-next-line no-magic-numbers
    expect(toSorted).toStrictEqual([twoPostsPostsCollection[1], twoPostsPostsCollection[0]]);
  });
});

describe('doComputePaginatedElements', () => {
  it('should translate list into fragments, unchanged', () => {
    const filterFunIndex = 0;
    const maybeFilteredPostsCollection = twoPostsPostsCollection;

    const paginatedElements = doComputePaginatedElements(filterFunIndex, maybeFilteredPostsCollection, __filtersAssoc);

    expect(paginatedElements).toStrictEqual([
      // eslint-disable-next-line no-magic-numbers
      React.createElement(React.Fragment, { key: twoPostsPostsCollection[0]._id }, twoPostsPostsCollection[0].blogPostPreviewComp),
      // eslint-disable-next-line no-magic-numbers
      React.createElement(React.Fragment, { key: twoPostsPostsCollection[1]._id }, twoPostsPostsCollection[1].blogPostPreviewComp)
    ]);
  });

  it('should translate list into fragments, sorted', () => {
    const filterFunIndex = 1;
    const maybeFilteredPostsCollection = twoPostsPostsCollection;

    const paginatedElements = doComputePaginatedElements(filterFunIndex, maybeFilteredPostsCollection, __filtersAssoc);

    expect(paginatedElements).toStrictEqual([
      // eslint-disable-next-line no-magic-numbers
      React.createElement(React.Fragment, { key: twoPostsPostsCollection[1]._id }, twoPostsPostsCollection[1].blogPostPreviewComp),
      // eslint-disable-next-line no-magic-numbers
      React.createElement(React.Fragment, { key: twoPostsPostsCollection[0]._id }, twoPostsPostsCollection[0].blogPostPreviewComp)
    ]);
  });
});

describe('computeReconciliatedPageIndex', () => {
  it('should return the last page index, given the last page indexes in the old slice ids', () => {
    const elementsPerPage = 2;
    const maybeFilteredPostsCollection = fivePostsPostsCollection;
    const expected = 3;

    const reconciliatedPageIndex = computeReconciliatedPageIndex(['5'], maybeFilteredPostsCollection, elementsPerPage);

    expect(reconciliatedPageIndex).toBe(expected);
  });

  it('should return the first page index, given the first page indexes in the old slice ids', () => {
    const elementsPerPage = 2;
    const maybeFilteredPostsCollection = fivePostsPostsCollection;
    const expected = 1;

    const reconciliatedPageIndex = computeReconciliatedPageIndex(['1', '2'], maybeFilteredPostsCollection, elementsPerPage);

    expect(reconciliatedPageIndex).toBe(expected);
  });

  it('should return the 2nd page index, given the 2nd page indexes in the old slice ids', () => {
    const elementsPerPage = 2;
    const maybeFilteredPostsCollection = fivePostsPostsCollection;
    const expected = 2;

    const reconciliatedPageIndex = computeReconciliatedPageIndex(['3', '4'], maybeFilteredPostsCollection, elementsPerPage);

    expect(reconciliatedPageIndex).toBe(expected);
  });

  it('should return FIRST_PAGE_PARAM, given unknown page index in the old slice ids', () => {
    const elementsPerPage = 2;
    const maybeFilteredPostsCollection = fivePostsPostsCollection;
    const expected = FIRST_PAGE_PARAM;

    const reconciliatedPageIndex = computeReconciliatedPageIndex(['__UNKNOWN__'], maybeFilteredPostsCollection, elementsPerPage);

    expect(reconciliatedPageIndex).toBe(expected);
  });
});
