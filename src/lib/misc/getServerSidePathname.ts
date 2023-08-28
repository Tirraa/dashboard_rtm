import { indexOfNthOccurrence } from '@/lib/str';
import { Pathname } from '@/types/Next';
import { headers } from 'next/headers';

export function getServerSidePathnameWorkaround(): '' | Pathname {
  const headersSet: Headers = headers();
  const url = headersSet.get('x-url') || '';
  if (url === '') {
    return '';
  }
  const pathnameStartIndex = indexOfNthOccurrence(url, '/', 4);
  const pathname = url.substring(pathnameStartIndex);
  return pathname;
}

export default getServerSidePathnameWorkaround;
