'use client';

import type { BlogPostPreviewComponentWithMetadatas, BlogTagId } from '@/types/Blog';
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { BlogTag } from '##/config/contentlayer/blog/blogTags';
import type { FunctionComponent, MutableRefObject } from 'react';
import type { SlidingList } from '@rtm/shared-lib/datastructs';
import type { ReactElementKey } from '@rtm/shared-types/React';
import type { Limit, Id } from '@rtm/shared-types/Numbers';

import { CommandSeparator, CommandEmpty, CommandGroup, CommandInput, CommandList, CommandItem, Command } from '@/components/ui/Command';
import { computeReconciliatedPageIndex, getSanitizedCurrentPage } from '@/components/ui/helpers/PaginatedElements/functions';
import { FIRST_PAGE_PARAM, PAGE_KEY } from '@/components/ui/helpers/PaginatedElements/constants';
import { PopoverTrigger, PopoverContent, Popover } from '@/components/ui/Popover';
import { indexedBlogTagOptions } from '##/lib/builders/unifiedImport';
import { PlusCircledIcon, CheckIcon } from '@radix-ui/react-icons';
import { useCallback, useEffect, useState, useRef } from 'react';
import BUTTON_CONFIG from '@/components/config/styles/buttons';
import { useSearchParams, useRouter } from 'next/navigation';
import { createURLSearchParams } from '@rtm/shared-lib/html';
import { sortNumbers, packIds } from '@rtm/shared-lib/misc';
import { Separator } from '@/components/ui/Separator';
import { getClientSideI18n } from '@/i18n/client';
import { Badge } from '@/components/ui/Badge';
import { capitalize } from '@/lib/str';
import { i18ns } from '##/config/i18n';
import { cn } from '@/lib/tailwind';

import { getUnpackedAndSanitizedFilters } from './helpers/functions';
import { FILTERS_KEY } from './helpers/constants';

export interface TagsFiltersWidgetProps {
  extraCtx?: {
    pagesSlicesRelatedPostsIdsHistory: MutableRefObject<SlidingList<ReactElementKey[]>>;
    maybeFilteredPostsCollection: BlogPostPreviewComponentWithMetadatas[];
    elementsPerPage: Limit;
  };
  setSelectedTagsIds: (selectedTagsIds: BlogTagId[]) => unknown;
  expectedTagsIds: Set<BlogTagId>;
  selectedTagsIds: BlogTagId[];
  maxPagesAmount: Limit;
  maxId: BlogTagId;
  tags: BlogTag[];
}

const MEMORIZED_PAGE_BEFORE_FILTERING_KILLSWITCH = -1;

