'use client';

import type { BlogPostPreviewComponentWithMetadatas, BlogTagId } from '@/types/Blog';
import type { Count, Index, Limit, Id } from '@rtm/shared-types/Numbers';
import type { BlogTag } from '##/config/contentlayer/blog/blogTags';
import type { FunctionComponent } from 'react';

import {
  findPageNumberByPaginatedElementIndex,
  getPaginatedElementsCurrentSlice,
  getSanitizedCurrentPage
} from '@/components/ui/helpers/PaginatedElements/functions';
import { FIRST_PAGE_PARAM, PAGE_KEY } from '@/components/ui/helpers/PaginatedElements/constants';
import { computePagesAmount } from '@/components/hooks/helpers/usePagination/functions';
import { useCallback, useEffect, useState, Fragment, useMemo, useRef } from 'react';
import PaginatedElements from '@/components/ui/PaginatedElements';
import { createURLSearchParams } from '@rtm/shared-lib/html';
import { useSearchParams, useRouter } from 'next/navigation';
import usePagination from '@/components/hooks/usePagination';
import { SlidingList } from '@rtm/shared-lib/datastructs';
import BlogConfigClient from '@/config/Blog/client';

import { getUnpackedAndSanitizedFilters } from '../helpers/functions';
import SubcategoryRelatedBlogPostsClientToolbar from './toolbar';
import { FILTERS_KEY } from '../helpers/constants';

interface SubcategoryRelatedBlogPostsClientProps {
  postsCollection: BlogPostPreviewComponentWithMetadatas[];
  expectedTagsIds: Set<BlogTagId>;
  maxBlogTagId: BlogTagId;
  elementsPerPage: Limit;
  tags: BlogTag[];
  title: string;
}

