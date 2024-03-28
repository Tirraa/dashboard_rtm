'use client';

import type { SubcategoryRelatedBlogPostsClientToolbarInnerProps } from '@/components/pages/blog/SubcategoryRelatedBlogPosts/toolbarInner';
import type { MaybeNull } from 'packages/shared-types/src/CustomUtilityTypes';
import type { FunctionComponent } from 'react';

import { useEffect, useState } from 'react';

interface SubcategoryRelatedBlogPostsClientToolbarProps extends SubcategoryRelatedBlogPostsClientToolbarInnerProps {}

// https://v3.gatsbyjs.com/docs/mdx/importing-and-using-components/#lazy-loading-components
const SubcategoryRelatedBlogPostsClientToolbar: FunctionComponent<SubcategoryRelatedBlogPostsClientToolbarProps> = (props) => {
  const placeholder = <div className="my-4 min-h-[40px]" />;
  const [Component, setComponent] = useState<MaybeNull<FunctionComponent<SubcategoryRelatedBlogPostsClientToolbarInnerProps>>>(null);
  useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    import('@/components/pages/blog/SubcategoryRelatedBlogPosts/toolbarInner').then((component) => setComponent(() => component.default));
  }, []);
  if (Component === null) return placeholder;
  return <Component {...props} />;
};
export default SubcategoryRelatedBlogPostsClientToolbar;