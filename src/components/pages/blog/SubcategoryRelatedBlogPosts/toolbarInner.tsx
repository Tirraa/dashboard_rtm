'use client';

import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { FunctionComponent, ReactElement } from 'react';
import type { Quantity } from '@rtm/shared-types/Numbers';

import { getSanitizedCurrentPage } from '@/components/ui/helpers/PaginatedElements/functions';
import { PAGE_KEY } from '@/components/ui/helpers/PaginatedElements/constants';
import { useSearchParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/tailwind';

import type { TagsFiltersWidgetProps } from '../TagsFiltersWidget';
import type { PaginationWidgetProps } from '../PaginationWidget';

import PaginationWidget, { buildDropdownForMobileAndBottom } from '../PaginationWidget';
import FiltersSelectWidget from '../FiltersSelectWidget';
import TagsFiltersWidget from '../TagsFiltersWidget';

export interface SubcategoryRelatedBlogPostsClientToolbarInnerProps extends TagsFiltersWidgetProps, PaginationWidgetProps {
  isBottomWidget?: boolean;
  postsAmount: Quantity;
}

const SubcategoryRelatedBlogPostsClientToolbarInner: FunctionComponent<SubcategoryRelatedBlogPostsClientToolbarInnerProps> = ({
  setSelectedTagsIds,
  expectedTagsIds,
  selectedTagsIds,
  maxPagesAmount,
  isBottomWidget,
  postsAmount,
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

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const showPaginationWidget = pagesAmount > 1;
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const showFiltersSelectWidget = postsAmount > 1;

  function buildExtrasInner(): MaybeNull<ReactElement>[] {
    function buildForTop(): MaybeNull<ReactElement>[] {
      const elements: MaybeNull<ReactElement>[] = [];

      if (showFiltersSelectWidget) elements.push(<FiltersSelectWidget triggerClassName="z-20 mb-1 self-end" key="filters-widget" />);
      if (showPaginationWidget) elements.push(<PaginationWidget className="w-full justify-end" pagesAmount={pagesAmount} key="pagination-widget" />);

      return elements;
    }

    function buildForBottom(): MaybeNull<ReactElement>[] {
      const elements: MaybeNull<ReactElement>[] = [];

      if (showPaginationWidget) {
        elements.push(buildDropdownForMobileAndBottom(pagesAmount, pageFromUrl, pathname, searchParams, isBottomWidget));
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
