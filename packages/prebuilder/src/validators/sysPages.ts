import type { Limit } from '@rtm/shared-types/Numbers';

import type { MaybeEmptyErrorsDetectionFeedback, ErrorsDetectionFeedback, Arborescence, PathSegment, Filename, Path } from '../types/Metadatas';
import type { VocabKey } from '../config/translations';

import { MAX_PAGE_TAXONOMY_LEN, LIST_ELEMENT_PREFIX, PAGE_FILE_EXT } from '../config';
import traverseAndMapFilepaths from '../lib/traverseAndMapFilepaths';
import buildArborescence from '../metadatas-builders/arborescence';
import { isValidPageTaxonomy } from './taxonomyConvention';
import { foldFeedbacks } from '../lib/mergeFeedbacks';
import { INDEX_TOKEN } from '../config/translations';
import formatMessage from '../config/formatMessage';
import fileExists from '../lib/fileExists';

// https://github.com/vitest-dev/vitest/discussions/2484
const path = require('path');

function buildSlugsFeedback(foldersWithDefects: Record<Path, Filename[]>) {
  let feedback: ErrorsDetectionFeedback = '';
  for (const [folderWithDefects, defects] of Object.entries(foldersWithDefects)) {
    if (feedback) feedback += '\n';
    feedback +=
      formatMessage('invalidSlugs' satisfies VocabKey, { count: defects.length, folderWithDefects }) +
      ' ' +
      // eslint-disable-next-line no-magic-numbers
      (defects.length === 1 ? `${defects}` : `${LIST_ELEMENT_PREFIX}${defects.join(LIST_ELEMENT_PREFIX)}`) +
      '\n' +
      formatMessage('pagesNamingConstraint' satisfies VocabKey) +
      '\n';
  }

  return feedback;
}

/**
 * @effect {Prints Warning}
 */
function warnIfUglyIndexStrategy(indexStrategyDefects: Record<Path, Filename>) {
  // eslint-disable-next-line no-magic-numbers
  if (Object.keys(indexStrategyDefects).length <= 0) return;

  const defectsAmount = Object.values(indexStrategyDefects).length;
  console.warn(formatMessage('uglyIndexStrategyWarning' satisfies VocabKey, { count: defectsAmount }));

  const shouldTriggerJustMove = (file: Filename) => file.endsWith(INDEX_TOKEN + PAGE_FILE_EXT);

  // eslint-disable-next-line no-magic-numbers
  if (Object.keys(indexStrategyDefects).length === 1) {
    // eslint-disable-next-line no-magic-numbers
    const [file, folder] = [Object.values(indexStrategyDefects)[0], Object.keys(indexStrategyDefects)[0]];
    if (shouldTriggerJustMove(file)) {
      console.warn(formatMessage('uglyIndexStrategyWarningJustMoveMsg' satisfies VocabKey, { folder, file }) + '\n');
    } else {
      console.warn(formatMessage('uglyIndexStrategyWarningMsg' satisfies VocabKey, { folder, file }) + '\n');
    }
    return;
  }

  const warnings = [];
  for (const [folder, file] of Object.entries(indexStrategyDefects)) {
    if (shouldTriggerJustMove(file)) {
      warnings.push(formatMessage('uglyIndexStrategyWarningJustMoveMsg' satisfies VocabKey, { folder, file }));
      continue;
    }
    warnings.push(formatMessage('uglyIndexStrategyWarningMsg' satisfies VocabKey, { folder, file }));
  }
  console.warn(warnings.join('\n') + '\n');
}

function buildNestingsFeedback(nestingsDefects: Path[]): MaybeEmptyErrorsDetectionFeedback {
  // eslint-disable-next-line no-magic-numbers
  if (nestingsDefects.length <= 0) return '';
  const feedback =
    formatMessage('invalidNestings' satisfies VocabKey, { count: nestingsDefects.length }) +
    ' ' +
    // eslint-disable-next-line no-magic-numbers
    (nestingsDefects.length === 1 ? `${nestingsDefects}` : `${LIST_ELEMENT_PREFIX}${nestingsDefects.join(LIST_ELEMENT_PREFIX)}`) +
    '\n' +
    formatMessage('pagesNamingConstraint' satisfies VocabKey) +
    '\n';
  return feedback;
}

