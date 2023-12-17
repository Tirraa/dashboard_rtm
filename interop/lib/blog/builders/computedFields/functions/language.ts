import type { PostToBuild } from '@rtm/shared-types/ContentlayerConfig';
import type { LanguageFlag } from '@rtm/shared-types/LanguageFlag';

import { getFlattenedPathWithoutRootFolder, indexOfNthOccurrence, BLOG_POSTS_FOLDER, DEFAULT_LANGUAGE } from '../../../unifiedImport';

function buildBlogPostLanguageFlagFromStr(flattenedPath: string): LanguageFlag | string {
  const firstSlashIndex = indexOfNthOccurrence(flattenedPath, '/', 1);
  if (firstSlashIndex === -1) return DEFAULT_LANGUAGE;

  const envelopeBeginSlashIndex = indexOfNthOccurrence(flattenedPath, '/', 2);
  const envelopeEndSlashIndex = indexOfNthOccurrence(flattenedPath, '/', 3);

  if (envelopeBeginSlashIndex !== -1 && envelopeEndSlashIndex !== -1) {
    const language = flattenedPath.substring(envelopeBeginSlashIndex + 1, envelopeEndSlashIndex);
    return language;
  }
  return DEFAULT_LANGUAGE;
}

function buildBlogPostLanguageFlag(post: PostToBuild): LanguageFlag | string {
  const flattenedPath = getFlattenedPathWithoutRootFolder(post._raw.flattenedPath, BLOG_POSTS_FOLDER);
  const language = buildBlogPostLanguageFlagFromStr(flattenedPath);
  return language;
}

export default buildBlogPostLanguageFlag;
