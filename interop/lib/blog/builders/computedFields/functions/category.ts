import type { BlogCategory, PostBase } from '@/types/Blog';
import { InvalidArgumentsError, POSTS_FOLDER, getFlattenedPathWithoutRootFolder, indexOfNthOccurrence } from '../../../unifiedImport';

/**
 * @throws {InvalidArgumentsError}
 */
function buildBlogPostCategoryFromStr(flattenedPath: string): BlogCategory {
  const categBuilder = (flattenedPath: string, firstSlashIndex: number): BlogCategory => flattenedPath.substring(0, firstSlashIndex) as BlogCategory;

  const firstSlashIndex = indexOfNthOccurrence(flattenedPath, '/', 1);
  if (firstSlashIndex === -1) {
    throw new InvalidArgumentsError(buildBlogPostCategoryFromStr.name, { flattenedPath }, "Can't find any '/' character in flattenedPath");
  }

  const categ = categBuilder(flattenedPath, firstSlashIndex);
  return categ;
}

function buildBlogPostCategoryFromPostObj(post: PostBase): BlogCategory {
  const flattenedPath = getFlattenedPathWithoutRootFolder(post._raw.flattenedPath, POSTS_FOLDER);
  return buildBlogPostCategoryFromStr(flattenedPath);
}

export const buildBlogPostCategory = (post: PostBase): BlogCategory => buildBlogPostCategoryFromPostObj(post);

export default buildBlogPostCategory;
