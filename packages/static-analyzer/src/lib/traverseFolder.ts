import { Stats, readdirSync, statSync } from 'fs';
import { basename, extname, join } from 'path';
import { File, Filename, Path } from '../types/metadatas';

const CURRENT_DIRECTORY_PREFIX = './';

export function traverseFolder(rootFolder: Path): File[] {
  const filesCollection: File[] = [];

  function traverse(currentFolder: Path, currentDeepPath: Path = currentFolder): void {
    const currentFolderFiles: Filename[] = readdirSync(currentFolder);

    for (const currentFilename of currentFolderFiles) {
      const filepath: Path = join(currentFolder, currentFilename);
      const stat: Stats = statSync(filepath);

      if (stat.isDirectory()) {
        traverse(filepath, join(currentDeepPath, currentFilename));
        continue;
      }

      const filename = basename(currentFilename, extname(currentFilename));
      const fileDirectory =
        !currentDeepPath.startsWith(CURRENT_DIRECTORY_PREFIX) && rootFolder.startsWith(CURRENT_DIRECTORY_PREFIX)
          ? CURRENT_DIRECTORY_PREFIX + currentDeepPath
          : currentDeepPath;

      filesCollection.push({ fileDirectory, filename });
    }
  }

  traverse(rootFolder);
  return filesCollection;
}

export default traverseFolder;
