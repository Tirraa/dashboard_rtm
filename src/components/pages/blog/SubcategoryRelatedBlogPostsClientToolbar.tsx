'use client';

import type { FunctionComponent } from 'react';

import type { TagsFiltersWidgetProps } from './TagsFiltersWidget';

import TagsFiltersWidget from './TagsFiltersWidget';
import PaginationWidget from './PaginationWidget';

interface SubcategoryRelatedBlogPostsClientToolbarProps extends TagsFiltersWidgetProps {}

const SubcategoryRelatedBlogPostsClientToolbar: FunctionComponent<SubcategoryRelatedBlogPostsClientToolbarProps> = ({
  setSelectedTagsIds,
  selectedTagsIds,
  tags
}) => (
  <div className="my-4 flex items-center justify-between">
    <TagsFiltersWidget setSelectedTagsIds={setSelectedTagsIds} selectedTagsIds={selectedTagsIds} tags={tags} />
    <PaginationWidget pagesAmount={2} />
  </div>
);

export default SubcategoryRelatedBlogPostsClientToolbar;
