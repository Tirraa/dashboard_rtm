import { ForbiddenToUseIndexError, getPathWithoutExtension, indexOfNthOccurrence, INDEX_TOKEN } from '../unifiedImport';

/**
 * @throws {ForbiddenToUseIndexError}
 */
function throwIfForbiddenToUseIndexError(sourceFilePath: string, flattenedPath: string, slashOccurrenceNb: number) {
  const filepathWithoutExt = getPathWithoutExtension(sourceFilePath);

  if (filepathWithoutExt.endsWith(INDEX_TOKEN) && indexOfNthOccurrence(flattenedPath, '/', slashOccurrenceNb) === -1) {
    throw new ForbiddenToUseIndexError();
  }
}

/**
 * @throws {ForbiddenToUseIndexError}
 */
export const throwIfForbiddenToUseIndexErrorBlogCtx = (sourceFilePath: string, flattenedPath: string) =>
  throwIfForbiddenToUseIndexError(sourceFilePath, flattenedPath, 2);
