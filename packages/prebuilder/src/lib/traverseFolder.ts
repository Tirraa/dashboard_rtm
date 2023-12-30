import type { Stats } from 'fs';

import type { Filename, File, Path } from '../types/metadatas';
import type { Thunks, Thunk } from '../types/lazyEvaluation';

type ArborescencePromise = Promise<File[] | File>;

// https://github.com/vitest-dev/vitest/discussions/2484
const path = require('path');
const fs = require('fs/promises');

async function makeThunks(currentFolder: Path, __currentDeepPath: Path = currentFolder): Promise<Thunks<ArborescencePromise>> {
  const files: Filename[] = await fs.readdir(currentFolder);
  const thunks: Thunks<ArborescencePromise> = files.map((currentFilename: Filename) => {
    const maybeFilepath: Path = path.join(currentFolder, currentFilename);
    const thunk: Thunk<ArborescencePromise> = async () => {
      const filepathStats: Stats = await fs.stat(maybeFilepath);
      return filepathStats.isDirectory()
        ? execute(makeThunks(maybeFilepath, path.join(__currentDeepPath, currentFilename)))
        : ({ directory: __currentDeepPath, name: currentFilename } satisfies File);
    };
    return thunk;
  });

  return Promise.all(thunks);
}

const execute = async (thunks: Promise<Thunks<ArborescencePromise>>): Promise<File[]> =>
  (await Promise.all((await thunks).map((thunk) => thunk()))).flat();

const traverseFolder = async (rootFolder: Path): Promise<File[]> => execute(makeThunks(rootFolder));

export default traverseFolder;
