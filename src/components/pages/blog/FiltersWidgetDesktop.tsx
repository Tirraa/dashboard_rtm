'use client';

import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { BlogTag } from '##/config/contentlayer/blog/blogTags';
import type { FunctionComponent } from 'react';

import { indexedBlogTagOptions, blogTagOptions } from '##/lib/builders/unifiedImport';
import { ToggleGroupItem, ToggleGroup } from '@/components/ui/ToggleGroup';
import { useSearchParams, useRouter } from 'next/navigation';
import { createURLSearchParams } from '@rtm/shared-lib/html';
import { unpackIds, packIds } from '@rtm/shared-lib/misc';
import { useCallback, useEffect, useRef } from 'react';
import { useScopedI18n } from '@/i18n/client';
import { i18ns } from '##/config/i18n';

const FILTERS_KEY = 'tags';

interface FiltersWidgetDesktopProps {
  setSelectedTagsIds: (selectedTagsIds: number[]) => unknown;
  selectedTagsIds: number[];
  tags: BlogTag[];
}

const sortUnpackedIds = (unpacked: number[]) => unpacked.sort((a, b) => a - b);

const FiltersWidgetDesktop: FunctionComponent<FiltersWidgetDesktopProps> = ({ setSelectedTagsIds, selectedTagsIds, tags }) => {
  const scopedT = useScopedI18n(i18ns.blogTags);
  const router = useRouter();
  const searchParams = useSearchParams();
  const firstLoad = useRef<boolean>(true);
  const cachedSelectedTags = useRef<MaybeNull<number[]>>(null);

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
    (selectedTags: BlogTag[]) => {
      const newSelectedTags = sortUnpackedIds(selectedTags.map((tag) => indexedBlogTagOptions[tag]));
      const packedIds = packIds(newSelectedTags);

      cachedSelectedTags.current = newSelectedTags;

      const q = createURLSearchParams({ [FILTERS_KEY]: packedIds }, searchParams);
      router.push(q, { scroll: false });
    },
    [router, searchParams]
  );

  const generateToggleGroup = useCallback(() => {
    const toggleGroupItems = tags.map((tag) => {
      const tagName = scopedT(tag);

      return (
        <ToggleGroupItem key={`filter-${tag}`} aria-label={tagName} value={tag}>
          {tagName}
        </ToggleGroupItem>
      );
    });

    return (
      <ToggleGroup
        onValueChange={(selectedTags: BlogTag[]) => updateRouterAndSetSelectedTags(selectedTags)}
        value={selectedTagsIds.map((id) => blogTagOptions[id])}
        variant="outline"
        type="multiple"
      >
        {toggleGroupItems}
      </ToggleGroup>
    );
  }, [scopedT, tags, selectedTagsIds, updateRouterAndSetSelectedTags]);

  return <header className="my-2 flex flex-wrap items-center justify-start gap-2">{generateToggleGroup()}</header>;
};

export default FiltersWidgetDesktop;
