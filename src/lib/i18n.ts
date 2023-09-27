import { DEFAULT_LANGUAGE, LANGUAGES } from '@/config/i18n';
import ROUTES_ROOTS from '@/config/routes';
import PostBase from '@/types/BlogPostAbstractions';
import { AppPath, AppPathAsIs } from '@/types/Next';
import { LanguageFlag } from '@/types/i18n';
import { indexOfNthOccurrence } from './str';

const isValidLanguageFlag = (key: string): boolean => (LANGUAGES as string[]).includes(key);

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

function computePathnameI18nFlagUnstrict(pathname: AppPath, providedEndIndex?: number): string {
  const compute = (pathname: AppPath, endIndex: number) => (endIndex === -1 ? pathname.substring(1) : pathname.substring(1, endIndex));

  if (providedEndIndex !== undefined) return compute(pathname, providedEndIndex);

  const endIndex = indexOfNthOccurrence(pathname, '/', 2);
  return compute(pathname, endIndex);
}

function computePathnameI18nFlagStrict(pathname: AppPath, providedEndIndex?: number): LanguageFlag {
  const languageFlag = computePathnameI18nFlagUnstrict(pathname, providedEndIndex);
  if (!isValidLanguageFlag(languageFlag)) return DEFAULT_LANGUAGE;
  return languageFlag as LanguageFlag;
}

export function getBlogPostPathWithoutI18nPart(post: PostBase): AppPath {
  const langFlag = getBlogPostLanguageFlagFromPostObj(post);
  if (langFlag === DEFAULT_LANGUAGE) return post.url;
  const blogPostPathWithoutI18nPart = post.url.replace(`/${langFlag}/`, '/');
  return blogPostPathWithoutI18nPart;
}

export const getBlogPostLanguageFlag = (post: PostBase): LanguageFlag => getBlogPostLanguageFlagFromPostObj(post);

export function getPathnameWithoutI18nFlag(pathname: AppPath): AppPathAsIs | AppPath {
  const secondSlashIndex = indexOfNthOccurrence(pathname, '/', 2);

  const pathnameI18nFlag = computePathnameI18nFlagUnstrict(pathname, secondSlashIndex);
  if (!isValidLanguageFlag(pathnameI18nFlag)) return pathname;

  const pathnameWithouti18n = secondSlashIndex === -1 ? ROUTES_ROOTS.WEBSITE : pathname.substring(secondSlashIndex);
  return pathnameWithouti18n;
}

export function getPathnameI18nFlag(pathname: AppPath): LanguageFlag {
  const pathnameI18nFlag = computePathnameI18nFlagStrict(pathname);
  return pathnameI18nFlag;
}
