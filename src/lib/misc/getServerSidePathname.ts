import NextConfig from '@/config/next';
import { indexOfNthOccurrence } from '@/lib/str';
import HeaderNotFoundError from '@/objects/exceptions/HeaderNotFound';
import { AppPath } from '@/types/Next';
import { headers } from 'next/headers';

const { SERVER_SIDE_PATHNAME_HEADER_NAME } = NextConfig;

/**
 * @throws {HeaderNotFoundError}
 */
export function getServerSidePathnameWorkaround(): AppPath {
  const headersSet: Headers = headers();
  const url = headersSet.get(SERVER_SIDE_PATHNAME_HEADER_NAME) || '';
  if (url === '') throw new HeaderNotFoundError(SERVER_SIDE_PATHNAME_HEADER_NAME);

  const pathnameStartIndex = indexOfNthOccurrence(url, '/', 3);
  const pathname = url.substring(pathnameStartIndex);
  return pathname;
}

export default getServerSidePathnameWorkaround;
