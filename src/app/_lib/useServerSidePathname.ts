import { headers } from 'next/headers';
import indexOfNthOccurrence from './indexOfNthOccurence';

export function useServerSidePathnameWorkaround(): '' | string {
  const headersList = headers();
  const url = headersList.get('x-url') || '';
  if (url === '') return '';
  const pathnameStartIndex = indexOfNthOccurrence(url, '/', 3);
  const pathname = url.substring(pathnameStartIndex);
  return pathname;
}

export default useServerSidePathnameWorkaround;
