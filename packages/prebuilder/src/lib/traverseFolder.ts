import type { Stats } from 'fs';

import type { Filename, File, Path } from '../types/metadatas';

// https://github.com/vitest-dev/vitest/discussions/2484
const path = require('path');
const fs = require('fs');

export default function traverseFolder(rootFolder: Path): File[] {
  const filesCollection: File[] = [];

  function traverse(currentFolder: Path, currentDeepPath: Path = currentFolder): void {
    const currentFolderFiles: Filename[] = fs.readdirSync(currentFolder);

    for (const currentFilename of currentFolderFiles) {
      const filepath: Path = path.join(currentFolder, currentFilename);
      const stat: Stats = fs.statSync(filepath);

      if (stat.isDirectory()) {
        traverse(filepath, path.join(currentDeepPath, currentFilename));
        continue;
      }

      const filename = path.basename(currentFilename, path.extname(currentFilename));
      const fileDirectory = currentDeepPath;

      filesCollection.push({ fileDirectory, filename });
    }
  }

  traverse(rootFolder);
  return filesCollection;
}
