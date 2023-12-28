import type { Stats } from 'fs';

import type { Filename, File, Path } from '../types/metadatas';
import type { Thunks } from '../types/lazyEvaluation';

// https://github.com/vitest-dev/vitest/discussions/2484
const path = require('path');
const fs = require('fs/promises');

const execute = async (thunks: Thunks<Promise<File[]>>): Promise<File[]> => {
  const filesMetadatas = await Promise.all(thunks.map((thunk) => thunk()));
  return filesMetadatas.flat();
};

const makeThunks = async (currentFolder: Path, currentDeepPath: Path = currentFolder): Promise<Thunks<Promise<File[]>>> => {
  const files = await fs.readdir(currentFolder);
  const thunks = files.map(async (currentFilename: Filename) => {
    const maybeFilepath: Path = path.join(currentFolder, currentFilename);
    const filepathStats: Stats = await fs.stat(maybeFilepath);

    return filepathStats.isDirectory()
      ? async () => {
          const nestedThunks = await makeThunks(maybeFilepath, path.join(currentDeepPath, currentFilename));
          return execute(nestedThunks);
        }
      : async () => [{ name: path.basename(currentFilename, path.extname(currentFilename)), directory: currentDeepPath }];
  });

  return Promise.all(thunks);
};

export const traverseFolder = async (rootFolder: Path): Promise<File[]> => {
  const thunks = await makeThunks(rootFolder);
  return execute(thunks);
};

export default traverseFolder;
