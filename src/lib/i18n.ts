import { ELanguageFlag, LanguageFlag } from '@/config/i18n';
import PostBase from '@/types/BlogPostAbstractions';
import { Pathname } from '@/types/Next';
import { gsub, indexOfNthOccurrence } from './str';

// {ToDo} Implement this
export function getCurrentLanguageFlag(): '' | LanguageFlag {
  return '';
}

const isValidLanguageFlag = (value: string): boolean => value in ELanguageFlag;

function getBlogPostLanguageFlagFromStr(sourceFileDir: string): '' | LanguageFlag {
  const firstSlashIndex = indexOfNthOccurrence(sourceFileDir, '/', 1);
  if (firstSlashIndex === -1) {
    return '';
  }

  const envelopeBeginSlashIndex = indexOfNthOccurrence(sourceFileDir, '/', 2);
  const envelopeEndSlashIndex = indexOfNthOccurrence(sourceFileDir, '/', 3);

  if (envelopeBeginSlashIndex !== -1) {
    const langFlag =
      envelopeEndSlashIndex === -1
        ? sourceFileDir.substring(envelopeBeginSlashIndex + 1)
        : sourceFileDir.substring(envelopeBeginSlashIndex + 1, envelopeEndSlashIndex);
    if (isValidLanguageFlag(langFlag)) return langFlag as LanguageFlag;
  }
  return '';
}

function getBlogPostLanguageFlagFromPostObj(post: PostBase): '' | LanguageFlag {
  const { sourceFileDir } = post._raw;
  return getBlogPostLanguageFlagFromStr(sourceFileDir);
}

export function getBlogPostAbsolutePath(post: PostBase): Pathname {
  const langFlag = getBlogPostLanguageFlagFromPostObj(post);
  if (langFlag === '') return post.url;
  return gsub(post.url, `/${langFlag}/`, '/');
}

export const getBlogPostLanguageFlag = (post: PostBase): '' | LanguageFlag => getBlogPostLanguageFlagFromPostObj(post);
