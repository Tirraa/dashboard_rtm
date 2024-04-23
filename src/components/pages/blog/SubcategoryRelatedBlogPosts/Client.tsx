'use client';

import type { BlogPostPreviewComponentWithMetadatas, BlogTagId } from '@/types/Blog';
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { BlogTag } from '##/config/contentlayer/blog/blogTags';
import type { ReactElementKey } from '@rtm/shared-types/React';
import type { Limit, Id } from '@rtm/shared-types/Numbers';
import type { FunctionComponent } from 'react';

import {
  doGetMaybeFilteredPostsCollection,
  doComputePaginatedElements,
  getSortedPostsCollection,
  shouldShowBottomToolbar,
  shouldShowTopToolbar
} from '@/components/ui/helpers/PaginatedElements/functions/client';
import { computeReconciliatedPageIndex, getSanitizedCurrentPage } from '@/components/ui/helpers/PaginatedElements/functions/pagination';
import { getPaginatedElementsCurrentSlice } from '@/components/ui/helpers/PaginatedElements/functions/paginatedElements';
import { PAGE_KEY } from '@/components/ui/helpers/PaginatedElements/constants';
import BlogConfigClient, { MAX_FILTER_INDEX } from '@/config/Blog/client';
import { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import PaginatedElements from '@/components/ui/PaginatedElements';
import { createURLSearchParams } from '@rtm/shared-lib/html';
import usePagination from '@/components/hooks/usePagination';
import { useSearchParams, useRouter } from 'next/navigation';
import { packIds } from '@rtm/shared-lib/misc';

import { getSanitizedCurrentFilterIndex } from '../helpers/functions/filtersSelectWidget';
import { getUnpackedAndSanitizedFilters } from '../helpers/functions/filters';
import SubcategoryRelatedBlogPostsClientToolbar from './Toolbar';
import { FILTERS_KEY, TAGS_KEY } from '../helpers/constants';
import { ETagsSwitch } from './helpers/enums';

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
  title,
  tags
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedFilter = useMemo(() => getSanitizedCurrentFilterIndex(searchParams, MAX_FILTER_INDEX, FILTERS_KEY), [searchParams]);

  const selectedTagsIds = useMemo(() => getUnpackedAndSanitizedFilters(searchParams, expectedTagsIds, TAGS_KEY), [searchParams, expectedTagsIds]);

  const [selectedFilterSwitch, setSelectedFilterSwitch] = useState<boolean>(false);
  const [selectedTagSwitch, setSelectedTagSwitch] = useState<ETagsSwitch>(ETagsSwitch.OFF);

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
  const newSelectedTagsIds = useRef<MaybeNull<Id[]>>(null);
  const memorizedPageBeforeFiltering = useRef<MaybeNull<Id>>(null);

  useEffect(() => {
    if (!selectedFilterSwitch || newSelectedFilter.current === null) return;

    const slice = getPaginatedElementsCurrentSlice(currentPage, elementsPerPage, paginatedElements);

    const keys: ReactElementKey[] = [];
    for (const element of slice) if (element.key) keys.push(element.key);

    const toSorted = getSortedPostsCollection(newSelectedFilter.current, maybeFilteredPostsCollection);

    const newPageIndex = computeReconciliatedPageIndex(keys, toSorted, elementsPerPage);
    const q = createURLSearchParams({ [FILTERS_KEY]: newSelectedFilter.current, [PAGE_KEY]: newPageIndex }, searchParams);

    newSelectedFilter.current = null;

    router.replace(q, { scroll: false });
    setSelectedFilterSwitch(false);
  }, [selectedFilterSwitch, currentPage, elementsPerPage, maybeFilteredPostsCollection, paginatedElements, router, searchParams]);

  useEffect(() => {
    if (selectedTagSwitch === ETagsSwitch.OFF || newSelectedTagsIds.current === null) return;

    const slice = getPaginatedElementsCurrentSlice(currentPage, elementsPerPage, paginatedElements);

    const keys: ReactElementKey[] = [];
    for (const element of slice) if (element.key) keys.push(element.key);

    const toMaybeFiltered = doGetMaybeFilteredPostsCollection(newSelectedTagsIds.current, postsCollection);
    const toSorted = getSortedPostsCollection(selectedFilter, toMaybeFiltered);

    function handleSelecting(__newSelectedTagsIds: BlogTagId[]) {
      const newPageIndex = computeReconciliatedPageIndex(keys, toSorted, elementsPerPage);

      const packedTagsIds = packIds(__newSelectedTagsIds);
      const q = createURLSearchParams({ [TAGS_KEY]: packedTagsIds, [PAGE_KEY]: newPageIndex }, searchParams);

      newSelectedTagsIds.current = null;

      router.replace(q, { scroll: false });
    }

    function handleUnselecting(__newSelectedTagsIds: BlogTagId[]) {
      const newPaginatedElements = doComputePaginatedElements(selectedFilter, toMaybeFiltered);
      const newSlice = getPaginatedElementsCurrentSlice(currentPage, elementsPerPage, newPaginatedElements);

      const newKeys: ReactElementKey[] = [];
      for (const element of newSlice) if (element.key) newKeys.push(element.key);

      const firstCommonKey: MaybeNull<ReactElementKey> = keys.find((key) => newKeys.includes(key)) ?? null;
      if (firstCommonKey === null) {
        handleSelecting(__newSelectedTagsIds);
        return;
      }

      const packedTagsIds = packIds(__newSelectedTagsIds);
      const q = createURLSearchParams({ [TAGS_KEY]: packedTagsIds }, searchParams);

      newSelectedTagsIds.current = null;

      router.replace(q, { scroll: false });
    }

    function handleClearing(__newSelectedTagsIds: BlogTagId[]) {
      if (memorizedPageBeforeFiltering.current === null) {
        handleUnselecting(__newSelectedTagsIds);
        return;
      }

      const q = createURLSearchParams({ [PAGE_KEY]: memorizedPageBeforeFiltering.current, [TAGS_KEY]: null }, searchParams);

      router.replace(q, { scroll: false });
    }

    const handlers = {
      [ETagsSwitch.UNSELECTING]: handleUnselecting,
      [ETagsSwitch.SELECTING]: handleSelecting,
      [ETagsSwitch.CLEARING]: handleClearing
    } as const;

    handlers[selectedTagSwitch](newSelectedTagsIds.current);
    setSelectedTagSwitch(ETagsSwitch.OFF);
  }, [selectedTagSwitch, currentPage, elementsPerPage, paginatedElements, postsCollection, selectedFilter, selectedTagsIds, router, searchParams]);

  useEffect(() => {
    // eslint-disable-next-line no-magic-numbers
    if (selectedTagsIds.length !== 0) return;
    memorizedPageBeforeFiltering.current = getSanitizedCurrentPage(searchParams, pagesAmount, PAGE_KEY);
  }, [searchParams, selectedTagsIds, pagesAmount]);

  const showTopToolbar = shouldShowTopToolbar(postsCollection);
  const showBottomToolbar = shouldShowBottomToolbar(pagesAmount);

  return (
    <section className="w-full">
      <h1 className="mb-2 ltr:text-left rtl:text-right">{title}</h1>
      {showTopToolbar && (
        <SubcategoryRelatedBlogPostsClientToolbar
          filtersAssoc={BlogConfigClient.COMPARE_FUNCTIONS_USED_TO_SORT_POSTS_ON_BLOG_SUBCATEGORY_PAGE}
          memorizedPageBeforeFiltering={memorizedPageBeforeFiltering}
          setSelectedFilterSwitch={setSelectedFilterSwitch}
          setSelectedTagSwitch={setSelectedTagSwitch}
          newSelectedTagsIds={newSelectedTagsIds}
          postsAmount={paginatedElements.length}
          newSelectedFilter={newSelectedFilter}
          selectedTagsIds={selectedTagsIds}
          selectedFilter={selectedFilter}
          currentPage={currentPage}
          pagesAmount={pagesAmount}
          tags={tags}
        />
      )}
      {/* {ToDo} https://github.com/Tirraa/dashboard_rtm/issues/126 */}
      <div className="mb-4 flex min-w-full flex-col [&>article:not(:last-of-type)]:mb-6">{paginated}</div>
      {showBottomToolbar && (
        <SubcategoryRelatedBlogPostsClientToolbar
          filtersAssoc={BlogConfigClient.COMPARE_FUNCTIONS_USED_TO_SORT_POSTS_ON_BLOG_SUBCATEGORY_PAGE}
          memorizedPageBeforeFiltering={memorizedPageBeforeFiltering}
          setSelectedFilterSwitch={setSelectedFilterSwitch}
          setSelectedTagSwitch={setSelectedTagSwitch}
          newSelectedTagsIds={newSelectedTagsIds}
          postsAmount={paginatedElements.length}
          newSelectedFilter={newSelectedFilter}
          selectedTagsIds={selectedTagsIds}
          selectedFilter={selectedFilter}
          currentPage={currentPage}
          pagesAmount={pagesAmount}
          isBottomWidget
          tags={tags}
        />
      )}
    </section>
  );
};

export default SubcategoryRelatedBlogPostsClient;
