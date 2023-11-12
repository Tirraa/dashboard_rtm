import type { LanguageFlag } from '##/types/hell/app-agnostic/LanguageFlag';
import type { PostBase } from '@/types/Blog';
import isValidLanguageFlag from '../../../../src/lib/app-agnostic/i18n/isValidLanguageFlag';
import indexOfNthOccurrence from '../../../../src/lib/app-agnostic/str/indexOfNthOccurrence';
import { DEFAULT_LANGUAGE } from '../../../config/i18n';

function buildBlogPostLanguageFlagFromStr(sourceFileDir: string): LanguageFlag {
  const firstSlashIndex = indexOfNthOccurrence(sourceFileDir, '/', 1);
  if (firstSlashIndex === -1) return DEFAULT_LANGUAGE;

  const envelopeBeginSlashIndex = indexOfNthOccurrence(sourceFileDir, '/', 2);
  const envelopeEndSlashIndex = indexOfNthOccurrence(sourceFileDir, '/', 3);

  if (envelopeBeginSlashIndex !== -1) {
    const langFlag =
      envelopeEndSlashIndex === -1
        ? sourceFileDir.substring(envelopeBeginSlashIndex + 1)
        : sourceFileDir.substring(envelopeBeginSlashIndex + 1, envelopeEndSlashIndex);
    if (isValidLanguageFlag(langFlag)) return langFlag as LanguageFlag;
  }
  return DEFAULT_LANGUAGE;
}

export function buildBlogPostLanguageFlag(post: PostBase): LanguageFlag {
  const { sourceFileDir } = post._raw;
  return buildBlogPostLanguageFlagFromStr(sourceFileDir);
}

export default buildBlogPostLanguageFlag;
