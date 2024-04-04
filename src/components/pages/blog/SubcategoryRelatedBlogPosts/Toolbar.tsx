'use client';

import type { SubcategoryRelatedBlogPostsClientToolbarInnerProps } from '@/components/pages/blog/SubcategoryRelatedBlogPosts/ToolbarInner';
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { Quantity } from '@rtm/shared-types/Numbers';
import type { FunctionComponent } from 'react';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/tailwind';

import shouldShowPaginationWidget from './helpers/functions/shouldShowPaginationWidget';

interface SubcategoryRelatedBlogPostsClientToolbarProps extends SubcategoryRelatedBlogPostsClientToolbarInnerProps {}

function buildPlaceholder(isBottomWidget: boolean, pagesAmount: Quantity) {
  const margin = 'my-4';

  if (isBottomWidget) return <div className={cn(margin, 'min-h-[40px]')} />;
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (shouldShowPaginationWidget(pagesAmount)) return <div className={cn(margin, 'min-h-[84px]')} />;
  return <div className={cn(margin, 'min-h-[40px]')} />;
}

// https://v3.gatsbyjs.com/docs/mdx/importing-and-using-components/#lazy-loading-components
const SubcategoryRelatedBlogPostsClientToolbar: FunctionComponent<SubcategoryRelatedBlogPostsClientToolbarProps> = (props) => {
  const { isBottomWidget, pagesAmount } = props;
  const placeholder = buildPlaceholder(Boolean(isBottomWidget), pagesAmount);

  const [Component, setComponent] = useState<MaybeNull<FunctionComponent<SubcategoryRelatedBlogPostsClientToolbarInnerProps>>>(null);
  useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    import('@/components/pages/blog/SubcategoryRelatedBlogPosts/ToolbarInner').then((component) => setComponent(() => component.default));
  }, []);
  if (Component === null) return placeholder;
  return <Component {...props} />;
};
export default SubcategoryRelatedBlogPostsClientToolbar;
