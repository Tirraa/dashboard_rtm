import BlogConfig from '@/config/blog';
import { BlogSlug, BlogSubCategory } from '@/types/Blog';
import PostBase from '@/types/BlogPostAbstractions';
import { Pathname, PathnameSegment } from '@/types/DomainDefinitions';
import { getLastPathStrPart } from './str';

export function getBlogPostSubCategoryBasedOnPostObj(post: PostBase) {
  const { sourceFileDir } = post._raw;
  return getLastPathStrPart(sourceFileDir);
}

export function getBlogPostSubCategoryAndSlugStr(post: PostBase) {
  return `${getBlogPostSubCategoryBasedOnPostObj(post)}/${getLastPathStrPart(post._raw.flattenedPath)}`;
}

export const getAllPostsBySubCategory = (subCateg: BlogSubCategory): PostBase[] => BlogConfig.allPostsTypesAssoc[subCateg]();

export function getPost(targettedSlug: BlogSlug, targettedSubCateg: '' | BlogSubCategory): undefined | PostBase {
  if (targettedSubCateg === '') return undefined;
  const postsCollection: PostBase[] = getAllPostsBySubCategory(targettedSubCateg);
  return postsCollection.find((post) => getBlogPostSubCategoryAndSlugStr(post) === `${targettedSubCateg}/${targettedSlug}`);
}

export function getFirstPathnameSegment(pathname: Pathname): PathnameSegment {
  const firstIndex = pathname.indexOf('/');
  if (firstIndex === -1) return pathname;

  const secondIndex = pathname.indexOf('/', firstIndex + 1);

  if (secondIndex !== -1) return pathname.substring(firstIndex + 1, secondIndex);
  return pathname.substring(firstIndex + 1);
}
