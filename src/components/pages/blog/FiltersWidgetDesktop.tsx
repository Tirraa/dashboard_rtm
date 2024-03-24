'use client';

import type { BlogTag } from '##/config/contentlayer/blog/blogTags';
import type { FunctionComponent } from 'react';

import { indexedBlogTagOptions, blogTagOptions } from '##/lib/builders/unifiedImport';
import { ToggleGroupItem, ToggleGroup } from '@/components/ui/ToggleGroup';
import { useSearchParams, useRouter } from 'next/navigation';
import { createURLSearchParams } from '@rtm/shared-lib/html';
import { unpackIds, packIds } from '@rtm/shared-lib/misc';
import { useCallback, useEffect, useState } from 'react';
import { useScopedI18n } from '@/i18n/client';
import { i18ns } from '##/config/i18n';

const FILTERS_KEY = 'tags';

interface FiltersWidgetDesktopProps {
  tags: BlogTag[];
}

const FiltersWidgetDesktop: FunctionComponent<FiltersWidgetDesktopProps> = ({ tags }) => {
  const scopedT = useScopedI18n(i18ns.blogTags);
  const [selectedTagsIds, setSelectedTagsIds] = useState<number[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const filters = packIds(selectedTagsIds);

    const q = createURLSearchParams({ [FILTERS_KEY]: filters }, searchParams);
    router.push(q, { scroll: false });
  }, [selectedTagsIds, router, searchParams]);

  useEffect(
    () => {
      try {
        const filters = searchParams.get(FILTERS_KEY);
        if (!filters) return;

        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        const unpackedAndCleanedFilters = Array.from(new Set<number>(unpackIds(filters).filter((id) => 0 <= id && id < blogTagOptions.length)));
        setSelectedTagsIds(unpackedAndCleanedFilters);

        const sanitizedFilters = packIds(unpackedAndCleanedFilters);
        const q = createURLSearchParams({ [FILTERS_KEY]: sanitizedFilters }, searchParams);
        router.replace(q, { scroll: false });
      } catch {
        const q = createURLSearchParams({ [FILTERS_KEY]: null }, searchParams);
        router.replace(q, { scroll: false });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
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
        onValueChange={(selectedTags: BlogTag[]) => setSelectedTagsIds(selectedTags.map((tag) => indexedBlogTagOptions[tag]))}
        value={selectedTagsIds.map((id) => blogTagOptions[id])}
        variant="outline"
        type="multiple"
      >
        {toggleGroupItems}
      </ToggleGroup>
    );
  }, [scopedT, tags, selectedTagsIds]);

  return <header className="my-2 flex flex-wrap items-center justify-start gap-2">{generateToggleGroup()}</header>;
};

export default FiltersWidgetDesktop;
