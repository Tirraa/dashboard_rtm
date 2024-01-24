import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { BlogCategory } from '@/types/Blog';

import {
  getFlattenedPathWithoutRootFolder,
  ForbiddenToUseIndexError,
  getPathWithoutExtension,
  InvalidArgumentsError,
  indexOfNthOccurrence,
  BLOG_POSTS_FOLDER,
  INDEX_TOKEN
} from '../../../unifiedImport';

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
  const orgFlattenedPath = post._raw.flattenedPath;
  const filepath = post._raw.sourceFilePath;
  const filepathWithoutExt = getPathWithoutExtension(filepath);

  if (filepathWithoutExt.endsWith(INDEX_TOKEN) && indexOfNthOccurrence(orgFlattenedPath, '/', 2) === -1) {
    throw new ForbiddenToUseIndexError();
  }

  const flattenedPath = getFlattenedPathWithoutRootFolder(orgFlattenedPath, BLOG_POSTS_FOLDER);
  return buildBlogPostCategoryFromStr(flattenedPath);
}

const buildBlogPostCategory = (post: DocumentToCompute): BlogCategory => buildBlogPostCategoryFromPostObj(post);

export default buildBlogPostCategory;