async function hasUglyIndexStrategy(filename: Filename, directoriesChain: PathSegment[], pagesFolderPrefix: PathSegment) {
  // eslint-disable-next-line no-magic-numbers
  const filenameWithoutPageExt = filename.slice(0, -PAGE_FILE_EXT.length);

  const suffix = '/' + filenameWithoutPageExt;
  // eslint-disable-next-line no-magic-numbers
  const directoryPath = directoriesChain.length <= 0 ? pagesFolderPrefix + suffix : path.join(pagesFolderPrefix, ...directoriesChain) + suffix;

  const hasUglyIndexStrategy = await fileExists(directoryPath);
  return hasUglyIndexStrategy;
}

export default async function sysPagesValidator(
  pagesFolder: Path,
  __MAX_LEN: Limit = MAX_PAGE_TAXONOMY_LEN
): Promise<{
  feedback: MaybeEmptyErrorsDetectionFeedback;
  arborescence: Arborescence;
}> {
  const arborescenceMap = await traverseAndMapFilepaths(pagesFolder);
  const arborescence = buildArborescence(arborescenceMap, pagesFolder);
  const pagesFolderPrefix = path.normalize(pagesFolder);

  const indexStrategyDefects: Record<Path, Filename> = {};
  const foldersWithSlugDefects: Record<Path, Filename[]> = {};
  const nestingsDefects: Set<Path> = new Set();

  for (const { directoriesChain, filename } of arborescence) {
    for (let i = 0; i < directoriesChain.length; i++) {
      const currentNesting = directoriesChain[i];
      if (!isValidPageTaxonomy(currentNesting, __MAX_LEN)) {
        // eslint-disable-next-line no-magic-numbers
        const currentPath = path.join(pagesFolderPrefix, ...directoriesChain.slice(0, i + 1));
        nestingsDefects.add(currentPath + ' ' + '(' + currentNesting + ')');
      }
    }

    const uglyIndexStrategy = await hasUglyIndexStrategy(filename, directoriesChain, pagesFolderPrefix);
    if (uglyIndexStrategy) {
      // eslint-disable-next-line no-magic-numbers
      const expectedFolder = path.join(pagesFolderPrefix, ...directoriesChain, filename.slice(0, -PAGE_FILE_EXT.length));
      const currentFolder = path.normalize(path.join(pagesFolderPrefix, ...directoriesChain));
      indexStrategyDefects[expectedFolder] = path.join(currentFolder, filename);
    }

    if (!filename.endsWith(PAGE_FILE_EXT)) continue;

    // eslint-disable-next-line no-magic-numbers
    const currentSlugPath = directoriesChain.length <= 0 ? path.normalize(pagesFolderPrefix) : path.join(pagesFolderPrefix, ...directoriesChain);
    // eslint-disable-next-line no-magic-numbers
    const slug = filename.slice(0, -PAGE_FILE_EXT.length);
    if (!isValidPageTaxonomy(slug, __MAX_LEN)) {
      if (foldersWithSlugDefects[currentSlugPath] === undefined) foldersWithSlugDefects[currentSlugPath] = [];
      foldersWithSlugDefects[currentSlugPath].push(slug);
    }
  }

  warnIfUglyIndexStrategy(indexStrategyDefects);
  const nestingsFeedback = buildNestingsFeedback(Array.from(nestingsDefects));
  const slugsFeedback = buildSlugsFeedback(foldersWithSlugDefects);
  const feedback = foldFeedbacks(nestingsFeedback, slugsFeedback);

  return { arborescence, feedback };
}
