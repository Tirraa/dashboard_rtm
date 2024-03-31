'use client';

import type { FunctionComponent } from 'react';

import { cn } from '@/lib/tailwind';

import type { TagsFiltersWidgetProps } from '../TagsFiltersWidget';
import type { PaginationWidgetProps } from '../PaginationWidget';

import TagsFiltersWidget from '../TagsFiltersWidget';
import PaginationWidget from '../PaginationWidget';

export interface SubcategoryRelatedBlogPostsClientToolbarInnerProps extends TagsFiltersWidgetProps, PaginationWidgetProps {}

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

      <nav>
        <PaginationWidget isBottomWidget={isBottomWidget} pagesAmount={pagesAmount} />
      </nav>
    </nav>
  );
};

export default SubcategoryRelatedBlogPostsClientToolbarInner;
