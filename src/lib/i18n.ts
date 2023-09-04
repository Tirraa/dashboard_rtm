import { fallbackLng as DEFAULT_LANGUAGE } from '@/config/i18n';
import { languages } from '@/i18n/settings';
import PostBase from '@/types/BlogPostAbstractions';
import { Path } from '@/types/Next';
import { LanguageFlag } from '@/types/i18n';
import { gsub, indexOfNthOccurrence } from './str';

const isValidLanguageFlag = (key: string): boolean => languages.includes(key);

function getBlogPostLanguageFlagFromStr(sourceFileDir: string): LanguageFlag {
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

function getBlogPostLanguageFlagFromPostObj(post: PostBase): LanguageFlag {
  const { sourceFileDir } = post._raw;
  return getBlogPostLanguageFlagFromStr(sourceFileDir);
}

function computePathnameI18nFlag(pathname: string, providedStartIndex?: number) {
  const compute = (pathname: string, startIndex: number) => (startIndex === -1 ? pathname.substring(1) : pathname.substring(1, startIndex));

  if (providedStartIndex !== undefined) return compute(pathname, providedStartIndex);

  const startIndex = indexOfNthOccurrence(pathname, '/', 2);
  return compute(pathname, startIndex);
}

export function getBlogPostPathWithoutI18nPart(post: PostBase): Path {
  const langFlag = getBlogPostLanguageFlagFromPostObj(post);
  if (langFlag === DEFAULT_LANGUAGE) return post.url;
  return gsub(post.url, `/${langFlag}/`, '/');
}

export const getBlogPostLanguageFlag = (post: PostBase): LanguageFlag => getBlogPostLanguageFlagFromPostObj(post);

export function getPathnameWithoutI18nFlag(pathname: string): Path {
  const secondSlashIndex = indexOfNthOccurrence(pathname, '/', 2);

  const pathnameI18nFlag = computePathnameI18nFlag(pathname, secondSlashIndex);
  if (!isValidLanguageFlag(pathnameI18nFlag)) return pathname;

  const pathnameWithouti18n = secondSlashIndex === -1 ? '/' : pathname.substring(secondSlashIndex);
  return pathnameWithouti18n;
}

export function getPathnameI18nFlag(pathname: string): LanguageFlag {
  const pathnameI18nFlag = computePathnameI18nFlag(pathname);

  if (!isValidLanguageFlag(pathnameI18nFlag)) return DEFAULT_LANGUAGE;
  return pathnameI18nFlag as LanguageFlag;
}
