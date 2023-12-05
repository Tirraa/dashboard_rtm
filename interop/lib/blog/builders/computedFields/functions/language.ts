import type { LanguageFlag } from '##/types/LanguageFlag';
import type { PostToBuild } from '##/types/magic/ContentlayerConfig';
import {
  BLOG_POSTS_FOLDER,
  DEFAULT_LANGUAGE,
  getFlattenedPathWithoutRootFolder,
  indexOfNthOccurrence,
  isValidLanguageFlag
} from '../../../unifiedImport';

function buildBlogPostLanguageFlagFromStr(flattenedPath: string): LanguageFlag {
  const firstSlashIndex = indexOfNthOccurrence(flattenedPath, '/', 1);
  if (firstSlashIndex === -1) return DEFAULT_LANGUAGE;

  const envelopeBeginSlashIndex = indexOfNthOccurrence(flattenedPath, '/', 2);
  const envelopeEndSlashIndex = indexOfNthOccurrence(flattenedPath, '/', 3);

  if (envelopeBeginSlashIndex !== -1) {
    const language =
      envelopeEndSlashIndex === -1
        ? flattenedPath.substring(envelopeBeginSlashIndex + 1)
        : flattenedPath.substring(envelopeBeginSlashIndex + 1, envelopeEndSlashIndex);
    if (isValidLanguageFlag(language)) return language;
  }
  return DEFAULT_LANGUAGE;
}

export function buildBlogPostLanguageFlag(post: PostToBuild): LanguageFlag {
  const flattenedPath = getFlattenedPathWithoutRootFolder(post._raw.flattenedPath, BLOG_POSTS_FOLDER);
  const language = buildBlogPostLanguageFlagFromStr(flattenedPath);
  return language;
}

export default buildBlogPostLanguageFlag;
