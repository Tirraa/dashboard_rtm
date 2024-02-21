import { InvalidArgumentsError } from './unifiedImport';

/**
 * @throws {InvalidArgumentsError}
 */
function getFlattenedPathWithUnkownRootFolder(flattenedPath: string) {
  const firstSlashIndex = flattenedPath.indexOf('/');
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (firstSlashIndex === -1 || flattenedPath.length - 1 <= firstSlashIndex) {
    throw new InvalidArgumentsError(
      getFlattenedPathWithUnkownRootFolder.name,
      { flattenedPath },
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      (firstSlashIndex === -1 ? "Can't find any '/' in flattenedPath" : "Can't find anything after the first '/' in flattenedPath") +
        ". Maybe you just don't need to use this function?"
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  return flattenedPath.substring(firstSlashIndex + 1);
}

/**
 * @throws {InvalidArgumentsError}
 */
function getFlattenedPathWithoutRootFolder(flattenedPath: string, rootFolderNeedle?: string) {
  if (!rootFolderNeedle) return getFlattenedPathWithUnkownRootFolder(flattenedPath);

  const expectedFlattenedPathStartStr = rootFolderNeedle + '/';
  if (!flattenedPath.startsWith(expectedFlattenedPathStartStr)) {
    throw new InvalidArgumentsError(
      getFlattenedPathWithoutRootFolder.name,
      { rootFolderNeedle, flattenedPath },
      `flattenedPath doesn't start with "${expectedFlattenedPathStartStr}". You should change the rootFolderNeedle value. Or maybe you just don't need to use this function?`
    );
  }

  return flattenedPath.substring(expectedFlattenedPathStartStr.length);
}

export default getFlattenedPathWithoutRootFolder;
