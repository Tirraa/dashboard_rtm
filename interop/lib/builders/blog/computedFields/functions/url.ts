import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { AppPath } from '@rtm/shared-types/Next';

import {
  throwIfForbiddenToUseIndexErrorBlogCtx,
  getFlattenedPathWithoutRootFolder,
  getPathWithoutExtension,
  InvalidArgumentsError,
  BLOG_POSTS_FOLDER,
  DEFAULT_LANGUAGE,
  ROUTES_ROOTS,
  INDEX_TOKEN
} from '../../../unifiedImport';

/**
 * @throws {ForbiddenToUseIndexError}
 * @throws {InvalidArgumentsError}
 */
function buildBlogPostUrl(post: DocumentToCompute): AppPath {
  const { sourceFilePath, flattenedPath } = post._raw;

  throwIfForbiddenToUseIndexErrorBlogCtx(sourceFilePath);

  const filepathWithoutExt = getPathWithoutExtension(sourceFilePath);
  const OPTIONAL_LOCALE_PART_INDEX = 2;
  const root = ROUTES_ROOTS.BLOG;

  const path = getFlattenedPathWithoutRootFolder(flattenedPath, BLOG_POSTS_FOLDER);
  const pathParts = path.split('/');

  if (filepathWithoutExt.endsWith(INDEX_TOKEN)) pathParts.push(INDEX_TOKEN);

  // eslint-disable-next-line no-magic-numbers
  if (pathParts.length !== 3 && pathParts.length !== 4) {
    throw new InvalidArgumentsError(buildBlogPostUrl.name, { path }, 'Invalid path! Expected 3 or 4 parts, but got: ' + pathParts.length);
  }

  // eslint-disable-next-line no-magic-numbers
  if (pathParts.length <= OPTIONAL_LOCALE_PART_INDEX + 1) {
    const url = '/' + DEFAULT_LANGUAGE + root + pathParts.join('/');
    return url;
  }

  const localePart = pathParts[OPTIONAL_LOCALE_PART_INDEX];
  // eslint-disable-next-line no-magic-numbers
  pathParts.splice(OPTIONAL_LOCALE_PART_INDEX, 1);
  const url = '/' + localePart + root + pathParts.join('/');
  return url;
}

export default buildBlogPostUrl;
