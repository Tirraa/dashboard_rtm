'use client';

import type { FunctionComponent } from 'react';

import { useSearchParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/tailwind';

import type { PaginationWidgetProps } from '../PaginationWidget';

import { buildWidgets } from './helpers/functions/toolbarInner';

export interface SubcategoryRelatedBlogPostsClientToolbarInnerProps extends PaginationWidgetProps {
  isBottomWidget?: boolean;
}

const SubcategoryRelatedBlogPostsClientToolbarInner: FunctionComponent<SubcategoryRelatedBlogPostsClientToolbarInnerProps> = ({
  isBottomWidget,
  currentPage,
  pagesAmount
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const widgets = buildWidgets(pagesAmount, currentPage, pathname, searchParams, isBottomWidget);

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (widgets.length <= 0) return null;

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const content = <div className="flex flex-col">{widgets}</div>;

  return (
    <nav
      className={cn('my-4 flex items-end justify-between', {
        'justify-end': isBottomWidget
      })}
    >
      {content}
    </nav>
  );
};

export default SubcategoryRelatedBlogPostsClientToolbarInner;
