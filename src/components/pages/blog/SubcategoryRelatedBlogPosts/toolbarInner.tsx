'use client';

import type { FunctionComponent } from 'react';

import type { TagsFiltersWidgetProps } from '../TagsFiltersWidget';
import type { PaginationWidgetProps } from '../PaginationWidget';

import TagsFiltersWidget from '../TagsFiltersWidget';
import PaginationWidget from '../PaginationWidget';

export interface SubcategoryRelatedBlogPostsClientToolbarInnerProps extends TagsFiltersWidgetProps, PaginationWidgetProps {}

const SubcategoryRelatedBlogPostsClientToolbarInner: FunctionComponent<SubcategoryRelatedBlogPostsClientToolbarInnerProps> = ({
  memorizedPageBeforeFiltering,
  setSelectedTagsIds,
  expectedTagsIds,
  selectedTagsIds,
  maxPagesAmount,
  pagesAmount,
  maxId,
  tags
}) => (
  <div className="my-4 flex items-center justify-between">
    <TagsFiltersWidget
      memorizedPageBeforeFiltering={memorizedPageBeforeFiltering}
      setSelectedTagsIds={setSelectedTagsIds}
      selectedTagsIds={selectedTagsIds}
      expectedTagsIds={expectedTagsIds}
      maxPagesAmount={maxPagesAmount}
      maxId={maxId}
      tags={tags}
    />
    <PaginationWidget pagesAmount={pagesAmount} />
  </div>
);

export default SubcategoryRelatedBlogPostsClientToolbarInner;
