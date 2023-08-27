import BlogConfig from '@/config/blog';
import RoutesBase from '@/config/routes';
import { PathnameSegment } from '@/types/Next';

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

export const hrefMatchesPathname = (href: string, pathname: string): boolean =>
  pathname === href || (href !== RoutesBase.sitewide && pathname.startsWith(getSlashEnvelope(href)));

export function getSlicedBlogPostDescription(description: string): DescriptionAsIs | CroppedDescription {
  const takeLimit = BlogConfig.blogPostPeviewDescriptionCharactersLimit - 1;
  if (description.length <= takeLimit) {
    return description;
  }
  const slicedDescription = description.slice(0, takeLimit) + '…';
  return slicedDescription;
}

export function getLastPathStrPart(path: string): PathnameSegment {
  const lastIndex = path.lastIndexOf('/');

  if (lastIndex !== -1 && lastIndex !== path.length - 1) return path.substring(lastIndex + 1);
  return path;
}

export function gsub(str: string, needle: string, replaceWith: string) {
  return str.split(needle).join(replaceWith);
}

export const buildPathFromParts = (...args: string[]) => args.join('/');
