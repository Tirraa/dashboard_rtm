import type { AppPath, PathSegment } from '@rtm/shared-types/Next';
import deleteLeadingSlashes from './deleteLeadingSlashes';
import deleteTrailingSlashes from './deleteTrailingSlashes';

const buildPathFromParts = (...args: PathSegment[]): AppPath => args.map((segment) => deleteTrailingSlashes(deleteLeadingSlashes(segment))).join('/');

export default buildPathFromParts;
