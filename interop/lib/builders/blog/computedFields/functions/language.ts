import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { LanguageFlag } from '@rtm/shared-types/LanguageFlag';

import {
  throwIfForbiddenToUseIndexErrorBlogCtx,
  getFlattenedPathWithoutRootFolder,
  getPathWithIndexSuffix,
  indexOfNthOccurrence,
  BLOG_POSTS_FOLDER,
  DEFAULT_LANGUAGE
} from '../../../unifiedImport';

function buildBlogPostLanguageFlagFromStr(path: string, sourceFilePath: string): LanguageFlag | string {
  const transformedPath = getPathWithIndexSuffix(path, sourceFilePath);

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const envelopeBeginSlashIndex = indexOfNthOccurrence(transformedPath, '/', 2);
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const envelopeEndSlashIndex = indexOfNthOccurrence(transformedPath, '/', 3);

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (envelopeBeginSlashIndex !== -1 && envelopeEndSlashIndex !== -1) {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
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
