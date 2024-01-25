import { ForbiddenToUseIndexError, getPathWithoutExtension, indexOfNthOccurrence, INDEX_TOKEN } from '../unifiedImport';

/**
 * @throws {ForbiddenToUseIndexError}
 */
function throwIfForbiddenToUseIndexError(sourceFilePath: string, minRequiredSlashAmount: number) {
  const filepathWithoutExt = getPathWithoutExtension(sourceFilePath);

  if (filepathWithoutExt.endsWith(INDEX_TOKEN) && indexOfNthOccurrence(filepathWithoutExt, '/', minRequiredSlashAmount) === -1) {
    throw new ForbiddenToUseIndexError();
  }
}

/**
 * @throws {ForbiddenToUseIndexError}
 */
export const throwIfForbiddenToUseIndexErrorBlogCtx = (sourceFilePath: string) => throwIfForbiddenToUseIndexError(sourceFilePath, 3);
