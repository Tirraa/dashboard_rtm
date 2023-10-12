import { Stats, readdirSync, statSync } from 'fs';
import { basename, extname, join } from 'path';
import { File, Filename, Path } from '../types/metadatas';

export function traverseFolder(folder: Path): File[] {
  const filesCollection: File[] = [];

  function traverse(currentFolder: Path, currentDeepPath: Path = currentFolder): void {
    const currentFolderFiles: Filename[] = readdirSync(currentFolder);

    for (const filename of currentFolderFiles) {
      const filepath: Path = join(currentFolder, filename);
      const stat: Stats = statSync(filepath);

      if (stat.isDirectory()) {
        traverse(filepath, join(currentDeepPath, filename));
        continue;
      }
      filesCollection.push({ fileDirectory: currentDeepPath, filename: basename(filename, extname(filename)) });
    }
  }

  traverse(folder);
  return filesCollection;
}

export default traverseFolder;
