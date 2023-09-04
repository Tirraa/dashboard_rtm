import BlogConfig from '@/config/blog';
import RoutesBase from '@/config/routes';
import { PathSegment } from '@/types/Next';
import { LanguageFlag } from '@/types/i18n';
import { getPathnameWithoutI18nPart } from './i18n';

type DescriptionAsIs = string;
type CroppedDescription = string;
type SlashEnvelope = string;
type NeedleNthOccurrenceIndex = number;

export const getSlashEnvelope = (str: string, slashSymbol: string = '/'): SlashEnvelope =>
  (str.charAt(0) !== slashSymbol ? slashSymbol : '') + str + (str.charAt(str.length - 1) !== slashSymbol ? slashSymbol : '');

export function indexOfNthOccurrence(strHaystack: string, needle: string, n: number): -1 | NeedleNthOccurrenceIndex {
  let index = -1;
  for (let i = 0; i < n; i++) {
    index = strHaystack.indexOf(needle, index + 1);
    if (index === -1) break;
  }
  return index;
}

export function hrefMatchesPathname(href: string, pathname: string, root: string = RoutesBase.sitewide): boolean {
  const pathnameWithouti18n = getPathnameWithoutI18nPart(pathname);
  if (pathnameWithouti18n === href) return true;
  if (href !== root && pathnameWithouti18n.startsWith(getSlashEnvelope(href))) return true;
  return false;
}

export function getSlicedBlogPostDescription(description: string): DescriptionAsIs | CroppedDescription {
  const takeLimit = BlogConfig.blogPostPeviewDescriptionCharactersLimit - 1;
  if (description.length <= takeLimit) {
    return description;
  }
  const slicedDescription = description.slice(0, takeLimit) + '…';
  return slicedDescription;
}

export function getLastPathStrPart(path: string): PathSegment {
  const lastIndex = path.lastIndexOf('/');

  if (lastIndex !== -1 && lastIndex !== path.length - 1) return path.substring(lastIndex + 1);
  return path;
}

export function gsub(str: string, needle: string, replaceWith: string) {
  return str.split(needle).join(replaceWith);
}

export const buildPathFromParts = (...args: string[]) => args.join('/');

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.substring(1);

export const getFormattedDate = (lng: LanguageFlag, date: Date) =>
  capitalize(new Intl.DateTimeFormat(lng, { dateStyle: 'full', timeStyle: 'short' }).format(date).toString());
