'use client';

import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { BlogTag } from '##/config/contentlayer/blog/blogTags';
import type { FunctionComponent } from 'react';

import { CommandSeparator, CommandEmpty, CommandGroup, CommandInput, CommandList, CommandItem, Command } from '@/components/ui/Command';
import { indexedBlogTagOptions, blogTagOptions } from '##/lib/builders/unifiedImport';
import { PopoverTrigger, PopoverContent, Popover } from '@/components/ui/Popover';
import { useCallback, useEffect, Fragment, useState, useRef } from 'react';
import { PlusCircledIcon, CheckIcon } from '@radix-ui/react-icons';
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

const FILTERS_KEY = 'tags';

interface TagsFiltersWidgetProps {
  setSelectedTagsIds: (selectedTagsIds: number[]) => unknown;
  selectedTagsIds: number[];
  tags: BlogTag[];
}

// {ToDo} Update cmdk when this issue will be fixed https://github.com/shadcn-ui/ui/issues/3127

const sortUnpackedIds = (unpacked: number[]) => unpacked.sort((a, b) => a - b);

const TagsFiltersWidget: FunctionComponent<TagsFiltersWidgetProps> = ({ setSelectedTagsIds, selectedTagsIds, tags }) => {
  const globalT = getClientSideI18n();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const firstLoad = useRef<boolean>(true);
  const cachedSelectedTags = useRef<MaybeNull<number[]>>(null);

  const title = capitalize(globalT(`${i18ns.vocab}.tags`));
  const noResultFound = globalT(`${i18ns.blogTagsFilters}.no-result-found`);
  const clearFilters = globalT(`${i18ns.blogTagsFilters}.clear-filters`);

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const disabled = tags.length <= 1;
  const classNameBase = 'my-4 flex h-8 items-center rounded-md px-2 py-4';

  useEffect(() => {
    function unsafeCtxHandler() {
      try {
        const packedIds = searchParams.get(FILTERS_KEY);
        if (!packedIds) {
          setSelectedTagsIds([]);
          return;
        }

        const unpackedAndCleanedFilters = sortUnpackedIds(
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          Array.from(new Set<number>(unpackIds(packedIds).filter((id) => 0 <= id && id < blogTagOptions.length)))
        );
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

  const updateRouterAndSetSelectedTags = useCallback(
    (selectedTagsIds: number[]) => {
      const newSelectedTags = sortUnpackedIds(selectedTagsIds);
      const packedIds = packIds(newSelectedTags);

      cachedSelectedTags.current = newSelectedTags;

      const q = createURLSearchParams({ [FILTERS_KEY]: packedIds }, searchParams);
      router.push(q, { scroll: false });
    },
    [router, searchParams]
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
      <div
        className={cn(classNameBase, 'select-none text-inherit text-opacity-75 dark:text-muted-foreground dark:text-opacity-100')}
        aria-disabled="true"
        role="button"
      >
        <PlusCircledIcon className="mr-2 h-5 w-5" />
        {title}
      </div>
    );

  return (
    <Popover onOpenChange={(isOpen: boolean) => setIsOpened(isOpen)} open={isOpened}>
      <PopoverTrigger asChild>
        <button className={cn(classNameBase, BUTTON_CONFIG.NOT_ACTIVE_CLASSNAME)}>
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
