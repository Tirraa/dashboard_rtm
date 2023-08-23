import { BlogCategory } from '../_types/BlogProps';

export function getBlogPostCategoryBasedOnCategPathname(pathname: string): '' | BlogCategory {
  const pathnameTokens = pathname.split('/');

  if (pathnameTokens.length > 1) return pathnameTokens[pathnameTokens.length - 1] as BlogCategory;
  return '';
}

export function getBlogPostCategoryBasedOnSlugPathname(pathname: string): '' | BlogCategory {
  const parts = pathname.split('/');
  const blogCategoryRetrievedByFolder = parts.length >= 2 ? parts[parts.length - 2] : '';
  return blogCategoryRetrievedByFolder as BlogCategory;
}
