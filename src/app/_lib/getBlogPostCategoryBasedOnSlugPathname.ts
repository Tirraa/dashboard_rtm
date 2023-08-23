export function getBlogPostCategoryBasedOnSlugPathname(pathname: string) {
  const parts = pathname.split('/');
  const folder = parts.length >= 2 ? parts[parts.length - 2] : '';
  return folder;
}

export default getBlogPostCategoryBasedOnSlugPathname;
