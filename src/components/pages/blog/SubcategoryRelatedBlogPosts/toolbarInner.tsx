'use client';

import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { FunctionComponent, ReactElement } from 'react';

import { useSearchParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/tailwind';

import type { PaginationWidgetProps } from '../PaginationWidget';

import PaginationWidget, { buildDropdownForMobileAndBottom } from '../PaginationWidget';

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

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const showPaginationWidget = pagesAmount > 1;

  function buildExtrasInner(): MaybeNull<ReactElement>[] {
    function buildForTop(): MaybeNull<ReactElement>[] {
      const elements: MaybeNull<ReactElement>[] = [];

      if (showPaginationWidget)
        elements.push(
          <PaginationWidget className="w-full justify-end" pagesAmount={pagesAmount} currentPage={currentPage} key="pagination-widget" />
        );

      return elements;
    }

    function buildForBottom(): MaybeNull<ReactElement>[] {
      const elements: MaybeNull<ReactElement>[] = [];

      if (showPaginationWidget) {
        elements.push(buildDropdownForMobileAndBottom(pagesAmount, currentPage, pathname, searchParams, isBottomWidget));
      }

      return elements;
    }

    const extrasInner = !isBottomWidget ? buildForTop() : buildForBottom();
    return extrasInner;
  }

  const extrasInner = buildExtrasInner();
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const extras = extrasInner.length > 0 ? <div className="flex flex-col">{extrasInner}</div> : null;

  return (
    <nav
      className={cn('my-4 flex items-end justify-between', {
        'justify-end': isBottomWidget
      })}
    >
      {extras}
    </nav>
  );
};

export default SubcategoryRelatedBlogPostsClientToolbarInner;
