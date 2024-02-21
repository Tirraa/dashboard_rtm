import type { PathSegment, AppPath } from '@rtm/shared-types/Next';

import buildPathFromParts from './buildPathFromParts';

const buildAbsolutePathFromParts = (...args: PathSegment[]): AppPath => {
  const path = buildPathFromParts(...args);
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (path.charAt(0) !== '/') return '/' + path;
  return path;
};

export default buildAbsolutePathFromParts;
