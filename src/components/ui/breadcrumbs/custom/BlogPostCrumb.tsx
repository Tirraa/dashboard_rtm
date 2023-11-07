'use client';

import { useCurrentLocale } from '@/i18n/client';
import { getBlogPostUnstrict } from '@/lib/blog';
import { getPathParts } from '@/lib/next';
import type { BlogCategory, BlogSubcategoryFromUnknownCategory, UnknownBlogSlug } from '@/types/Blog';
import { usePathname } from 'next/navigation';
import type { FunctionComponent } from 'react';
import Crumb from '../Crumb';

interface BlogPostCrumbProps {}

const BlogPostCrumb: FunctionComponent<BlogPostCrumbProps> = () => {
  const pathname = usePathname();
  const pathParts = getPathParts(pathname);
  const locale = useCurrentLocale();

  const category = pathParts[0] as BlogCategory;
  const subcategory = pathParts[1] as BlogSubcategoryFromUnknownCategory;
  const targettedSlug = pathParts[2] as UnknownBlogSlug;
  const post = getBlogPostUnstrict({ category, subcategory }, targettedSlug, locale);

  const res = post ? <Crumb label={post.title} isLeaf /> : null;
  return res;
};

export default BlogPostCrumb;
