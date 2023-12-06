import type { AppPath, PathSegment } from '@rtm/shared-types/Next';
import buildPathFromParts from './buildPathFromParts';

const buildAbsolutePathFromParts = (...args: PathSegment[]): AppPath => {
  const path = buildPathFromParts(...args);
  if (path.charAt(0) !== '/') return '/' + path;
  return path;
};

export default buildAbsolutePathFromParts;
