import type { Stats } from 'fs';

import type { Filename, File, Path } from '../types/Metadatas';
import type { Thunks, Thunk } from '../types/LazyEvaluation';

type ArborescenceFragmentPromise = Promise<File[] | File>;

// https://github.com/vitest-dev/vitest/discussions/2484
const path = require('path');
const fs = require('fs/promises');

async function makeThunks(currentFolder: Path, __currentDeepPath: Path = currentFolder): Promise<Thunks<ArborescenceFragmentPromise>> {
  const files: Filename[] = await fs.readdir(currentFolder);
  const thunks: Thunks<ArborescenceFragmentPromise> = files.map((currentFilename: Filename) => {
    const maybeFilepath: Path = path.join(currentFolder, currentFilename);
    const thunk: Thunk<ArborescenceFragmentPromise> = async () => {
      const filepathStats: Stats = await fs.stat(maybeFilepath);
      return filepathStats.isDirectory()
        ? execute(makeThunks(maybeFilepath, path.join(__currentDeepPath, currentFilename)))
        : ({ directory: __currentDeepPath, name: currentFilename } satisfies File);
    };
    return thunk;
  });

  return Promise.all(thunks);
}

const execute = async (thunks: Promise<Thunks<ArborescenceFragmentPromise>>): Promise<File[]> =>
  (await Promise.all((await thunks).map((thunk) => thunk()))).flat();

const traverseFolder = async (rootFolder: Path): Promise<File[]> => execute(makeThunks(rootFolder));

export default traverseFolder;
