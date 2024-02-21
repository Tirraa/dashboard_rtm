import { ForbiddenToUseIndexError, getPathWithoutExtension, indexOfNthOccurrence, INDEX_TOKEN } from './unifiedImport';

/**
 * @throws {ForbiddenToUseIndexError}
 */
function throwIfForbiddenToUseIndexError(sourceFilePath: string, minRequiredSlashAmount: number) {
  const filepathWithoutExt = getPathWithoutExtension(sourceFilePath);

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (filepathWithoutExt.endsWith(INDEX_TOKEN) && indexOfNthOccurrence(filepathWithoutExt, '/', minRequiredSlashAmount) === -1) {
    throw new ForbiddenToUseIndexError();
  }
}

/**
 * @throws {ForbiddenToUseIndexError}
 */
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
export const throwIfForbiddenToUseIndexErrorBlogCtx = (sourceFilePath: string) => throwIfForbiddenToUseIndexError(sourceFilePath, 3);

/**
 * @throws {ForbiddenToUseIndexError}
 */
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
export const throwIfForbiddenToUseIndexErrorLpCtx = (sourceFilePath: string) => throwIfForbiddenToUseIndexError(sourceFilePath, 2);

export function getPathWithIndexSuffix(path: string, sourceFilePath: string): string {
  const filepathWithoutExt = getPathWithoutExtension(sourceFilePath);
  const suffix = filepathWithoutExt.endsWith(INDEX_TOKEN) ? '/' + INDEX_TOKEN : '';
  const transformedPath = path + suffix;
  return transformedPath;
}