const SubcategoryRelatedBlogPostsClient: FunctionComponent<SubcategoryRelatedBlogPostsClientProps> = ({
  postsCollection,
  elementsPerPage,
  expectedTagsIds,
  maxBlogTagId,
  title,
  tags
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const computeSelectedTagsIdsInitialState = useCallback(
    () => {
      try {
        const unpackedAndSanitizedFilters = getUnpackedAndSanitizedFilters(searchParams, expectedTagsIds, maxBlogTagId, FILTERS_KEY);
        return unpackedAndSanitizedFilters;
      } catch {
        return [];
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const computedSelectedTagsIdsInitialState = useMemo(() => computeSelectedTagsIdsInitialState(), [computeSelectedTagsIdsInitialState]);

  const [selectedTagsIds, setSelectedTagsIds] = useState<BlogTagId[]>(computedSelectedTagsIdsInitialState);
  const oldSelectedTagsIds = useRef<BlogTagId[]>(computedSelectedTagsIdsInitialState);

  const getMaybeFilteredPostsCollection = useCallback(() => {
    const maybeFilteredPostsCollection =
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      selectedTagsIds.length === 0
        ? postsCollection
        : postsCollection.filter((post) => post.tagsIndexes.some((tagId) => selectedTagsIds.includes(tagId)));

    return maybeFilteredPostsCollection;
  }, [postsCollection, selectedTagsIds]);

  const maybeFilteredPostsCollection = useMemo(() => getMaybeFilteredPostsCollection(), [getMaybeFilteredPostsCollection]);

  const computePaginatedElements = useCallback(() => {
    const paginatedElements = maybeFilteredPostsCollection
      .sort((post1, post2) =>
        BlogConfigClient.DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_POSTS_ON_BLOG_SUBCATEGORY_PAGE(new Date(post1.date), new Date(post2.date))
      )
      .map((post) => <Fragment key={post._id}>{post.blogPostPreviewComp}</Fragment>);

    return paginatedElements;
  }, [maybeFilteredPostsCollection]);

  const paginatedElements = useMemo(() => computePaginatedElements(), [computePaginatedElements]);
  const maxPagesAmount = useMemo(() => computePagesAmount(postsCollection.length, elementsPerPage), [postsCollection, elementsPerPage]);
  const pagesAmount = usePagination(paginatedElements, elementsPerPage);

  const memorizedPageBeforeFiltering = useRef<Id>(
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    selectedTagsIds.length !== 0 ? FIRST_PAGE_PARAM : getSanitizedCurrentPage(searchParams, maxPagesAmount, PAGE_KEY)
  );

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const pagesSlicesRelatedPostsIdsHistory = useRef<SlidingList<FragmentKey[]>>(new SlidingList(2));

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const oldPage = useRef<Count>(-1);
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const oldPaginatedElementsLength = useRef<Count>(-1);

  const currentPage = useMemo(() => getSanitizedCurrentPage(searchParams, pagesAmount, PAGE_KEY), [pagesAmount, searchParams]);

  const paginated = useMemo(
    () => <PaginatedElements paginatedElements={paginatedElements} elementsPerPage={elementsPerPage} currentPage={currentPage} />,
    [paginatedElements, elementsPerPage, currentPage]
  );
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const getReconciliatedPageIndex = useCallback((): Index | -1 => {
    const pagesSlicesRelatedPostsIdsHistoryPtr = pagesSlicesRelatedPostsIdsHistory.current.getPtr();
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (pagesSlicesRelatedPostsIdsHistoryPtr.length !== 2) return -1;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const oldSliceIds = pagesSlicesRelatedPostsIdsHistoryPtr[0];

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    let firstCommonElementIndex: Index | -1 = -1;

    for (const postId of oldSliceIds) {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      const maybeFirstCommonElementIndex: Index | -1 = maybeFilteredPostsCollection.findIndex((post) => post._id === postId);
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      if (maybeFirstCommonElementIndex !== -1) {
        firstCommonElementIndex = maybeFirstCommonElementIndex;
        break;
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (firstCommonElementIndex === -1) return -1;

    const newPage = findPageNumberByPaginatedElementIndex(firstCommonElementIndex, elementsPerPage, pagesAmount);
    return newPage;
  }, [elementsPerPage, pagesAmount, maybeFilteredPostsCollection]);

  useEffect(() => {
    const currentPaginatedElements = paginatedElements.length;
    if (oldPage.current === currentPage && oldPaginatedElementsLength.current === currentPaginatedElements) return;

    const slice = getPaginatedElementsCurrentSlice(currentPage, elementsPerPage, paginatedElements);

    let keys: FragmentKey[] = [];
    for (const element of slice) if (element.key) keys.push(element.key);

    oldPage.current = currentPage;
    oldPaginatedElementsLength.current = currentPaginatedElements;

    pagesSlicesRelatedPostsIdsHistory.current.push(keys);

    const selectedTagsIdsSet = new Set(selectedTagsIds);
    const commons = oldSelectedTagsIds.current.filter((x) => selectedTagsIdsSet.has(x));

    if (commons.length === selectedTagsIds.length && commons.length === oldSelectedTagsIds.current.length) return;

    const hasUncheckedTags = selectedTagsIds.length < oldSelectedTagsIds.current.length;

    oldSelectedTagsIds.current = [...selectedTagsIds];

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (selectedTagsIds.length === 0) return;

    const pagesSlicesRelatedPostsIdsHistoryPtr = pagesSlicesRelatedPostsIdsHistory.current.getPtr();
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const oldSliceIds = pagesSlicesRelatedPostsIdsHistoryPtr[0];

    if (hasUncheckedTags) {
      const currentSliceHasCommonElementsWithOldSlice = maybeFilteredPostsCollection.some((post) => oldSliceIds.includes(post._id));
      if (currentSliceHasCommonElementsWithOldSlice) return;
    }

    const newPageIndex = getReconciliatedPageIndex();
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (newPageIndex === -1) return;
    const q = createURLSearchParams({ [PAGE_KEY]: newPageIndex }, searchParams);
    router.replace(q, { scroll: false });
  }, [
    paginatedElements,
    currentPage,
    getReconciliatedPageIndex,
    router,
    searchParams,
    selectedTagsIds,
    elementsPerPage,
    maybeFilteredPostsCollection
  ]);

  return (
    <section className="w-full">
      <h1 className="mb-2 ltr:text-left rtl:text-right">{title}</h1>
      <SubcategoryRelatedBlogPostsClientToolbar
        memorizedPageBeforeFiltering={memorizedPageBeforeFiltering}
        setSelectedTagsIds={setSelectedTagsIds}
        selectedTagsIds={selectedTagsIds}
        expectedTagsIds={expectedTagsIds}
        maxPagesAmount={maxPagesAmount}
        pagesAmount={pagesAmount}
        maxId={maxBlogTagId}
        tags={tags}
      />
      <div className="mb-4 flex min-w-full flex-col [&>article:not(:last-of-type)]:mb-6">{paginated}</div>
    </section>
  );
};

export default SubcategoryRelatedBlogPostsClient;

type FragmentKey = string;
