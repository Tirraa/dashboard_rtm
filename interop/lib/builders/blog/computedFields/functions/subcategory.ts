import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { BlogSubcategoryFromUnknownCategory } from '@/types/Blog';

import {
  getFlattenedPathWithoutRootFolder,
  throwIfForbiddenToUseIndexError,
  InvalidArgumentsError,
  indexOfNthOccurrence,
  BLOG_POSTS_FOLDER
} from '../../../unifiedImport';

/**
 * @throws {InvalidArgumentsError}
 */
function buildBlogPostSubcategoryFromStr(flattenedPath: string): BlogSubcategoryFromUnknownCategory {
  function subcategBuilder(flattenedPath: string, firstSlashIndex: number, secondSlashIndex: number): BlogSubcategoryFromUnknownCategory {
    if (secondSlashIndex !== -1) return flattenedPath.substring(firstSlashIndex + 1, secondSlashIndex) as BlogSubcategoryFromUnknownCategory;
    return flattenedPath.substring(firstSlashIndex + 1) as BlogSubcategoryFromUnknownCategory;
  }

  const firstSlashIndex = flattenedPath.indexOf('/');
  const secondSlashIndex = indexOfNthOccurrence(flattenedPath, '/', 2);
  const subcateg = subcategBuilder(flattenedPath, firstSlashIndex, secondSlashIndex);
  return subcateg;
}

/**
 * @throws {ForbiddenToUseIndexError}
 * @throws {InvalidArgumentsError}
 */
function buildBlogPostSubcategoryFromPostObj(post: DocumentToCompute): BlogSubcategoryFromUnknownCategory {
  const orgFlattenedPath = post._raw.flattenedPath;
  const filepath = post._raw.sourceFilePath;

  throwIfForbiddenToUseIndexError(filepath, orgFlattenedPath);

  if (indexOfNthOccurrence(filepath, '/', 5) !== -1) {
    throw new InvalidArgumentsError(
      buildBlogPostSubcategoryFromPostObj.name,
      { post: JSON.stringify(post, null, 2) },
      'The path is too deep to be a valid blog post path.'
    );
  }

  const flattenedPath = getFlattenedPathWithoutRootFolder(orgFlattenedPath, BLOG_POSTS_FOLDER);
  return buildBlogPostSubcategoryFromStr(flattenedPath);
}

const buildBlogPostSubcategory = (post: DocumentToCompute): BlogSubcategoryFromUnknownCategory => buildBlogPostSubcategoryFromPostObj(post);

export default buildBlogPostSubcategory;
