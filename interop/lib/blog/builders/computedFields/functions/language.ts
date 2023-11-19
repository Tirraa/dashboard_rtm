import type { LanguageFlag } from '##/types/hell/etc/LanguageFlag';
import type { PostBase } from '@/types/Blog';
import isValidLanguageFlag from '../../../../../../src/lib/functions/i18n/isValidLanguageFlag';
import indexOfNthOccurrence from '../../../../../../src/lib/functions/str/indexOfNthOccurrence';
import { POSTS_FOLDER } from '../../../../../config/blog/documentSpecs';
import { DEFAULT_LANGUAGE } from '../../../../../config/i18n';
import { getFlattenedPathWithoutRootFolder } from '../getFlattenedPathWithoutRootFolder';

function buildBlogPostLanguageFlagFromStr(flattenedPath: string): LanguageFlag {
  const firstSlashIndex = indexOfNthOccurrence(flattenedPath, '/', 1);
  if (firstSlashIndex === -1) return DEFAULT_LANGUAGE;

  const envelopeBeginSlashIndex = indexOfNthOccurrence(flattenedPath, '/', 2);
  const envelopeEndSlashIndex = indexOfNthOccurrence(flattenedPath, '/', 3);

  if (envelopeBeginSlashIndex !== -1) {
    const langFlag =
      envelopeEndSlashIndex === -1
        ? flattenedPath.substring(envelopeBeginSlashIndex + 1)
        : flattenedPath.substring(envelopeBeginSlashIndex + 1, envelopeEndSlashIndex);
    if (isValidLanguageFlag(langFlag)) return langFlag as LanguageFlag;
  }
  return DEFAULT_LANGUAGE;
}

export function buildBlogPostLanguageFlag(post: PostBase): LanguageFlag {
  const flattenedPath = getFlattenedPathWithoutRootFolder(post._raw.flattenedPath, POSTS_FOLDER);
  const language = buildBlogPostLanguageFlagFromStr(flattenedPath);
  return language;
}

export default buildBlogPostLanguageFlag;
