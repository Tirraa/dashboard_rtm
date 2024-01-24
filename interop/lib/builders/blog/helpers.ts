import { ForbiddenToUseIndexError, getPathWithoutExtension, indexOfNthOccurrence, INDEX_TOKEN } from '../unifiedImport';

/**
 * @throws {ForbiddenToUseIndexError}
 */
function throwIfForbiddenToUseIndexError(sourceFilePath: string, flattenedPath: string) {
  const filepathWithoutExt = getPathWithoutExtension(sourceFilePath);

  if (filepathWithoutExt.endsWith(INDEX_TOKEN) && indexOfNthOccurrence(flattenedPath, '/', 2) === -1) {
    throw new ForbiddenToUseIndexError();
  }
}

export default throwIfForbiddenToUseIndexError;
