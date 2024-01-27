import type { ProcessedFile, Arborescence, PathSegment, File, Path } from '../types/Metadatas';

// https://github.com/vitest-dev/vitest/discussions/2484
const path = require('path');

function buildDirectoriesChain(directory: Path, rootFolder: Path): PathSegment[] {
  const cutDirectory = path.normalize(directory).replace(rootFolder, '');
  const cleanedCutDirectory = cutDirectory.replace(/^\/+/, '');
  if (cleanedCutDirectory === '') return [];

  const directoriesChain = cleanedCutDirectory.split('/');
  return directoriesChain;
}

export default function buildArborescence(arborescenceMap: File[], rootFolder: Path = ''): Arborescence {
  const arborescence = [];
  const _rootFolder = rootFolder === '' ? '' : path.normalize(rootFolder);

  for (const { name: filename, directory } of arborescenceMap) {
    const directoriesChain = buildDirectoriesChain(directory, _rootFolder);
    const arborescenceElement: ProcessedFile = { directoriesChain, filename };
    arborescence.push(arborescenceElement);
  }
  return arborescence;
}
