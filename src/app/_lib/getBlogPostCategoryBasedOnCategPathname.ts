export function getBlogPostCategoryBasedOnCategPathname(pathname: string): '' | string {
  const parts = pathname.split('/');

  if (parts.length > 1) return parts[parts.length - 1];
  return '';
}

export default getBlogPostCategoryBasedOnCategPathname;
