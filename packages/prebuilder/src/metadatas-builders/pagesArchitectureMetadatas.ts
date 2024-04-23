import type { PagesMetadatas, Arborescence, PathSegment, Filename } from '../types/Metadatas';

import { PAGE_FILE_EXT } from '../config';

// https://github.com/vitest-dev/vitest/discussions/2484
const path = require('path');

const TOP_LEVEL_ROOT = '/';

function getEntityUrl(directoriesChain: PathSegment[], filenameWithoutExt: Filename) {
  // eslint-disable-next-line no-magic-numbers
  if (directoriesChain.length === 1) return TOP_LEVEL_ROOT + directoriesChain[0] + '/' + filenameWithoutExt;
  // eslint-disable-next-line no-magic-numbers
  const head = directoriesChain[0];
  // eslint-disable-next-line no-magic-numbers
  const tail = directoriesChain.slice(1);

  return TOP_LEVEL_ROOT + head + '/' + tail.join('/') + '/' + filenameWithoutExt;
}

function getEntityPath(directoriesChain: PathSegment[], filenameWithoutExt: Filename) {
  // eslint-disable-next-line no-magic-numbers
  if (directoriesChain.length === 1) return directoriesChain[0] + '/' + filenameWithoutExt;
  return directoriesChain.join('/') + '/' + filenameWithoutExt;
}

export default function getPagesArchitectureMetadatas(arborescence: Arborescence): PagesMetadatas {
  const metadatas = {} as PagesMetadatas;

  for (const { directoriesChain, filename } of arborescence) {
    const ext = path.extname(filename);
    if (ext !== PAGE_FILE_EXT) continue;
    const filenameWithoutExt = path.basename(filename, ext);

    // eslint-disable-next-line no-magic-numbers
    if (directoriesChain.length <= 0) {
      if (metadatas[TOP_LEVEL_ROOT] === undefined) metadatas[TOP_LEVEL_ROOT] = [];
      /* eslint-disable perfectionist/sort-objects */
      metadatas[TOP_LEVEL_ROOT].push({
        path: filenameWithoutExt,
        url: '/' + filenameWithoutExt,
        head: TOP_LEVEL_ROOT,
        tail: filenameWithoutExt,
        pathWithoutHead: filenameWithoutExt,
        nestingLevelTwo: ''
      });
      /* eslint-enable perfectionist/sort-objects */
      continue;
    }
    const url = getEntityUrl(directoriesChain, filenameWithoutExt);
    const _path = getEntityPath(directoriesChain, filenameWithoutExt);
    // eslint-disable-next-line no-magic-numbers
    const head = directoriesChain[0];
    // eslint-disable-next-line no-magic-numbers
    const nestingLevelTwo = directoriesChain[1] ?? '';
    // eslint-disable-next-line no-magic-numbers
    const pathWithoutHead = nestingLevelTwo === '' ? filenameWithoutExt : directoriesChain.slice(1).join('/') + '/' + filenameWithoutExt;
    const flattenedDirectoriesChain = directoriesChain.join('/');

    if (metadatas[flattenedDirectoriesChain] === undefined) metadatas[flattenedDirectoriesChain] = [];
    /* eslint-disable perfectionist/sort-objects */
    metadatas[flattenedDirectoriesChain].push({
      path: _path,
      url,
      head,
      tail: filenameWithoutExt,
      pathWithoutHead,
      nestingLevelTwo
    });
    /* eslint-enable perfectionist/sort-objects */
  }

  return metadatas;
}
