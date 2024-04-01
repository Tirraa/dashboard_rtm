'use client';

import type { FunctionComponent } from 'react';

import { getSanitizedCurrentPage } from '@/components/ui/helpers/PaginatedElements/functions';
import { PAGE_KEY } from '@/components/ui/helpers/PaginatedElements/constants';
import { useSearchParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/tailwind';

import type { TagsFiltersWidgetProps } from '../TagsFiltersWidget';
import type { PaginationWidgetProps } from '../PaginationWidget';

import PaginationWidget, { buildDropdownForMobileAndBottom } from '../PaginationWidget';
import TagsFiltersWidget from '../TagsFiltersWidget';

export interface SubcategoryRelatedBlogPostsClientToolbarInnerProps extends TagsFiltersWidgetProps, PaginationWidgetProps {
  isBottomWidget?: boolean;
}

const SubcategoryRelatedBlogPostsClientToolbarInner: FunctionComponent<SubcategoryRelatedBlogPostsClientToolbarInnerProps> = ({
  setSelectedTagsIds,
  expectedTagsIds,
  selectedTagsIds,
  maxPagesAmount,
  isBottomWidget,
  pagesAmount,
  extraCtx,
  maxId,
  tags
}) => {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const disabledTagsFiltersWidget = tags.length < 1;

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const pageFromUrl = getSanitizedCurrentPage(searchParams, pagesAmount, PAGE_KEY);

  const extras =
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    pagesAmount <= 1 ? null : (
      <div>
        {(!isBottomWidget && <PaginationWidget pagesAmount={pagesAmount} />) ||
          buildDropdownForMobileAndBottom(pagesAmount, pageFromUrl, pathname, searchParams, isBottomWidget)}
      </div>
    );

  return (
    <nav
      className={cn('my-4 flex items-center justify-between', {
        'justify-end': isBottomWidget || disabledTagsFiltersWidget
      })}
    >
      {!isBottomWidget && !disabledTagsFiltersWidget && (
        <TagsFiltersWidget
          setSelectedTagsIds={setSelectedTagsIds}
          selectedTagsIds={selectedTagsIds}
          expectedTagsIds={expectedTagsIds}
          maxPagesAmount={maxPagesAmount}
          extraCtx={extraCtx}
          maxId={maxId}
          tags={tags}
        />
      )}

      {extras}
    </nav>
  );
};

export default SubcategoryRelatedBlogPostsClientToolbarInner;
