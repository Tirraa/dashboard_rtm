import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { Index } from '@rtm/shared-types/Numbers';
import type { UnknownBlogSlug } from '@/types/Blog';

import { throwIfForbiddenToUseIndexErrorBlogCtx, getPathWithIndexSuffix } from '../../../unifiedImport';

/**
 * @throws {InvalidArgumentsError}
 */
function buildBlogPostSlugFromStr(flattenedPath: string, sourceFilePath: string): UnknownBlogSlug {
  const slugBuilder = (flattenedPath: string, lastSlashIndex: Index): UnknownBlogSlug =>
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    flattenedPath.substring(lastSlashIndex + 1) as UnknownBlogSlug;

  const transformedFlattenedPath = getPathWithIndexSuffix(flattenedPath, sourceFilePath);
  const lastSlashIndexAfterTransform = transformedFlattenedPath.lastIndexOf('/');

  const slug = slugBuilder(transformedFlattenedPath, lastSlashIndexAfterTransform);
  return slug;
}

/**
 * @throws {ForbiddenToUseIndexError}
 */
function buildBlogPostSlugFromPostObj(post: DocumentToCompute): UnknownBlogSlug {
  const { sourceFilePath, flattenedPath } = post._raw;

  throwIfForbiddenToUseIndexErrorBlogCtx(sourceFilePath);
  const blogSlug = buildBlogPostSlugFromStr(flattenedPath, sourceFilePath);
  return blogSlug;
}

const buildBlogPostSlug = (post: DocumentToCompute): UnknownBlogSlug => buildBlogPostSlugFromPostObj(post);

export default buildBlogPostSlug;