const TagsFiltersWidget: FunctionComponent<TagsFiltersWidgetProps> = ({
  setSelectedTagsIds,
  expectedTagsIds,
  selectedTagsIds,
  maxPagesAmount,
  extraCtx,
  maxId,
  tags
}) => {
  const globalT = getClientSideI18n();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const isOpenedRef = useRef<boolean>(isOpened);
  const memorizedPageBeforeFiltering = useRef<Id>(
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    selectedTagsIds.length !== 0 ? FIRST_PAGE_PARAM : getSanitizedCurrentPage(searchParams, maxPagesAmount, PAGE_KEY)
  );

  const firstLoad = useRef<boolean>(true);
  const cachedSelectedTags = useRef<MaybeNull<BlogTagId[]>>(null);

  const title = capitalize(globalT(`${i18ns.vocab}.tags`));
  const noResultFound = globalT(`${i18ns.blogTagsFilters}.no-result-found`);
  const clearFilters = globalT(`${i18ns.blogTagsFilters}.clear-filters`);

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const disabled = tags.length < 1;
  const classNameBase = 'flex h-10 items-center rounded-md px-2 py-4';

  useEffect(() => {
    function unsafeCtxHandler() {
      try {
        const unpackedAndCleanedFilters = getUnpackedAndSanitizedFilters(searchParams, expectedTagsIds, maxId, FILTERS_KEY);
        setSelectedTagsIds(unpackedAndCleanedFilters);

        const sanitizedFilters = packIds(unpackedAndCleanedFilters);
        const q = createURLSearchParams({ [FILTERS_KEY]: sanitizedFilters }, searchParams);
        router.replace(q, { scroll: false });
      } catch {
        const q = createURLSearchParams({ [FILTERS_KEY]: null }, searchParams);
        router.replace(q, { scroll: false });
      }
    }

    function maybeSafeCtxHandler() {
      if (cachedSelectedTags.current !== null) {
        setSelectedTagsIds(cachedSelectedTags.current);
        cachedSelectedTags.current = null;
        return;
      }

      unsafeCtxHandler();
    }

    if (firstLoad.current) unsafeCtxHandler();
    else maybeSafeCtxHandler();
  }, [router, searchParams, setSelectedTagsIds, expectedTagsIds, maxId]);

  useEffect(() => {
    firstLoad.current = false;
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (selectedTagsIds.length !== 0) return;
    memorizedPageBeforeFiltering.current = getSanitizedCurrentPage(searchParams, maxPagesAmount, PAGE_KEY);
  }, [searchParams, selectedTagsIds, maxPagesAmount, memorizedPageBeforeFiltering]);

  useEffect(() => {
    isOpenedRef.current = isOpened;
  }, [isOpened]);

  useEffect(() => {
    function killswitchMemorizedPageBeforeFilteringOnPaginationWidgetClick() {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      if (isOpenedRef.current || selectedTagsIds.length === 0) return;
      memorizedPageBeforeFiltering.current = MEMORIZED_PAGE_BEFORE_FILTERING_KILLSWITCH;
    }
    killswitchMemorizedPageBeforeFilteringOnPaginationWidgetClick();
  }, [searchParams, selectedTagsIds, maxPagesAmount, memorizedPageBeforeFiltering]);

  const updateRouterAndSetSelectedTags = useCallback(
    (selectedTagsIds: BlogTagId[]) => {
      const newSelectedTags = sortNumbers(selectedTagsIds);
      const packedIds = packIds(newSelectedTags);

      cachedSelectedTags.current = newSelectedTags;

      function handlePageResumeOnClearFiltersThenSkip(): boolean {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        if (newSelectedTags.length !== 0) return false;

        const pageId: MaybeNull<Id> = memorizedPageBeforeFiltering.current === FIRST_PAGE_PARAM ? null : memorizedPageBeforeFiltering.current;
        const q = createURLSearchParams({ [FILTERS_KEY]: null, [PAGE_KEY]: pageId });
        router.push(q, { scroll: false });
        memorizedPageBeforeFiltering.current = getSanitizedCurrentPage(searchParams, maxPagesAmount, PAGE_KEY);
        return true;
      }

      function filtersClearWithPageReconciliationInferenceThenSkip() {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        if (newSelectedTags.length !== 0 || !extraCtx) return false;
        const pagesSlicesRelatedPostsIdsHistoryPtr = extraCtx.pagesSlicesRelatedPostsIdsHistory.current.getPtr();
        const newPageIndex = computeReconciliatedPageIndex(
          pagesSlicesRelatedPostsIdsHistoryPtr,
          extraCtx.maybeFilteredPostsCollection,
          extraCtx.elementsPerPage
        );
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        if (newPageIndex === -1) return false;
        const q = createURLSearchParams({ [PAGE_KEY]: newPageIndex, [FILTERS_KEY]: null }, searchParams);
        router.replace(q, { scroll: false });
        return true;
      }

      if (memorizedPageBeforeFiltering.current !== MEMORIZED_PAGE_BEFORE_FILTERING_KILLSWITCH) {
        if (handlePageResumeOnClearFiltersThenSkip()) return;
      } else if (filtersClearWithPageReconciliationInferenceThenSkip()) return;

      const q = createURLSearchParams({ [FILTERS_KEY]: packedIds }, searchParams);
      router.push(q, { scroll: false });
    },
    [router, searchParams, maxPagesAmount, memorizedPageBeforeFiltering, extraCtx]
  );

  const buildCommandItems = useCallback(
    () =>
      tags.map((tag) => {
        const tagName = globalT(`${i18ns.blogTags}.${tag}`);
        const tagId = indexedBlogTagOptions[tag];
        const isSelected = selectedTagsIds.includes(tagId);

        const onSelect = () => {
          if (isSelected) {
            updateRouterAndSetSelectedTags(selectedTagsIds.filter((id) => id !== tagId));
          } else {
            updateRouterAndSetSelectedTags([...selectedTagsIds, tagId]);
          }
        };

        return (
          <CommandItem onSelect={() => onSelect()} className="h-12 lg:h-8" key={`filter-${tag}`}>
            <div
              className={cn(
                'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                isSelected ? 'bg-primary text-primary-foreground' : '[&_svg]:invisible'
              )}
            >
              <CheckIcon className={cn('h-4 w-4')} />
            </div>
            <span>{tagName}</span>
          </CommandItem>
        );
      }),
    [globalT, selectedTagsIds, tags, updateRouterAndSetSelectedTags]
  );

  const activeFiltersIndicator = (
    <>
      <Separator orientation="vertical" className="mx-2 h-4" />
      <Badge className="rounded-sm px-1 font-normal lg:hidden" variant="secondary">
        {selectedTagsIds.length}
      </Badge>
      <Badge className="hidden space-x-1 rounded-sm px-1 font-normal lg:flex" variant="secondary">
        {selectedTagsIds.length}
      </Badge>
    </>
  );

  const clearFiltersBtn = (
    <>
      <CommandSeparator />
      <CommandGroup>
        <CommandItem onSelect={() => updateRouterAndSetSelectedTags([])} className="justify-center text-center">
          {clearFilters}
        </CommandItem>
      </CommandGroup>
    </>
  );

  // {ToDo} Don't show the button at all when disabled
  if (disabled)
    return (
      <button
        className={cn(classNameBase, 'select-none text-inherit text-opacity-75 dark:text-muted-foreground dark:text-opacity-100')}
        aria-disabled="true"
      >
        <PlusCircledIcon className="mr-2 h-5 w-5" />
        {title}
      </button>
    );

  return (
    <Popover onOpenChange={(isOpen: boolean) => setIsOpened(isOpen)} open={isOpened}>
      <PopoverTrigger asChild>
        <button
          className={cn(classNameBase, BUTTON_CONFIG.CLASSNAME, {
            [BUTTON_CONFIG.NOT_ACTIVE_CLASSNAME]: !isOpened,
            [BUTTON_CONFIG.ACTIVE_CLASSNAME]: isOpened
          })}
        >
          <PlusCircledIcon className={cn('mr-2 h-5 w-5 transition-transform duration-300', { '-rotate-45 rtl:rotate-45': isOpened })} />
          {title}
          {/* eslint-disable-next-line @typescript-eslint/no-magic-numbers */}
          {selectedTagsIds.length > 0 && activeFiltersIndicator}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>{noResultFound}</CommandEmpty>
            <CommandGroup>{buildCommandItems()}</CommandGroup>
            {/* eslint-disable-next-line @typescript-eslint/no-magic-numbers */}
            {selectedTagsIds.length > 0 && clearFiltersBtn}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TagsFiltersWidget;
