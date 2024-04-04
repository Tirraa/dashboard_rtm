'use client';

import type { BlogPostPreviewComponentWithMetadatas, BlogTagId } from '@/types/Blog';
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { BlogTag } from '##/config/contentlayer/blog/blogTags';
import type { ReactElementKey } from '@rtm/shared-types/React';
import type { Limit, Id } from '@rtm/shared-types/Numbers';
import type { FunctionComponent } from 'react';

import {
  doComputeSelectedTagsIdsInitialState,
  doGetMaybeFilteredPostsCollection,
  doComputePaginatedElements,
  getSortedPostsCollection,
  shouldShowToolbar
} from '@/components/ui/helpers/PaginatedElements/functions/client';
import { computeReconciliatedPageIndex, getSanitizedCurrentPage } from '@/components/ui/helpers/PaginatedElements/functions/pagination';
import { getPaginatedElementsCurrentSlice } from '@/components/ui/helpers/PaginatedElements/functions/paginatedElements';
import { PAGE_KEY } from '@/components/ui/helpers/PaginatedElements/constants';
import BlogConfigClient, { MAX_FILTER_INDEX } from '@/config/Blog/client';
import { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import { createURLSearchParams } from 'packages/shared-lib/src/html';
import PaginatedElements from '@/components/ui/PaginatedElements';
import usePagination from '@/components/hooks/usePagination';
import { useSearchParams, useRouter } from 'next/navigation';

import { getSanitizedCurrentFilterIndex } from '../helpers/functions/filtersSelectWidget';
import SubcategoryRelatedBlogPostsClientToolbar from './Toolbar';
import { FILTERS_KEY, TAGS_KEY } from '../helpers/constants';

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
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedFilter = useMemo(() => getSanitizedCurrentFilterIndex(searchParams, MAX_FILTER_INDEX, FILTERS_KEY), [searchParams]);

  const showToolbar = shouldShowToolbar(postsCollection);

  const [selectedFilterSwitch, setSelectedFilterSwitch] = useState<boolean>(false);

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
    () => doComputePaginatedElements(selectedFilter, maybeFilteredPostsCollection),
    [maybeFilteredPostsCollection, selectedFilter]
  );

  const paginatedElements = useMemo(() => computePaginatedElements(), [computePaginatedElements]);
  const pagesAmount = usePagination(paginatedElements, elementsPerPage);
  const currentPage = useMemo(() => getSanitizedCurrentPage(searchParams, pagesAmount, PAGE_KEY), [pagesAmount, searchParams]);

  const paginated = useMemo(
    () => <PaginatedElements paginatedElements={paginatedElements} elementsPerPage={elementsPerPage} currentPage={currentPage} />,
    [paginatedElements, elementsPerPage, currentPage]
  );

  const newSelectedFilter = useRef<MaybeNull<Id>>(null);

  useEffect(() => {
    if (!selectedFilterSwitch || newSelectedFilter.current === null) return;

    const slice = getPaginatedElementsCurrentSlice(currentPage, elementsPerPage, paginatedElements);

    const keys: ReactElementKey[] = [];
    for (const element of slice) if (element.key) keys.push(element.key);
    const toSorted = getSortedPostsCollection(newSelectedFilter.current, maybeFilteredPostsCollection);

    const newPageIndex = computeReconciliatedPageIndex(keys, toSorted, elementsPerPage);
    const q = createURLSearchParams({ [FILTERS_KEY]: newSelectedFilter.current, [PAGE_KEY]: newPageIndex }, searchParams);

    newSelectedFilter.current = null;

    router.push(q, { scroll: false });
    setSelectedFilterSwitch(false);
  }, [selectedFilterSwitch, currentPage, elementsPerPage, maybeFilteredPostsCollection, paginatedElements, router, searchParams]);

  return (
    <section className="w-full">
      <h1 className="mb-2 ltr:text-left rtl:text-right">{title}</h1>
      {showToolbar && (
        <SubcategoryRelatedBlogPostsClientToolbar
          filtersAssoc={BlogConfigClient.COMPARE_FUNCTIONS_USED_TO_SORT_POSTS_ON_BLOG_SUBCATEGORY_PAGE}
          setSelectedFilterSwitch={setSelectedFilterSwitch}
          postsAmount={paginatedElements.length}
          newSelectedFilter={newSelectedFilter}
          selectedFilter={selectedFilter}
          currentPage={currentPage}
          pagesAmount={pagesAmount}
        />
      )}
      <div className="mb-4 flex min-w-full flex-col [&>article:not(:last-of-type)]:mb-6">{paginated}</div>
    </section>
  );
};

export default SubcategoryRelatedBlogPostsClient;
