import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { BlogCategory } from '@/types/Blog';

import { getFlattenedPathWithoutRootFolder, throwIfForbiddenToUseIndexError, BLOG_POSTS_FOLDER } from '../../../unifiedImport';

/**
 * @throws {InvalidArgumentsError}
 */
function buildBlogPostCategoryFromStr(flattenedPath: string): BlogCategory {
  const categBuilder = (flattenedPath: string, firstSlashIndex: number): BlogCategory => flattenedPath.substring(0, firstSlashIndex) as BlogCategory;

  const firstSlashIndex = flattenedPath.indexOf('/');
  const categ = categBuilder(flattenedPath, firstSlashIndex);
  return categ;
}

/**
 * @throws {ForbiddenToUseIndexError}
 */
function buildBlogPostCategoryFromPostObj(post: DocumentToCompute): BlogCategory {
  const orgFlattenedPath = post._raw.flattenedPath;
  const filepath = post._raw.sourceFilePath;

  throwIfForbiddenToUseIndexError(filepath, orgFlattenedPath);

  const flattenedPath = getFlattenedPathWithoutRootFolder(orgFlattenedPath, BLOG_POSTS_FOLDER);
  return buildBlogPostCategoryFromStr(flattenedPath);
}

const buildBlogPostCategory = (post: DocumentToCompute): BlogCategory => buildBlogPostCategoryFromPostObj(post);

export default buildBlogPostCategory;
