import type { PathSegment, AppPath } from '@rtm/shared-types/Next';

import deleteTrailingSlashes from './deleteTrailingSlashes';
import deleteLeadingSlashes from './deleteLeadingSlashes';

const buildPathFromParts = (...args: PathSegment[]): AppPath => args.map((segment) => deleteTrailingSlashes(deleteLeadingSlashes(segment))).join('/');

export default buildPathFromParts;
