'use client';

import type { FunctionComponent } from 'react';

import type { TagsFiltersWidgetProps } from './TagsFiltersWidget';
import type { PaginationWidgetProps } from './PaginationWidget';

import TagsFiltersWidget from './TagsFiltersWidget';
import PaginationWidget from './PaginationWidget';

interface SubcategoryRelatedBlogPostsClientToolbarProps extends TagsFiltersWidgetProps, PaginationWidgetProps {}

const SubcategoryRelatedBlogPostsClientToolbar: FunctionComponent<SubcategoryRelatedBlogPostsClientToolbarProps> = ({
  setSelectedTagsIds,
  selectedTagsIds,
  maxPagesAmount,
  pagesAmount,
  tags
}) => (
  <div className="my-4 flex items-center justify-between">
    <TagsFiltersWidget
      setSelectedTagsIds={setSelectedTagsIds}
      selectedTagsIds={selectedTagsIds}
      maxPagesAmount={maxPagesAmount}
      pagesAmount={pagesAmount}
      tags={tags}
    />
    <PaginationWidget pagesAmount={pagesAmount} />
  </div>
);

export default SubcategoryRelatedBlogPostsClientToolbar;
