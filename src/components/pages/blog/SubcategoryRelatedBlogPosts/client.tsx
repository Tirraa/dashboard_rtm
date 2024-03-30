'use client';

import type { BlogPostPreviewComponentWithMetadatas, BlogTagId } from '@/types/Blog';
import type { Quantity, Count, Limit } from '@rtm/shared-types/Numbers';
import type { BlogTag } from '##/config/contentlayer/blog/blogTags';
import type { FunctionComponent, ReactElement } from 'react';

import { getPaginatedElementsCurrentSlice, getSanitizedCurrentPage } from '@/components/ui/helpers/PaginatedElements/functions';
import { MIN_PAGES_AMOUNT, PAGE_KEY } from '@/components/ui/helpers/PaginatedElements/constants';
import { computePagesAmount } from '@/components/hooks/helpers/usePagination/functions';
import { useCallback, useEffect, useState, Fragment, useMemo, useRef } from 'react';
import PaginatedElements from '@/components/ui/PaginatedElements';
import usePagination from '@/components/hooks/usePagination';
import { createURLSearchParams } from '@rtm/shared-lib/html';
import { useSearchParams, useRouter } from 'next/navigation';
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

function computePaginatedElements(selectedTagsIds: BlogTagId[], postsCollection: BlogPostPreviewComponentWithMetadatas[]) {
  const maybeFilteredPostsCollection =
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    selectedTagsIds.length === 0
      ? postsCollection
      : postsCollection.filter((post) => post.tagsIndexes.some((tagId) => selectedTagsIds.includes(tagId)));

  const paginatedElements = maybeFilteredPostsCollection
    .sort((post1, post2) =>
      BlogConfigClient.DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_POSTS_ON_BLOG_SUBCATEGORY_PAGE(new Date(post1.date), new Date(post2.date))
    )
    .map((post) => <Fragment key={post._id}>{post.blogPostPreviewComp}</Fragment>);

  return paginatedElements;
}

function computeSelectedTagsIdsInitialState(searchParams: URLSearchParams, expectedTagsIds: Set<BlogTagId>, maxId: BlogTagId): BlogTagId[] {
  try {
    const unpackedAndSanitizedFilters = getUnpackedAndSanitizedFilters(searchParams, expectedTagsIds, maxId, FILTERS_KEY);
    return unpackedAndSanitizedFilters;
  } catch {
    return [];
  }
}

function computeFreshSliceMetadatas(currentPage: Count, elementsPerPage: Quantity, paginatedElements: ReactElement[]): FragmentKey[] {
  const currentSlice = getPaginatedElementsCurrentSlice(currentPage, elementsPerPage, paginatedElements);
  const metadatas: FragmentKey[] = [];

  for (const element of currentSlice) if (element.key) metadatas.push(element.key);
  return metadatas;
}

const SubcategoryRelatedBlogPostsClient: FunctionComponent<SubcategoryRelatedBlogPostsClientProps> = ({
  postsCollection,
  elementsPerPage,
  expectedTagsIds,
  maxBlogTagId,
  title,
  tags
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const computedSelectedTagsIdsInitialState = useMemo(
    () => computeSelectedTagsIdsInitialState(searchParams, expectedTagsIds, maxBlogTagId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [selectedTagsIds, setSelectedTagsIds] = useState<BlogTagId[]>(computedSelectedTagsIdsInitialState);

  const paginatedElements = useMemo(() => computePaginatedElements(selectedTagsIds, postsCollection), [postsCollection, selectedTagsIds]);

  const maxPagesAmount = useMemo(() => computePagesAmount(postsCollection.length, elementsPerPage), [postsCollection, elementsPerPage]);
  const pagesAmount = usePagination(paginatedElements, elementsPerPage);
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const pagesAmountHistory = useRef<SlidingList<Count>>(new SlidingList(2));
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const pagesSlicesRelatedPostsIdsHistory = useRef<SlidingList<FragmentKey[]>>(new SlidingList(2));
  const currentPage = useMemo(() => getSanitizedCurrentPage(searchParams, pagesAmount, PAGE_KEY), [pagesAmount, searchParams]);

  const handlePageNumberReconcilation = useCallback(() => {
    function hardResetRouterAndSkip(): boolean {
      if (pagesAmount !== MIN_PAGES_AMOUNT) return false;

      const q = createURLSearchParams({ [PAGE_KEY]: null }, searchParams);
      router.replace(q, { scroll: false });
      return true;
    }

    function noPageNumberChange(): boolean {
      const pagesAmountHistoryPtr = pagesAmountHistory.current.getPtr();
      const historyLength = pagesAmountHistoryPtr.length;
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      const historyLastIdx = historyLength - 1;
      const historyFirstIdx = 0;
      return pagesAmountHistoryPtr[historyLastIdx] === pagesAmountHistoryPtr[historyFirstIdx];
    }

    const clearedFilters = () => {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      if (selectedTagsIds.length === 0) {
        pagesSlicesRelatedPostsIdsHistory.current.push(computeFreshSliceMetadatas(currentPage, elementsPerPage, paginatedElements));
        return true;
      }
      return false;
    };

    if (hardResetRouterAndSkip()) return;
    if (noPageNumberChange()) return;
    if (clearedFilters()) return;

    const pagesSlicesRelatedPostsIdsHistoryPtr = pagesSlicesRelatedPostsIdsHistory.current.getPtr();
    console.log(pagesSlicesRelatedPostsIdsHistoryPtr);
    // {ToDo} Handle page number reconciliation
  }, [pagesAmount, router, searchParams, selectedTagsIds, currentPage, elementsPerPage, paginatedElements]);

  useEffect(() => {
    const pagesAmountHistoryPtr = pagesAmountHistory.current.getPtr();
    const historyLength = pagesAmountHistoryPtr.length;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const historyLastIdx = historyLength - 1;

    function initializePagesAmountHistoryAndSkip(): boolean {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      if (historyLength !== 0) return false;
      pagesAmountHistory.current.push(pagesAmount);
      pagesSlicesRelatedPostsIdsHistory.current.push(computeFreshSliceMetadatas(currentPage, elementsPerPage, paginatedElements));

      return true;
    }

    function maybeHandlePageNumberReconcilation() {
      if (pagesAmount === pagesAmountHistoryPtr[historyLastIdx]) return;
      pagesAmountHistory.current.push(pagesAmount);
      pagesSlicesRelatedPostsIdsHistory.current.push(computeFreshSliceMetadatas(currentPage, elementsPerPage, paginatedElements));
      handlePageNumberReconcilation();
    }

    if (initializePagesAmountHistoryAndSkip()) return;
    maybeHandlePageNumberReconcilation();
  }, [pagesAmount, handlePageNumberReconcilation, currentPage, elementsPerPage, paginatedElements]);

  const paginated = useMemo(
    () => <PaginatedElements paginatedElements={paginatedElements} elementsPerPage={elementsPerPage} currentPage={currentPage} />,
    [paginatedElements, elementsPerPage, currentPage]
  );

  return (
    <section className="w-full">
      <h1 className="mb-2 ltr:text-left rtl:text-right">{title}</h1>
      <SubcategoryRelatedBlogPostsClientToolbar
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
