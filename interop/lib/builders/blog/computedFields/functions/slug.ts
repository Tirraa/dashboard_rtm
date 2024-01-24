import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { UnknownBlogSlug } from '@/types/Blog';

import { ForbiddenToUseIndexError, getPathWithoutExtension, indexOfNthOccurrence, INDEX_TOKEN } from '../../../unifiedImport';

/**
 * @throws {InvalidArgumentsError}
 */
function buildBlogPostSlugFromStr(flattenedPath: string, sourceFilePath: string): UnknownBlogSlug {
  const slugBuilder = (flattenedPath: string, lastSlashIndex: number): UnknownBlogSlug =>
    flattenedPath.substring(lastSlashIndex + 1) as UnknownBlogSlug;

  const filepathWithoutExt = getPathWithoutExtension(sourceFilePath);
  const suffix = filepathWithoutExt.endsWith(INDEX_TOKEN) ? '/' + INDEX_TOKEN : '';

  const transformedFlattenedPath = flattenedPath + suffix;
  const lastSlashIndexAfterTransform = transformedFlattenedPath.lastIndexOf('/');

  const slug = slugBuilder(flattenedPath + suffix, lastSlashIndexAfterTransform);
  return slug;
}

function buildBlogPostSlugFromPostObj(post: DocumentToCompute): UnknownBlogSlug {
  const { sourceFilePath, flattenedPath } = post._raw;
  const filepathWithoutExt = getPathWithoutExtension(sourceFilePath);

  if (filepathWithoutExt.endsWith(INDEX_TOKEN) && indexOfNthOccurrence(flattenedPath, '/', 2) === -1) {
    throw new ForbiddenToUseIndexError();
  }

  return buildBlogPostSlugFromStr(flattenedPath, sourceFilePath);
}

const buildBlogPostSlug = (post: DocumentToCompute): UnknownBlogSlug => buildBlogPostSlugFromPostObj(post);

export default buildBlogPostSlug;
