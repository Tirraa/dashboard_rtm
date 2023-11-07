'use client';

import { useCurrentLocale } from '@/i18n/client';
import { getBlogPostUnstrict } from '@/lib/blog';
import { getPathnameWithoutI18nFlag } from '@/lib/i18n';
import { getPathParts } from '@/lib/next';
import type { BlogCategory, BlogSubcategoryFromUnknownCategory, UnknownBlogSlug } from '@/types/Blog';
import { usePathname } from 'next/navigation';
import type { FunctionComponent } from 'react';
import Crumb from '../Crumb';

interface BlogPostCrumbProps {}

const BlogPostCrumb: FunctionComponent<BlogPostCrumbProps> = () => {
  const pathname = usePathname();
  const locale = useCurrentLocale();

  const pathParts = getPathParts(pathname);
  const href = getPathnameWithoutI18nFlag(pathname);

  const [category, subcategory, targettedSlug] = [
    pathParts[0] as BlogCategory,
    pathParts[1] as BlogSubcategoryFromUnknownCategory,
    pathParts[2] as UnknownBlogSlug
  ];

  const post = getBlogPostUnstrict({ category, subcategory }, targettedSlug, locale);
  const crumb = post ? <Crumb label={post.title} href={href} isLeaf /> : <Crumb label={targettedSlug} href={href} isLeaf withRescueCtx />;
  return crumb;
};

export default BlogPostCrumb;
