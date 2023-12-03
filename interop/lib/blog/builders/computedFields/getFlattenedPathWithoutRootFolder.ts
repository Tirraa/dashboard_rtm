import { InvalidArgumentsError } from '../../unifiedImport';

/**
 * @throws {InvalidArgumentsError}
 */
function getFlattenedPathWithoutUnkownRootFolder(flattenedPath: string) {
  const firstSlashIndex = flattenedPath.indexOf('/');
  if (firstSlashIndex === -1 || flattenedPath.length <= firstSlashIndex) {
    throw new InvalidArgumentsError(
      getFlattenedPathWithoutUnkownRootFolder.name,
      { flattenedPath },
      (firstSlashIndex === -1 ? `Can't find any '/' in flattenedPath` : `Can't find anything after the first '/' in flattenedPath`) +
        ". Maybe you just don't need to use this function?"
    );
  }
  return flattenedPath.substring(firstSlashIndex + 1);
}

/**
 * @throws {InvalidArgumentsError}
 */
export function getFlattenedPathWithoutRootFolder(flattenedPath: string, rootFolderNeedle?: string) {
  if (!rootFolderNeedle) return getFlattenedPathWithoutUnkownRootFolder(flattenedPath);

  const expectedFlattenedPathStartStr = rootFolderNeedle + '/';
  if (!flattenedPath.startsWith(expectedFlattenedPathStartStr)) {
    throw new InvalidArgumentsError(
      getFlattenedPathWithoutRootFolder.name,
      { flattenedPath, rootFolderNeedle },
      `flattenedPath doesn't start with "${expectedFlattenedPathStartStr}". You should change the rootFolderNeedle value. Or maybe you just don't need to use this function?`
    );
  }

  return flattenedPath.substring(expectedFlattenedPathStartStr.length);
}

export default getFlattenedPathWithoutRootFolder;
