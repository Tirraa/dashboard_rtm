import type { BlogSubcategoryFromUnknownCategory, PostBase } from '@/types/Blog';
import { InvalidArgumentsError, POSTS_FOLDER, getFlattenedPathWithoutRootFolder, indexOfNthOccurrence } from '../../../unifiedImport';

/**
 * @throws {InvalidArgumentsError}
 */
export function buildBlogPostSubcategoryFromStr(flattenedPath: string): BlogSubcategoryFromUnknownCategory {
  function subcategBuilder(flattenedPath: string, firstSlashIndex: number, secondSlashIndex: number): BlogSubcategoryFromUnknownCategory {
    if (secondSlashIndex !== -1) return flattenedPath.substring(firstSlashIndex + 1, secondSlashIndex) as BlogSubcategoryFromUnknownCategory;
    return flattenedPath.substring(firstSlashIndex + 1) as BlogSubcategoryFromUnknownCategory;
  }

  const firstSlashIndex = indexOfNthOccurrence(flattenedPath, '/', 1);
  if (firstSlashIndex === -1) {
    throw new InvalidArgumentsError(buildBlogPostSubcategoryFromStr.name, { flattenedPath }, "Can't find any '/' character in flattenedPath");
  }

  const secondSlashIndex = indexOfNthOccurrence(flattenedPath, '/', 2);
  const subcateg = subcategBuilder(flattenedPath, firstSlashIndex, secondSlashIndex);
  return subcateg;
}

function buildBlogPostSubcategoryFromPostObj(post: PostBase): BlogSubcategoryFromUnknownCategory {
  const flattenedPath = getFlattenedPathWithoutRootFolder(post._raw.flattenedPath, POSTS_FOLDER);
  return buildBlogPostSubcategoryFromStr(flattenedPath);
}

export const buildBlogPostSubcategory = (post: PostBase): BlogSubcategoryFromUnknownCategory => buildBlogPostSubcategoryFromPostObj(post);

export default buildBlogPostSubcategory;
