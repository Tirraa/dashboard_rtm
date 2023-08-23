export function getBlogPostCategoryBasedOnCategPathname(pathname: string): '' | string {
  const parts = pathname.split('/');

  if (parts.length > 1) return parts[parts.length - 1];
  return '';
}

export function getBlogPostCategoryBasedOnSlugPathname(pathname: string) {
  const parts = pathname.split('/');
  const folder = parts.length >= 2 ? parts[parts.length - 2] : '';
  return folder;
}
