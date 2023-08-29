import { indexOfNthOccurrence } from '@/lib/str';
import { Path } from '@/types/Next';
import { headers } from 'next/headers';

export function getServerSidePathnameWorkaround(): '' | Path {
  const headersSet: Headers = headers();
  const url = headersSet.get('x-url') || '';
  if (url === '') {
    return '';
  }
  const pathnameStartIndex = indexOfNthOccurrence(url, '/', 3);
  const pathname = url.substring(pathnameStartIndex);
  return pathname;
}

export default getServerSidePathnameWorkaround;
