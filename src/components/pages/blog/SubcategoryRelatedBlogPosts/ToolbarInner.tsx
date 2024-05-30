'use client';

import type { FunctionComponent, ReactElement } from 'react';
import type { Quantity } from '@rtm/shared-types/Numbers';

import { useSearchParams, usePathname } from 'next/navigation';
import cn from '@/lib/portable/tailwind/cn';

import type { FiltersSelectWidgetProps } from '../FiltersSelectWidget';
import type { TagsCommandWidgetProps } from '../TagsCommandWidget';
import type { PaginationWidgetProps } from '../PaginationWidget';

import { buildBottomRightWidgets, buildTopRightWidgets, buildTopLeftWidgets } from './helpers/functions/toolbarInner';

export interface SubcategoryRelatedBlogPostsClientToolbarInnerProps extends TagsCommandWidgetProps, PaginationWidgetProps, FiltersSelectWidgetProps {
  isBottomWidget?: boolean;
  postsAmount: Quantity;
}

const SubcategoryRelatedBlogPostsClientToolbarInner: FunctionComponent<SubcategoryRelatedBlogPostsClientToolbarInnerProps> = ({
  memorizedPageBeforeChoosingTags,
  setSelectedFilterSwitch,
  setSelectedTagSwitch,
  newSelectedTagsIds,
  newSelectedFilter,
  selectedTagsIds,
  isBottomWidget,
  selectedFilter,
  filtersAssoc,

  currentPage,
  pagesAmount,
  postsAmount,
  tags
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const leftWidgets: ReactElement[] = !isBottomWidget
    ? buildTopLeftWidgets({ memorizedPageBeforeChoosingTags, setSelectedTagSwitch, newSelectedTagsIds, selectedTagsIds, tags })
    : [];

  const rightWidgets = !isBottomWidget
    ? buildTopRightWidgets(
        { pagesAmount, postsAmount, currentPage },
        {
          setSelectedFilterSwitch,
          newSelectedFilter,
          selectedFilter,
          filtersAssoc
        }
      )
    : buildBottomRightWidgets(pathname, searchParams, { pagesAmount, currentPage });

  // eslint-disable-next-line no-magic-numbers
  if (rightWidgets.length + leftWidgets.length <= 0) return null;

  return (
    <nav
      className={cn('my-4 flex items-end justify-between', {
        // eslint-disable-next-line no-magic-numbers
        'justify-end': isBottomWidget || leftWidgets.length <= 0
      })}
    >
      {/* eslint-disable-next-line no-magic-numbers */}
      {leftWidgets.length > 0 && leftWidgets}
      {/* eslint-disable-next-line no-magic-numbers */}
      {rightWidgets.length > 0 && <div className="flex flex-col">{rightWidgets}</div>}
    </nav>
  );
};

export default SubcategoryRelatedBlogPostsClientToolbarInner;
