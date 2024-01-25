import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { LanguageFlag } from '@rtm/shared-types/LanguageFlag';

import {
  throwIfForbiddenToUseIndexErrorBlogCtx,
  getFlattenedPathWithoutRootFolder,
  getPathWithoutExtension,
  indexOfNthOccurrence,
  BLOG_POSTS_FOLDER,
  DEFAULT_LANGUAGE,
  INDEX_TOKEN
} from '../../../unifiedImport';

function buildBlogPostLanguageFlagFromStr(path: string, sourceFilePath: string): LanguageFlag | string {
  const filepathWithoutExt = getPathWithoutExtension(sourceFilePath);
  const suffix = filepathWithoutExt.endsWith(INDEX_TOKEN) ? '/' + INDEX_TOKEN : '';
  const transformedPath = path + suffix;

  const envelopeBeginSlashIndex = indexOfNthOccurrence(transformedPath, '/', 2);
  const envelopeEndSlashIndex = indexOfNthOccurrence(transformedPath, '/', 3);

  if (envelopeBeginSlashIndex !== -1 && envelopeEndSlashIndex !== -1) {
    const language = transformedPath.substring(envelopeBeginSlashIndex + 1, envelopeEndSlashIndex);
    return language;
  }
  return DEFAULT_LANGUAGE;
}

function buildBlogPostLanguageFlag(post: DocumentToCompute): LanguageFlag | string {
  const { sourceFilePath, flattenedPath } = post._raw;

  throwIfForbiddenToUseIndexErrorBlogCtx(sourceFilePath);

  const path = getFlattenedPathWithoutRootFolder(flattenedPath, BLOG_POSTS_FOLDER);
  const language = buildBlogPostLanguageFlagFromStr(path, sourceFilePath);
  return language;
}

export default buildBlogPostLanguageFlag;
