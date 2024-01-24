import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { LanguageFlag } from '@rtm/shared-types/LanguageFlag';

import {
  getFlattenedPathWithoutRootFolder,
  ForbiddenToUseIndexError,
  getPathWithoutExtension,
  indexOfNthOccurrence,
  BLOG_POSTS_FOLDER,
  DEFAULT_LANGUAGE,
  INDEX_TOKEN
} from '../../../unifiedImport';

function buildBlogPostLanguageFlagFromStr(flattenedPath: string, sourceFilePath: string): LanguageFlag | string {
  const filepathWithoutExt = getPathWithoutExtension(sourceFilePath);
  const suffix = filepathWithoutExt.endsWith(INDEX_TOKEN) ? '/' + INDEX_TOKEN : '';
  const transformedFlattenedPath = flattenedPath + suffix;

  const envelopeBeginSlashIndex = indexOfNthOccurrence(transformedFlattenedPath, '/', 2);
  const envelopeEndSlashIndex = indexOfNthOccurrence(transformedFlattenedPath, '/', 3);

  if (envelopeBeginSlashIndex !== -1 && envelopeEndSlashIndex !== -1) {
    const language = transformedFlattenedPath.substring(envelopeBeginSlashIndex + 1, envelopeEndSlashIndex);
    return language;
  }
  return DEFAULT_LANGUAGE;
}

function buildBlogPostLanguageFlag(post: DocumentToCompute): LanguageFlag | string {
  const sourceFilePath = post._raw.sourceFilePath;
  const orgFlattenedPath = post._raw.flattenedPath;

  const filepathWithoutExt = getPathWithoutExtension(sourceFilePath);
  if (filepathWithoutExt.endsWith(INDEX_TOKEN) && indexOfNthOccurrence(orgFlattenedPath, '/', 2) === -1) {
    throw new ForbiddenToUseIndexError();
  }

  const flattenedPath = getFlattenedPathWithoutRootFolder(orgFlattenedPath, BLOG_POSTS_FOLDER);
  const language = buildBlogPostLanguageFlagFromStr(flattenedPath, sourceFilePath);
  return language;
}

export default buildBlogPostLanguageFlag;
