import type { BlogPostPreviewComponentWithMetadatas, BlogTagId } from '@/types/Blog';
import type { Quantity, Index, Score } from '@rtm/shared-types/Numbers';
import type { FiltersAssoc } from '@/config/Blog/client';

import BlogConfigClient from '@/config/Blog/client';
import { Fragment } from 'react';

export function doGetMaybeFilteredPostsCollection(selectedTagsIds: BlogTagId[], postsCollection: BlogPostPreviewComponentWithMetadatas[]) {
  const maybeFilteredPostsCollection =
    // eslint-disable-next-line no-magic-numbers
    selectedTagsIds.length === 0
      ? postsCollection
      : postsCollection.filter((post) => post.tagsIndexes.some((tagId) => selectedTagsIds.includes(tagId)));

  return maybeFilteredPostsCollection;
}

export function getSortedPostsCollection(
  filterFunIndex: Index,
  maybeFilteredPostsCollection: BlogPostPreviewComponentWithMetadatas[],
  __filtersAssoc: FiltersAssoc = BlogConfigClient.COMPARE_FUNCTIONS_USED_TO_SORT_POSTS_ON_BLOG_SUBCATEGORY_PAGE
) {
  const getSortScore = (post1: BlogPostPreviewComponentWithMetadatas, post2: BlogPostPreviewComponentWithMetadatas): Score =>
    __filtersAssoc[filterFunIndex].score(post1, post2);

  const toSorted = maybeFilteredPostsCollection.toSorted((post1, post2) => getSortScore(post1, post2));
  return toSorted;
}

export function doComputePaginatedElements(
  filterFunIndex: Index,
  maybeFilteredPostsCollection: BlogPostPreviewComponentWithMetadatas[],
  __filtersAssoc: FiltersAssoc = BlogConfigClient.COMPARE_FUNCTIONS_USED_TO_SORT_POSTS_ON_BLOG_SUBCATEGORY_PAGE
) {
  const paginatedElements = getSortedPostsCollection(filterFunIndex, maybeFilteredPostsCollection, __filtersAssoc).map((post) => (
    <Fragment key={post._id}>{post.blogPostPreviewComp}</Fragment>
  ));

  return paginatedElements;
}

// eslint-disable-next-line no-magic-numbers
export const shouldShowTopToolbar = (postsCollection: BlogPostPreviewComponentWithMetadatas[]): boolean => postsCollection.length > 1;

// eslint-disable-next-line no-magic-numbers
export const shouldShowBottomToolbar = (pagesAmount: Quantity): boolean => pagesAmount > 1;
