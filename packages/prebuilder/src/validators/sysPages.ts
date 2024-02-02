import type { MaybeEmptyErrorsDetectionFeedback, Arborescence, Filename, Path } from '../types/Metadatas';
import type { VocabKey } from '../config/translations';

import traverseAndMapFilepaths from '../lib/traverseAndMapFilepaths';
import buildArborescence from '../metadatas-builders/arborescence';
import { LIST_ELEMENT_PREFIX, PAGE_FILE_EXT } from '../config';
import { isValidPageTaxonomy } from './taxonomyConvention';
import { foldFeedbacks } from '../lib/feedbacksMerge';
import formatMessage from '../config/formatMessage';

// https://github.com/vitest-dev/vitest/discussions/2484
const path = require('path');

function buildSlugsFeedback(foldersWithDefects: Record<Path, Filename[]>) {
  let feedback = '';
  Object.entries(foldersWithDefects).forEach(([folderWithDefects, defects]) => {
    if (feedback) feedback += '\n';
    feedback +=
      formatMessage('invalidSlugs' satisfies VocabKey, { count: defects.length, folderWithDefects }) +
      ' ' +
      (defects.length === 1 ? `${defects}` : `${LIST_ELEMENT_PREFIX}${defects.join(LIST_ELEMENT_PREFIX)}`) +
      '\n' +
      formatMessage('pagesNamingConstraint' satisfies VocabKey) +
      '\n';
  });
  return feedback;
}

function buildNestingsFeedback(nestingsDefects: Path[]): MaybeEmptyErrorsDetectionFeedback {
  if (nestingsDefects.length <= 0) return '';
  const feedback =
    formatMessage('invalidNestings' satisfies VocabKey, { count: nestingsDefects.length }) +
    ' ' +
    (nestingsDefects.length === 1 ? `${nestingsDefects}` : `${LIST_ELEMENT_PREFIX}${nestingsDefects.join(LIST_ELEMENT_PREFIX)}`) +
    '\n' +
    formatMessage('pagesNamingConstraint' satisfies VocabKey) +
    '\n';
  return feedback;
}

export default async function sysPagesValidator(pagesFolder: Path): Promise<{
  feedback: MaybeEmptyErrorsDetectionFeedback;
  arborescence: Arborescence;
}> {
  const arborescenceMap = await traverseAndMapFilepaths(pagesFolder);
  const arborescence = buildArborescence(arborescenceMap, pagesFolder);
  const pagesFolderPrefix = path.normalize(pagesFolder);

  const foldersWithSlugDefects: Record<Path, Filename[]> = {};
  const nestingsDefects: Set<Path> = new Set();

  for (const { directoriesChain, filename } of arborescence) {
    for (let i = 0; i < directoriesChain.length; i++) {
      const currentPath = path.join(pagesFolderPrefix, ...directoriesChain.slice(0, i + 1));
      const currentNesting = directoriesChain[i];
      if (!isValidPageTaxonomy(currentNesting)) {
        nestingsDefects.add(currentPath + ' ' + '(' + currentNesting + ')');
      }
    }

    if (!filename.endsWith(PAGE_FILE_EXT)) continue;

    const currentSlugPath = directoriesChain.length <= 0 ? pagesFolderPrefix : path.join(pagesFolderPrefix, ...directoriesChain);
    const slug = filename.slice(0, -PAGE_FILE_EXT.length);
    if (!isValidPageTaxonomy(slug)) {
      if (foldersWithSlugDefects[currentSlugPath] === undefined) foldersWithSlugDefects[currentSlugPath] = [];
      foldersWithSlugDefects[currentSlugPath].push(slug);
    }
  }

  const nestingsFeedback = buildNestingsFeedback(Array.from(nestingsDefects));
  const slugsFeedback = buildSlugsFeedback(foldersWithSlugDefects);
  const feedback = foldFeedbacks(nestingsFeedback, slugsFeedback);

  return { arborescence, feedback };
}
