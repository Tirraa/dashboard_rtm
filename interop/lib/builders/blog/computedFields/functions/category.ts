import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { BlogCategory } from '@/types/Blog';

import { getFlattenedPathWithoutRootFolder, InvalidArgumentsError, BLOG_POSTS_FOLDER } from '../../../unifiedImport';

/**
 * @throws {InvalidArgumentsError}
 */
function buildBlogPostCategoryFromStr(flattenedPath: string): BlogCategory {
  const categBuilder = (flattenedPath: string, firstSlashIndex: number): BlogCategory => flattenedPath.substring(0, firstSlashIndex) as BlogCategory;

  const firstSlashIndex = flattenedPath.indexOf('/');
  if (firstSlashIndex === -1) {
    throw new InvalidArgumentsError(buildBlogPostCategoryFromStr.name, { flattenedPath }, "Can't find any '/' character in flattenedPath");
  }

  const categ = categBuilder(flattenedPath, firstSlashIndex);
  return categ;
}

function buildBlogPostCategoryFromPostObj(post: DocumentToCompute): BlogCategory {
  const flattenedPath = getFlattenedPathWithoutRootFolder(post._raw.flattenedPath, BLOG_POSTS_FOLDER);
  return buildBlogPostCategoryFromStr(flattenedPath);
}

const buildBlogPostCategory = (post: DocumentToCompute): BlogCategory => buildBlogPostCategoryFromPostObj(post);

export default buildBlogPostCategory;
