'use client';

import type { Quantity } from '@rtm/shared-types/Numbers';
import type { FunctionComponent } from 'react';

import { useSearchParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/tailwind';

import type { FiltersSelectWidgetProps } from '../FiltersSelectWidget';
import type { PaginationWidgetProps } from '../PaginationWidget';

import { buildBottomRightWidgets, buildTopRightWidgets } from './helpers/functions/toolbarInner';

export interface SubcategoryRelatedBlogPostsClientToolbarInnerProps extends PaginationWidgetProps, FiltersSelectWidgetProps {
  isBottomWidget?: boolean;
  postsAmount: Quantity;
}

const SubcategoryRelatedBlogPostsClientToolbarInner: FunctionComponent<SubcategoryRelatedBlogPostsClientToolbarInnerProps> = ({
  setSelectedFilterSwitch,
  newSelectedFilter,
  isBottomWidget,
  selectedFilter,
  filtersAssoc,
  currentPage,
  pagesAmount,
  postsAmount
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

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

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (rightWidgets.length <= 0) return null;

  return (
    <nav
      className={cn('my-4 flex items-end justify-between', {
        'justify-end': isBottomWidget
      })}
    >
      <div className="flex flex-col">{rightWidgets}</div>
    </nav>
  );
};

export default SubcategoryRelatedBlogPostsClientToolbarInner;
