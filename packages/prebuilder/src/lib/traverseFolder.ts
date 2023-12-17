import type { Stats } from 'fs';

import { basename, extname, join } from 'path';
import { readdirSync, statSync } from 'fs';

import type { Filename, File, Path } from '../types/metadatas';

export default function traverseFolder(rootFolder: Path): File[] {
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
      const fileDirectory = currentDeepPath;

      filesCollection.push({ fileDirectory, filename });
    }
  }

  traverse(rootFolder);
  return filesCollection;
}
