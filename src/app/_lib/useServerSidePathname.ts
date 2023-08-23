import { headers } from 'next/headers';
import indexOfNthOccurrence from './indexOfNthOccurence';

type Pathname = string;

export function useServerSidePathnameWorkaround(): '' | Pathname {
  const headersSet: Headers = headers();
  const url = headersSet.get('x-url') || '';
  if (url === '') {
    return '';
  }
  const pathnameStartIndex = indexOfNthOccurrence(url, '/', 3);
  const pathname = url.substring(pathnameStartIndex);
  return pathname;
}

export default useServerSidePathnameWorkaround;
