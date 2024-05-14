import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { BlogTag } from '##/config/contentlayer/blog/blogTags';
import type { FunctionComponent, MutableRefObject } from 'react';
import type { Id } from '@rtm/shared-types/Numbers';
import type { BlogTagId } from '@/types/Blog';

import { CommandSeparator, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, Command } from '@/components/ui/Command';
import { PopoverTrigger, PopoverContent, Popover } from '@/components/ui/Popover';
import { indexedBlogTagOptions } from '##/lib/builders/unifiedImport';
import { PlusCircledIcon, CheckIcon } from '@radix-ui/react-icons';
import { useCallback, useEffect, useState, useRef } from 'react';
import BUTTON_CONFIG from '@/components/config/styles/buttons';
import { Separator } from '@/components/ui/Separator';
import { getClientSideI18n } from '@/i18n/client';
import { useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { capitalize } from '@/lib/str';
import { i18ns } from '##/config/i18n';
import { cn } from '@/lib/tailwind';

import { ETagsSwitch } from './SubcategoryRelatedBlogPosts/helpers/enums';

export interface TagsCommandWidgetProps {
  memorizedPageBeforeFiltering: MutableRefObject<MaybeNull<Id>>;
  newSelectedTagsIds: MutableRefObject<MaybeNull<Id[]>>;
  setSelectedTagSwitch: (s: ETagsSwitch) => unknown;
  selectedTagsIds: BlogTagId[];
  tags: BlogTag[];
}

const classNameBase = 'flex h-10 items-center rounded-md px-2 py-4';

const TagsCommandWidget: FunctionComponent<TagsCommandWidgetProps> = ({
  memorizedPageBeforeFiltering,
  setSelectedTagSwitch,
  newSelectedTagsIds,
  selectedTagsIds,
  tags
}) => {
  const globalT = getClientSideI18n();
  const searchParams = useSearchParams();

  const [isOpened, setIsOpened] = useState<boolean>(false);
  const isOpenedRef = useRef<boolean>(isOpened);

  const title = capitalize(globalT(`${i18ns.vocab}.tags`));
  const noResultFound = globalT(`${i18ns.blogTagsFilters}.no-result-found`);
  const clearFilters = globalT(`${i18ns.blogTagsFilters}.clear-filters`);

  const buildCommandItems = useCallback(
    () =>
      tags.map((tag) => {
        const tagName = globalT(`${i18ns.blogTags}.${tag}`);
        const tagId = indexedBlogTagOptions[tag];
        const isSelected = selectedTagsIds.includes(tagId);

        const onSelect = () => {
          if (isSelected) {
            newSelectedTagsIds.current = selectedTagsIds.filter((id) => id !== tagId);
            // eslint-disable-next-line no-magic-numbers
            if (newSelectedTagsIds.current.length === 0) setSelectedTagSwitch(ETagsSwitch.CLEARING);
            else setSelectedTagSwitch(ETagsSwitch.UNSELECTING);
          } else {
            newSelectedTagsIds.current = [...selectedTagsIds, tagId];
            setSelectedTagSwitch(ETagsSwitch.SELECTING);
          }
        };

        return (
          <CommandItem onSelect={() => onSelect()} className="h-12 lg:h-8" key={`filter-${tag}`}>
            <div
              className={cn(
                'flex h-4 w-4 items-center justify-center rounded-sm border border-primary ltr:mr-2 rtl:ml-2',
                isSelected ? 'bg-primary text-primary-foreground' : '[&_svg]:invisible'
              )}
            >
              <CheckIcon className={cn('h-4 w-4')} />
            </div>
            <span>{tagName}</span>
          </CommandItem>
        );
      }),
    [globalT, selectedTagsIds, tags, setSelectedTagSwitch, newSelectedTagsIds]
  );

  useEffect(() => {
    isOpenedRef.current = isOpened;
  }, [isOpened]);

  useEffect(() => {
    function killswitchMemorizedPageBeforeFilteringOnPaginationWidgetClick() {
      // eslint-disable-next-line no-magic-numbers
      if (isOpenedRef.current || selectedTagsIds.length === 0) return;
      memorizedPageBeforeFiltering.current = null;
    }
    killswitchMemorizedPageBeforeFilteringOnPaginationWidgetClick();
  }, [searchParams, selectedTagsIds, memorizedPageBeforeFiltering]);

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
        <CommandItem
          onSelect={() => {
            newSelectedTagsIds.current = [];
            setSelectedTagSwitch(ETagsSwitch.CLEARING);
          }}
          className="justify-center text-center"
        >
          {clearFilters}
        </CommandItem>
      </CommandGroup>
    </>
  );

  return (
    <Popover onOpenChange={(_isOpened: boolean) => setIsOpened(_isOpened)} open={isOpened}>
      <PopoverTrigger asChild>
        <button
          className={cn(classNameBase, BUTTON_CONFIG.CLASSNAME, {
            [BUTTON_CONFIG.NOT_ACTIVE_CLASSNAME]: !isOpened,
            [BUTTON_CONFIG.ACTIVE_CLASSNAME]: isOpened
          })}
        >
          <PlusCircledIcon
            className={cn('h-5 w-5 transition-transform duration-300 ltr:mr-2 rtl:ml-2', { 'ltr:-rotate-45 rtl:rotate-45': isOpened })}
          />
          {title}
          {/* eslint-disable-next-line no-magic-numbers */}
          {selectedTagsIds.length > 0 && activeFiltersIndicator}
        </button>
      </PopoverTrigger>
      <PopoverContent className="z-20 w-[200px] p-0" align="start">
        <Command label={title}>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>{noResultFound}</CommandEmpty>
            <CommandGroup>{buildCommandItems()}</CommandGroup>
            {/* eslint-disable-next-line no-magic-numbers */}
            {selectedTagsIds.length > 0 && clearFiltersBtn}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TagsCommandWidget;
