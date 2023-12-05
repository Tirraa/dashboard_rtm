import type { PostToBuild } from '##/types/magic/ContentlayerConfig';
import type { BlogSubcategoryFromUnknownCategory } from '@/types/Blog';
import { BLOG_POSTS_FOLDER, InvalidArgumentsError, getFlattenedPathWithoutRootFolder, indexOfNthOccurrence } from '../../../unifiedImport';

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

function buildBlogPostSubcategoryFromPostObj(post: PostToBuild): BlogSubcategoryFromUnknownCategory {
  const flattenedPath = getFlattenedPathWithoutRootFolder(post._raw.flattenedPath, BLOG_POSTS_FOLDER);
  return buildBlogPostSubcategoryFromStr(flattenedPath);
}

export const buildBlogPostSubcategory = (post: PostToBuild): BlogSubcategoryFromUnknownCategory => buildBlogPostSubcategoryFromPostObj(post);

export default buildBlogPostSubcategory;
