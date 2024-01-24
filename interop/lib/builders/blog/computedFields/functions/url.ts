import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { AppPath } from '@rtm/shared-types/Next';

import {
  getFlattenedPathWithoutRootFolder,
  ForbiddenToUseIndexError,
  getPathWithoutExtension,
  InvalidArgumentsError,
  indexOfNthOccurrence,
  BLOG_POSTS_FOLDER,
  DEFAULT_LANGUAGE,
  ROUTES_ROOTS,
  INDEX_TOKEN
} from '../../../unifiedImport';

function buildBlogPostUrl(post: DocumentToCompute): AppPath {
  const orgFlattenedPath = post._raw.flattenedPath;
  const filepath = post._raw.sourceFilePath;
  const filepathWithoutExt = getPathWithoutExtension(filepath);

  if (filepathWithoutExt.endsWith(INDEX_TOKEN) && indexOfNthOccurrence(orgFlattenedPath, '/', 2) === -1) {
    throw new ForbiddenToUseIndexError();
  }

  const OPTIONAL_LOCALE_PART_INDEX = 2;
  const root = ROUTES_ROOTS.BLOG;

  const flattenedPath = getFlattenedPathWithoutRootFolder(orgFlattenedPath, BLOG_POSTS_FOLDER);
  const flattenedPathParts = flattenedPath.split('/');

  if (filepathWithoutExt.endsWith(INDEX_TOKEN)) flattenedPathParts.push(INDEX_TOKEN);

  if (flattenedPathParts.length !== 3 && flattenedPathParts.length !== 4) {
    throw new InvalidArgumentsError(
      buildBlogPostUrl.name,
      { flattenedPath },
      `Invalid flattenedPath! Expected 3 or 4 parts, but got: ${flattenedPathParts.length}.`
    );
  }

  if (flattenedPathParts.length <= OPTIONAL_LOCALE_PART_INDEX + 1) {
    const url = '/' + DEFAULT_LANGUAGE + root + flattenedPathParts.join('/');
    return url;
  }

  const localePart = flattenedPathParts[OPTIONAL_LOCALE_PART_INDEX];
  flattenedPathParts.splice(OPTIONAL_LOCALE_PART_INDEX, 1);
  const url = '/' + localePart + root + flattenedPathParts.join('/');
  return url;
}

export default buildBlogPostUrl;
