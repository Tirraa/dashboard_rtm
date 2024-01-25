import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { BlogCategory } from '@/types/Blog';

import { throwIfForbiddenToUseIndexErrorBlogCtx, getFlattenedPathWithoutRootFolder, BLOG_POSTS_FOLDER } from '../../../unifiedImport';

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
  const { sourceFilePath, flattenedPath } = post._raw;

  throwIfForbiddenToUseIndexErrorBlogCtx(sourceFilePath);

  const path = getFlattenedPathWithoutRootFolder(flattenedPath, BLOG_POSTS_FOLDER);
  const blogPostCategory = buildBlogPostCategoryFromStr(path);
  return blogPostCategory;
}

const buildBlogPostCategory = (post: DocumentToCompute): BlogCategory => buildBlogPostCategoryFromPostObj(post);

export default buildBlogPostCategory;
