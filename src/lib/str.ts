import BlogConfig from '@/config/blog';
import ROUTES_ROOTS from '@/config/routes';
import { AppPath, AppPathAsIs, PathSegment } from '@/types/Next';
import { LanguageFlag } from '@/types/i18n';
import { getPathnameWithoutI18nFlag } from './i18n';
import { serverCtx } from './next';

type DescriptionAsIs = string;
type CroppedDescription = string;

export const sanitizePathname = (pathname: AppPath): AppPath => {
  const doSanitize = (pathname: AppPath) => pathname.replace(/[\/]+/g, '/');

  if (!serverCtx()) return doSanitize(pathname);

  const MAX_SANITIZE_PATHNAME_ARG_LENGTH = Number(process.env.MAX_SANITIZE_PATHNAME_ARG_LENGTH);
  const FALLBACK_ROUTE = ROUTES_ROOTS.WEBSITE;
  if (isNaN(MAX_SANITIZE_PATHNAME_ARG_LENGTH)) return FALLBACK_ROUTE;
  return pathname.length <= MAX_SANITIZE_PATHNAME_ARG_LENGTH ? doSanitize(pathname) : FALLBACK_ROUTE;
};

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

export const gsub = (str: string, needle: string, replaceWith: string): string => str.split(needle).join(replaceWith);

export const buildPathFromParts = (...args: PathSegment[]): AppPath =>
  args.map((arg) => (arg.endsWith('/') ? sanitizePathname(arg).slice(0, -1) : arg)).join('/');

export const buildAbsolutePathFromParts = (...args: PathSegment[]): AppPath => {
  let path = buildPathFromParts(...args);
  if (path.charAt(0) !== '/') return '/' + path;
  return path;
};

const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.substring(1);

export const getFormattedDate = (lng: LanguageFlag, date: Date, giveTime: boolean = false): string =>
  capitalize(new Intl.DateTimeFormat(lng, { dateStyle: 'full', ...(giveTime ? { timeStyle: 'short' } : {}) }).format(date).toString());

export function getAppPathParentPath(pathname: AppPath): AppPath {
  const parts = pathname.split('/');
  if (parts.length > 1) parts.pop();
  return buildAbsolutePathFromParts(...parts);
}
