import type { PostToBuild } from '@rtm/shared-types/ContentlayerConfig';
import type { BlogCategory } from '@/types/Blog';

import { getFlattenedPathWithoutRootFolder, InvalidArgumentsError, indexOfNthOccurrence, BLOG_POSTS_FOLDER } from '../../../unifiedImport';

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

function buildBlogPostCategoryFromPostObj(post: PostToBuild): BlogCategory {
  const flattenedPath = getFlattenedPathWithoutRootFolder(post._raw.flattenedPath, BLOG_POSTS_FOLDER);
  return buildBlogPostCategoryFromStr(flattenedPath);
}

const buildBlogPostCategory = (post: PostToBuild): BlogCategory => buildBlogPostCategoryFromPostObj(post);

export default buildBlogPostCategory;
