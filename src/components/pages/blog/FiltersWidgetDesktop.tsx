'use client';

import type { JSPrimitives } from '@rtm/shared-types/CustomUtilityTypes';
import type { BlogTag } from '##/config/contentlayer/blog/blogTags';
import type { FunctionComponent } from 'react';

import { ToggleGroupItem, ToggleGroup } from '@/components/ui/ToggleGroup';
import { indexedBlogTagOptions } from '##/lib/builders/unifiedImport';
import { useSearchParams, useRouter } from 'next/navigation';
import { createURLSearchParams } from '@rtm/shared-lib/html';
import { useCallback, useEffect, useState } from 'react';
import { packIds } from '@rtm/shared-lib/misc';
import { useScopedI18n } from '@/i18n/client';
import { i18ns } from '##/config/i18n';

interface FiltersWidgetDesktopProps {
  tags: BlogTag[];
}

const FiltersWidgetDesktop: FunctionComponent<FiltersWidgetDesktopProps> = ({ tags }) => {
  const scopedT = useScopedI18n(i18ns.blogTags);
  const [selectedTagsIds, setSelectedTagsIds] = useState<number[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const packedFilters = packIds(selectedTagsIds);

    const newParams: Record<PropertyKey, JSPrimitives> = {};
    newParams.filters = packedFilters;

    const q = createURLSearchParams(newParams, searchParams);
    router.push(q, { scroll: false });
  }, [selectedTagsIds, router, searchParams]);

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
        variant="outline"
        type="multiple"
      >
        {toggleGroupItems}
      </ToggleGroup>
    );
  }, [scopedT, tags]);

  return <header className="my-2 flex flex-wrap items-center justify-start gap-2">{generateToggleGroup()}</header>;
};

export default FiltersWidgetDesktop;
