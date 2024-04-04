import type { BlogPostPreviewComponentWithMetadatas, BlogTagId } from '@/types/Blog';
import type { Index, Score } from '@rtm/shared-types/Numbers';
import type { FiltersAssoc } from '@/config/Blog/client';

import { getUnpackedAndSanitizedFilters } from '@/components/pages/blog/helpers/functions/filters';
import BlogConfigClient from '@/config/Blog/client';
import { Fragment } from 'react';

export function doComputeSelectedTagsIdsInitialState(searchParams: URLSearchParams, expectedTagsIds: Set<BlogTagId>, tagsKey: string) {
  try {
    const unpackedAndSanitizedFilters = getUnpackedAndSanitizedFilters(searchParams, expectedTagsIds, tagsKey);
    return unpackedAndSanitizedFilters;
  } catch {
    return [];
  }
}

export function doGetMaybeFilteredPostsCollection(selectedTagsIds: BlogTagId[], postsCollection: BlogPostPreviewComponentWithMetadatas[]) {
  const maybeFilteredPostsCollection =
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    selectedTagsIds.length === 0
      ? postsCollection
      : postsCollection.filter((post) => post.tagsIndexes.some((tagId) => selectedTagsIds.includes(tagId)));

  return maybeFilteredPostsCollection;
}

export function doComputePaginatedElements(
  filterFunIndex: Index,
  maybeFilteredPostsCollection: BlogPostPreviewComponentWithMetadatas[],
  __filtersAssoc: FiltersAssoc = BlogConfigClient.COMPARE_FUNCTIONS_USED_TO_SORT_POSTS_ON_BLOG_SUBCATEGORY_PAGE
) {
  const getSortScore = (post1: BlogPostPreviewComponentWithMetadatas, post2: BlogPostPreviewComponentWithMetadatas): Score =>
    __filtersAssoc[filterFunIndex].score(post1, post2);

  const paginatedElements = maybeFilteredPostsCollection
    .sort((post1, post2) => getSortScore(post1, post2))
    .map((post) => <Fragment key={post._id}>{post.blogPostPreviewComp}</Fragment>);

  return paginatedElements;
}

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
export const shouldShowToolbar = (postsCollection: BlogPostPreviewComponentWithMetadatas[]): boolean => postsCollection.length > 1;
