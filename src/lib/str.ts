import BlogConfig from '@/config/blog';
import RoutesBase from '@/config/routes';
import { AppPath, PathSegment } from '@/types/Next';
import { LanguageFlag } from '@/types/i18n';
import { getPathnameWithoutI18nFlag } from './i18n';

type DescriptionAsIs = string;
type CroppedDescription = string;

export const getSlashEnvelope = (str: string, slashSymbol: '/' | '\\' = '/'): string =>
  (str.charAt(0) !== slashSymbol ? slashSymbol : '') + str + (str.charAt(str.length - 1) !== slashSymbol ? slashSymbol : '');

export function indexOfNthOccurrence(strHaystack: string, needle: string, n: number): -1 | number {
  let index = -1;
  for (let i = 0; i < n; i++) {
    index = strHaystack.indexOf(needle, index + 1);
    if (index === -1) break;
  }
  return index;
}

export function hrefMatchesPathname(href: AppPath, pathname: AppPath, root: AppPath = RoutesBase.SITEWIDE): boolean {
  const pathnameWithouti18n = getPathnameWithoutI18nFlag(pathname);
  if (pathnameWithouti18n === href) return true;
  if (href !== root && pathnameWithouti18n.startsWith(getSlashEnvelope(href))) return true;
  return false;
}

export function getSlicedBlogPostDescription(description: string): DescriptionAsIs | CroppedDescription {
  const takeLimit = BlogConfig.BLOG_POST_PREVIEW_DESCRIPTION_CHARACTERS_LIMIT - 1;
  if (description.length <= takeLimit) return description;

  const slicedDescription = description.substring(0, takeLimit) + '…';
  return slicedDescription;
}

export function getLastPathPart(path: AppPath): PathSegment {
  const lastIndex = path.lastIndexOf('/');

  if (lastIndex !== -1 && lastIndex !== path.length - 1) return path.substring(lastIndex + 1);
  return path;
}

export const gsub = (str: string, needle: string, replaceWith: string): string => str.split(needle).join(replaceWith);

export const buildPathFromParts = (...args: string[]): AppPath => args.join('/');

const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.substring(1);

export const getFormattedDate = (lng: LanguageFlag, date: Date, giveTime: boolean = false): string =>
  capitalize(new Intl.DateTimeFormat(lng, { dateStyle: 'full', ...(giveTime ? { timeStyle: 'short' } : {}) }).format(date).toString());
