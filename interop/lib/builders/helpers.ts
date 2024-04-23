import type { Limit } from '@rtm/shared-types/Numbers';

import { ForbiddenToUseIndexError, getPathWithoutExtension, indexOfNthOccurrence, INDEX_TOKEN } from './unifiedImport';

/**
 * @throws {ForbiddenToUseIndexError}
 */
function throwIfForbiddenToUseIndexError(sourceFilePath: string, minRequiredSlashesAmount: Limit) {
  const filepathWithoutExt = getPathWithoutExtension(sourceFilePath);

  // eslint-disable-next-line no-magic-numbers
  if (filepathWithoutExt.endsWith(INDEX_TOKEN) && indexOfNthOccurrence(filepathWithoutExt, '/', minRequiredSlashesAmount) === -1) {
    throw new ForbiddenToUseIndexError();
  }
}

/**
 * @throws {ForbiddenToUseIndexError}
 */
// eslint-disable-next-line no-magic-numbers
export const throwIfForbiddenToUseIndexErrorBlogCtx = (sourceFilePath: string) => throwIfForbiddenToUseIndexError(sourceFilePath, 3);

/**
 * @throws {ForbiddenToUseIndexError}
 */
// eslint-disable-next-line no-magic-numbers
export const throwIfForbiddenToUseIndexErrorLpCtx = (sourceFilePath: string) => throwIfForbiddenToUseIndexError(sourceFilePath, 2);

export function getPathWithIndexSuffix(path: string, sourceFilePath: string): string {
  const filepathWithoutExt = getPathWithoutExtension(sourceFilePath);
  const suffix = filepathWithoutExt.endsWith(INDEX_TOKEN) ? '/' + INDEX_TOKEN : '';
  const transformedPath = path + suffix;
  return transformedPath;
}
