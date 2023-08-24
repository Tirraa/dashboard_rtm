import BlogConfig from '../_config/blog';
import { BlogCategory, BlogSlug } from '../_types/Blog';
import PostBase from '../_types/BlogPostAbstractions';
import { getLastPathStrPart } from './str';

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

export function getBlogPostCategoryBasedOnPostObj(post: PostBase) {
  const { sourceFileDir } = post._raw;
  return getLastPathStrPart(sourceFileDir);
}

export function getBlogPostCategoryAndSlugStr(post: PostBase) {
  return `${getBlogPostCategoryBasedOnPostObj(post)}/${getLastPathStrPart(post._raw.flattenedPath)}`;
}

export const getAllPostsByCateg = (categ: BlogCategory): PostBase[] => BlogConfig.allPostsTypesAssoc[categ]();

export function getPost(targettedSlug: BlogSlug, targettedCateg: '' | BlogCategory, postsCollection: PostBase[]): undefined | PostBase {
  if (targettedCateg === '') return undefined;
  return postsCollection.find((post) => getBlogPostCategoryAndSlugStr(post) === `${targettedCateg}/${targettedSlug}`);
}
