import type { AppPath, AppPathAsIs, PathSegment } from '@/types/Next';

export function getPathLastPart(path: AppPath): AppPathAsIs | PathSegment {
  const lastIndex = path.lastIndexOf('/');

  if (lastIndex !== -1 && lastIndex !== path.length - 1) return path.substring(lastIndex + 1);
  return path;
}

export default getPathLastPart;
