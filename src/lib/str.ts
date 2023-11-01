import BlogConfig from '@/config/blog';
import ROUTES_ROOTS from '@/config/routes';
import type { AppPath, AppPathAsIs, PathSegment } from '@/types/Next';
import type { LanguageFlag } from '@/types/i18n';
import { getPathnameWithoutI18nFlag } from './i18n';

type DescriptionAsIs = string;
type CroppedDescription = string;

function deleteTrailingSlashes(str: string): string {
  const maxEndIndex = str.length - 1;
  let endIndex = maxEndIndex;

  while (endIndex >= 0 && str.charAt(endIndex) === '/') endIndex -= 1;
  if (endIndex === maxEndIndex) return str;
  if (endIndex === -1) return '';

  const stringWithoutTrailingSlashes = str.substring(0, endIndex + 1);
  return stringWithoutTrailingSlashes;
}

const surroundString = (str: string, envelope: string): string =>
  (!str.startsWith(envelope) ? envelope : '') + str + (!str.endsWith(envelope) ? envelope : '');

export const getSlashEnvelope = (str: string): string => surroundString(str, '/');

export function indexOfNthOccurrence(strHaystack: string, needle: string, n: number): -1 | number {
  let index = -1;
  for (let i = 0; i < n; i++) {
    index = strHaystack.indexOf(needle, index + 1);
    if (index === -1) break;
  }
  return index;
}

export function hrefMatchesPathname(href: AppPath, pathname: AppPath, root: AppPath = ROUTES_ROOTS.WEBSITE): boolean {
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

export function getLastPathPart(path: AppPath): AppPathAsIs | PathSegment {
  const lastIndex = path.lastIndexOf('/');

  if (lastIndex !== -1 && lastIndex !== path.length - 1) return path.substring(lastIndex + 1);
  return path;
}

export const buildPathFromParts = (...args: PathSegment[]): AppPath => args.map(deleteTrailingSlashes).join('/');

export const buildAbsolutePathFromParts = (...args: PathSegment[]): AppPath => {
  const path = buildPathFromParts(...args);
  if (path.charAt(0) !== '/') return '/' + path;
  return path;
};

export const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.substring(1);

export const getFormattedDate = (lng: LanguageFlag, date: Date, giveTime: boolean = false): string =>
  capitalize(new Intl.DateTimeFormat(lng, { dateStyle: 'full', ...(giveTime ? { timeStyle: 'short' } : {}) }).format(date).toString());

export function getAppPathParentPath(pathname: AppPath): AppPath {
  const parts = pathname.split('/');
  if (parts.length > 1) parts.pop();
  return buildAbsolutePathFromParts(...parts);
}

export function getPageTitle(productTitle: string, pageTitle: string, isHomepage: boolean = false): string {
  const sep = ' | ';
  if (isHomepage) return productTitle + sep + pageTitle;
  return pageTitle + sep + productTitle;
}
