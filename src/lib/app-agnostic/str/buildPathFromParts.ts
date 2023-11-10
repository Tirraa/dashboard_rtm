import type { AppPath, PathSegment } from '../../../types/Next';
import deleteTrailingSlashes from './deleteTrailingSlashes';

export const buildPathFromParts = (...args: PathSegment[]): AppPath => args.map(deleteTrailingSlashes).join('/');

export default buildPathFromParts;
