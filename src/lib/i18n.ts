import { fallbackLng as DEFAULT_LANGUAGE } from '@/app/i18n/settings';
import { ELanguageFlag, LanguageFlag } from '@/config/i18n';
import PostBase from '@/types/BlogPostAbstractions';
import { Pathname } from '@/types/Next';
import { gsub, indexOfNthOccurrence } from './str';

const isValidLanguageFlag = (value: string): boolean => value in ELanguageFlag;

function getBlogPostLanguageFlagFromStr(sourceFileDir: string): LanguageFlag {
  const firstSlashIndex = indexOfNthOccurrence(sourceFileDir, '/', 1);
  if (firstSlashIndex === -1) {
    return DEFAULT_LANGUAGE;
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
  return DEFAULT_LANGUAGE;
}

function getBlogPostLanguageFlagFromPostObj(post: PostBase): LanguageFlag {
  const { sourceFileDir } = post._raw;
  return getBlogPostLanguageFlagFromStr(sourceFileDir);
}

export function getBlogPostPathWithoutI18nPart(post: PostBase): Pathname {
  const langFlag = getBlogPostLanguageFlagFromPostObj(post);
  if (langFlag === DEFAULT_LANGUAGE) return post.url;
  return gsub(post.url, `/${langFlag}/`, '/');
}

export const getBlogPostLanguageFlag = (post: PostBase): LanguageFlag => getBlogPostLanguageFlagFromPostObj(post);

export function getPathnameWithoutI18nPart(pathname: string): Pathname {
  const secondSlashIndex = indexOfNthOccurrence(pathname, '/', 2);
  const pathnameWithouti18n = secondSlashIndex === -1 ? '/' : pathname.substring(secondSlashIndex);
  return pathnameWithouti18n;
}

export function getPathnameI18nPart(pathname: string): LanguageFlag {
  const secondSlashIndex = indexOfNthOccurrence(pathname, '/', 2);
  const pathnameI18nPart = secondSlashIndex === -1 ? DEFAULT_LANGUAGE : pathname.substring(1, secondSlashIndex);
  if (!isValidLanguageFlag(pathnameI18nPart)) return DEFAULT_LANGUAGE;
  return pathnameI18nPart as LanguageFlag;
}
