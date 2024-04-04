'use client';

import type { Quantity } from '@rtm/shared-types/Numbers';
import type { FunctionComponent } from 'react';

import { useSearchParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/tailwind';

import type { FiltersSelectWidgetProps } from '../FiltersSelectWidget';
import type { PaginationWidgetProps } from '../PaginationWidget';

import { buildWidgets } from './helpers/functions/toolbarInner';

export interface SubcategoryRelatedBlogPostsClientToolbarInnerProps extends PaginationWidgetProps, FiltersSelectWidgetProps {
  isBottomWidget?: boolean;
  postsAmount: Quantity;
}

const SubcategoryRelatedBlogPostsClientToolbarInner: FunctionComponent<SubcategoryRelatedBlogPostsClientToolbarInnerProps> = ({
  setSelectedFilterSwitch,
  setSelectedFilter,
  isBottomWidget,
  selectedFilter,
  filtersAssoc,
  currentPage,
  pagesAmount,
  postsAmount
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const widgets = buildWidgets(
    pagesAmount,
    postsAmount,
    currentPage,
    pathname,
    searchParams,
    {
      setSelectedFilterSwitch,
      setSelectedFilter,
      selectedFilter,
      filtersAssoc
    },
    isBottomWidget
  );

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (widgets.length <= 0) return null;

  return (
    <nav
      className={cn('my-4 flex items-end justify-between', {
        'justify-end': isBottomWidget
      })}
    >
      <div className="flex flex-col">{widgets}</div>
    </nav>
  );
};

export default SubcategoryRelatedBlogPostsClientToolbarInner;
