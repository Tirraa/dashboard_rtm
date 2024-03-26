'use client';

import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { BlogTag } from '##/config/contentlayer/blog/blogTags';
import type { FunctionComponent } from 'react';

import { CommandSeparator, CommandEmpty, CommandGroup, CommandInput, CommandList, CommandItem, Command } from '@/components/ui/Command';
import { getSanitizedCurrentPage, MIN_PAGES_AMOUNT, FIRST_PAGE_IDX } from '@/components/ui/PaginatedElements';
import { indexedBlogTagOptions, blogTagOptions } from '##/lib/builders/unifiedImport';
import { PopoverTrigger, PopoverContent, Popover } from '@/components/ui/Popover';
import { PlusCircledIcon, CheckIcon } from '@radix-ui/react-icons';
import { useCallback, useEffect, useState, useRef } from 'react';
import BUTTON_CONFIG from '@/components/config/styles/buttons';
import { useSearchParams, useRouter } from 'next/navigation';
import { createURLSearchParams } from '@rtm/shared-lib/html';
import { unpackIds, packIds } from '@rtm/shared-lib/misc';
import { Separator } from '@/components/ui/Separator';
import { getClientSideI18n } from '@/i18n/client';
import { Badge } from '@/components/ui/Badge';
import { capitalize } from '@/lib/str';
import { i18ns } from '##/config/i18n';
import { cn } from '@/lib/tailwind';

import { PAGE_KEY } from './PaginationWidget';

const FILTERS_KEY = 'tags';

export interface TagsFiltersWidgetProps {
  setSelectedTagsIds: (selectedTagsIds: number[]) => unknown;
  selectedTagsIds: number[];
  maxPagesAmount?: number;
  tags: BlogTag[];
}

const sortUnpackedIds = (unpacked: number[]) => unpacked.sort((a, b) => a - b);

/**
 * @throws {RangeError}
 */
export function getUnpackedAndSanitizedFilters(searchParams: URLSearchParams, filtersKey: string = FILTERS_KEY) {
  const packedIds: MaybeNull<string> = searchParams.get(filtersKey);
  if (packedIds === null) return [];

  const unpackedAndSanitizedFilters = sortUnpackedIds(
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    Array.from(new Set<number>(unpackIds(packedIds).filter((id) => 0 <= id && id < blogTagOptions.length)))
  );

  return unpackedAndSanitizedFilters;
}

const TagsFiltersWidget: FunctionComponent<TagsFiltersWidgetProps> = ({
  maxPagesAmount: maxPagesAmountValue,
  setSelectedTagsIds,
  selectedTagsIds,
  tags
}) => {
  const globalT = getClientSideI18n();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const maxPagesAmount = maxPagesAmountValue ?? MIN_PAGES_AMOUNT;

  const memorizedPageBeforeFiltering = useRef<number>(
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    selectedTagsIds.length !== 0 ? FIRST_PAGE_IDX : getSanitizedCurrentPage(searchParams, maxPagesAmount)
  );

  const firstLoad = useRef<boolean>(true);
  const cachedSelectedTags = useRef<MaybeNull<number[]>>(null);

  const title = capitalize(globalT(`${i18ns.vocab}.tags`));
  const noResultFound = globalT(`${i18ns.blogTagsFilters}.no-result-found`);
  const clearFilters = globalT(`${i18ns.blogTagsFilters}.clear-filters`);

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const disabled = tags.length < 1;
  const classNameBase = 'flex h-10 items-center rounded-md px-2 py-4';

  useEffect(() => {
    function unsafeCtxHandler() {
      try {
        const unpackedAndCleanedFilters = getUnpackedAndSanitizedFilters(searchParams);
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
  }, [router, searchParams, setSelectedTagsIds]);

  useEffect(() => {
    firstLoad.current = false;
  }, []);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (selectedTagsIds.length !== 0) return;
    memorizedPageBeforeFiltering.current = getSanitizedCurrentPage(searchParams, maxPagesAmount);
  }, [searchParams, selectedTagsIds, maxPagesAmount]);

  const updateRouterAndSetSelectedTags = useCallback(
    (selectedTagsIds: number[]) => {
      const newSelectedTags = sortUnpackedIds(selectedTagsIds);
      const packedIds = packIds(newSelectedTags);

      cachedSelectedTags.current = newSelectedTags;

      function handlePageResumeOnClearFiltersAndSkip(): boolean {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        if (newSelectedTags.length !== 0) return false;

        const pageId: MaybeNull<number> = memorizedPageBeforeFiltering.current === FIRST_PAGE_IDX ? null : memorizedPageBeforeFiltering.current;
        const q = createURLSearchParams({ [FILTERS_KEY]: null, [PAGE_KEY]: pageId });
        router.push(q, { scroll: false });
        memorizedPageBeforeFiltering.current = getSanitizedCurrentPage(searchParams, maxPagesAmount);
        return true;
      }

      if (handlePageResumeOnClearFiltersAndSkip()) return;

      const q = createURLSearchParams({ [FILTERS_KEY]: packedIds }, searchParams);
      router.push(q, { scroll: false });
    },
    [router, searchParams, maxPagesAmount]
  );

  const generateCommandItems = useCallback(
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
      <div className="hidden space-x-1 lg:flex">
        <Badge className="rounded-sm px-1 font-normal" variant="secondary">
          {selectedTagsIds.length}
        </Badge>
      </div>
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
            <CommandGroup>{generateCommandItems()}</CommandGroup>
            {/* eslint-disable-next-line @typescript-eslint/no-magic-numbers */}
            {selectedTagsIds.length > 0 && clearFiltersBtn}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TagsFiltersWidget;
