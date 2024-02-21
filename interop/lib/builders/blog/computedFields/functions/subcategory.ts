import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { BlogSubcategoryFromUnknownCategory } from '@/types/Blog';

import {
  throwIfForbiddenToUseIndexErrorBlogCtx,
  getFlattenedPathWithoutRootFolder,
  InvalidArgumentsError,
  indexOfNthOccurrence,
  BLOG_POSTS_FOLDER
} from '../../../unifiedImport';

/**
 * @throws {InvalidArgumentsError}
 */
function buildBlogPostSubcategoryFromStr(path: string): BlogSubcategoryFromUnknownCategory {
  function subcategBuilder(path: string, firstSlashIndex: number, secondSlashIndex: number): BlogSubcategoryFromUnknownCategory {
    // eslint-disable-next-line no-magic-numbers
    if (secondSlashIndex !== -1) return path.substring(firstSlashIndex + 1, secondSlashIndex) as BlogSubcategoryFromUnknownCategory;
    // eslint-disable-next-line no-magic-numbers
    return path.substring(firstSlashIndex + 1) as BlogSubcategoryFromUnknownCategory;
  }

  const firstSlashIndex = path.indexOf('/');
  // eslint-disable-next-line no-magic-numbers
  const secondSlashIndex = indexOfNthOccurrence(path, '/', 2);
  const subcateg = subcategBuilder(path, firstSlashIndex, secondSlashIndex);
  return subcateg;
}

/**
 * @throws {ForbiddenToUseIndexError}
 * @throws {InvalidArgumentsError}
 */
function buildBlogPostSubcategoryFromPostObj(post: DocumentToCompute): BlogSubcategoryFromUnknownCategory {
  const { sourceFilePath, flattenedPath } = post._raw;

  throwIfForbiddenToUseIndexErrorBlogCtx(sourceFilePath);

  // eslint-disable-next-line no-magic-numbers
  if (indexOfNthOccurrence(sourceFilePath, '/', 5) !== -1) {
    throw new InvalidArgumentsError(
      buildBlogPostSubcategoryFromPostObj.name,
      // eslint-disable-next-line no-magic-numbers
      { post: JSON.stringify(post, null, 2) },
      'The path is too deep to be a valid blog post path.'
    );
  }

  const path = getFlattenedPathWithoutRootFolder(flattenedPath, BLOG_POSTS_FOLDER);
  const blogPostSubcategory = buildBlogPostSubcategoryFromStr(path);
  return blogPostSubcategory;
}

const buildBlogPostSubcategory = (post: DocumentToCompute): BlogSubcategoryFromUnknownCategory => buildBlogPostSubcategoryFromPostObj(post);

export default buildBlogPostSubcategory;
