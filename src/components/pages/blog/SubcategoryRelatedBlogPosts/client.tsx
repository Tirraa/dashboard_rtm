'use client';

import type { BlogPostPreviewComponentWithMetadatas, BlogTagId } from '@/types/Blog';
import type { BlogTag } from '##/config/contentlayer/blog/blogTags';
import type { Index, Limit } from '@rtm/shared-types/Numbers';
import type { FunctionComponent } from 'react';

import {
  doComputeSelectedTagsIdsInitialState,
  doGetMaybeFilteredPostsCollection,
  doComputePaginatedElements,
  shouldShowToolbar
} from '@/components/ui/helpers/PaginatedElements/functions/client';
import { getSanitizedCurrentPage } from '@/components/ui/helpers/PaginatedElements/functions/pagination';
import { PAGE_KEY } from '@/components/ui/helpers/PaginatedElements/constants';
import PaginatedElements from '@/components/ui/PaginatedElements';
import usePagination from '@/components/hooks/usePagination';
import { useCallback, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import SubcategoryRelatedBlogPostsClientToolbar from './toolbar';
import { TAGS_KEY } from '../helpers/constants';

interface SubcategoryRelatedBlogPostsClientProps {
  postsCollection: BlogPostPreviewComponentWithMetadatas[];
  expectedTagsIds: Set<BlogTagId>;
  elementsPerPage: Limit;
  tags: BlogTag[];
  title: string;
}

const SubcategoryRelatedBlogPostsClient: FunctionComponent<SubcategoryRelatedBlogPostsClientProps> = ({
  postsCollection,
  elementsPerPage,
  expectedTagsIds,
  title
}) => {
  const searchParams = useSearchParams();

  const HARDCODED_FILTER_FUN_INDEX = 0;
  const showToolbar = shouldShowToolbar(postsCollection);

  const [filterFunIndex] = useState<Index>(HARDCODED_FILTER_FUN_INDEX);

  const computeSelectedTagsIdsInitialState = useCallback(
    () => doComputeSelectedTagsIdsInitialState(searchParams, expectedTagsIds, TAGS_KEY),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const computedSelectedTagsIdsInitialState = useMemo(() => computeSelectedTagsIdsInitialState(), [computeSelectedTagsIdsInitialState]);

  const [selectedTagsIds] = useState<BlogTagId[]>(computedSelectedTagsIdsInitialState);

  const getMaybeFilteredPostsCollection = useCallback(
    () => doGetMaybeFilteredPostsCollection(selectedTagsIds, postsCollection),
    [postsCollection, selectedTagsIds]
  );

  const maybeFilteredPostsCollection = useMemo(() => getMaybeFilteredPostsCollection(), [getMaybeFilteredPostsCollection]);

  const computePaginatedElements = useCallback(
    () => doComputePaginatedElements(filterFunIndex, maybeFilteredPostsCollection),
    [maybeFilteredPostsCollection, filterFunIndex]
  );

  const paginatedElements = useMemo(() => computePaginatedElements(), [computePaginatedElements]);
  const pagesAmount = usePagination(paginatedElements, elementsPerPage);
  const currentPage = useMemo(() => getSanitizedCurrentPage(searchParams, pagesAmount, PAGE_KEY), [pagesAmount, searchParams]);

  const paginated = useMemo(
    () => <PaginatedElements paginatedElements={paginatedElements} elementsPerPage={elementsPerPage} currentPage={currentPage} />,
    [paginatedElements, elementsPerPage, currentPage]
  );

  return (
    <section className="w-full">
      <h1 className="mb-2 ltr:text-left rtl:text-right">{title}</h1>
      {showToolbar && <SubcategoryRelatedBlogPostsClientToolbar currentPage={currentPage} pagesAmount={pagesAmount} />}
      <div className="mb-4 flex min-w-full flex-col [&>article:not(:last-of-type)]:mb-6">{paginated}</div>
    </section>
  );
};

export default SubcategoryRelatedBlogPostsClient;
