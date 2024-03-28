'use client';

import type { BlogPostPreviewComponentWithMetadatas } from '@/types/Blog';
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { BlogTag } from '##/config/contentlayer/blog/blogTags';
import type { FunctionComponent } from 'react';

import { MIN_PAGES_AMOUNT, PAGE_KEY } from '@/components/ui/helpers/PaginatedElements/constants';
import { computePagesAmount } from '@/components/hooks/helpers/usePagination/functions';
import { useCallback, useEffect, useState, useMemo, useRef } from 'react';
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
  elementsPerPage: number;
  tags: BlogTag[];
  title: string;
}

function computePaginatedElements(selectedTagsIds: number[], postsCollection: BlogPostPreviewComponentWithMetadatas[]) {
  const maybeFilteredPostsCollection =
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    selectedTagsIds.length === 0
      ? postsCollection
      : postsCollection.filter((post) => post.tagsIndexes.some((tagId) => selectedTagsIds.includes(tagId)));

  const paginatedElements = maybeFilteredPostsCollection
    .sort((post1, post2) =>
      BlogConfigClient.DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_POSTS_ON_BLOG_SUBCATEGORY_PAGE(new Date(post1.date), new Date(post2.date))
    )
    .map((post) => post.blogPostPreviewComp);

  return paginatedElements;
}

function computeSelectedTagsIdsInitialState(packedsIds: MaybeNull<string>): number[] {
  try {
    const unpackedAndSanitizedFilters = getUnpackedAndSanitizedFilters(packedsIds);
    return unpackedAndSanitizedFilters;
  } catch {
    return [];
  }
}

const SubcategoryRelatedBlogPostsClient: FunctionComponent<SubcategoryRelatedBlogPostsClientProps> = ({
  postsCollection,
  elementsPerPage,
  title,
  tags
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const computedSelectedTagsIdsInitialState = useMemo(() => computeSelectedTagsIdsInitialState(searchParams.get(FILTERS_KEY)), []);
  const [selectedTagsIds, setSelectedTagsIds] = useState<number[]>(computedSelectedTagsIdsInitialState);

  const paginatedElements = useMemo(() => computePaginatedElements(selectedTagsIds, postsCollection), [postsCollection, selectedTagsIds]);

  const maxPagesAmount = useMemo(() => computePagesAmount(postsCollection.length, elementsPerPage), [postsCollection, elementsPerPage]);
  const pagesAmount = usePagination(paginatedElements, elementsPerPage);
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const pagesAmountHistory = useRef<SlidingList>(new SlidingList(2));

  const handlePageNumberReconcilation = useCallback(() => {
    function hardResetRouterAndSkip(): boolean {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
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
      if (pagesAmountHistoryPtr[historyLastIdx] === pagesAmountHistoryPtr[historyFirstIdx]) return true;
      return false;
    }

    function dontHandleFiltersClear() {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      if (selectedTagsIds.length !== 0) return true;
      return false;
    }

    if (hardResetRouterAndSkip()) return;
    if (noPageNumberChange()) return;
    if (dontHandleFiltersClear()) return;
    // {ToDo} Handle hell here
  }, [pagesAmount, router, searchParams, selectedTagsIds]);

  useEffect(() => {
    const pagesAmountHistoryPtr = pagesAmountHistory.current.getPtr();
    const historyLength = pagesAmountHistoryPtr.length;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const historyLastIdx = historyLength - 1;

    function initializePagesAmountHistoryAndSkip(): boolean {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      if (historyLength !== 0) return false;
      pagesAmountHistory.current.push(pagesAmount);
      return true;
    }

    function maybeHandlePageNumberReconcilation() {
      if (pagesAmount === pagesAmountHistoryPtr[historyLastIdx]) return;
      pagesAmountHistory.current.push(pagesAmount);
      handlePageNumberReconcilation();
    }

    if (initializePagesAmountHistoryAndSkip()) return;
    maybeHandlePageNumberReconcilation();
  }, [pagesAmount, handlePageNumberReconcilation]);

  const paginated = useMemo(
    () => <PaginatedElements paginatedElements={paginatedElements} elementsPerPage={elementsPerPage} pagesAmount={pagesAmount} />,
    [pagesAmount, paginatedElements, elementsPerPage]
  );

  return (
    <section className="w-full">
      <h1 className="mb-2 ltr:text-left rtl:text-right">{title}</h1>
      <SubcategoryRelatedBlogPostsClientToolbar
        setSelectedTagsIds={setSelectedTagsIds}
        selectedTagsIds={selectedTagsIds}
        maxPagesAmount={maxPagesAmount}
        pagesAmount={pagesAmount}
        tags={tags}
      />
      <div className="mb-4 flex min-w-full flex-col [&>article:not(:last-of-type)]:mb-6">{paginated}</div>
    </section>
  );
};

export default SubcategoryRelatedBlogPostsClient;
