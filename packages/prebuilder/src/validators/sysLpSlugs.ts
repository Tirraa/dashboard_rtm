import type { MaybeEmptyErrorsDetectionFeedback, Filename, Path } from '../types/Metadatas';
import type { VocabKey } from '../config/translations';

import traverseAndMapFilepaths from '../lib/traverseAndMapFilepaths';
import { LIST_ELEMENT_PREFIX, LP_FILE_EXT } from '../config';
import { isValidLpTaxonomy } from './taxonomyConvention';
import { prefixFeedback } from '../lib/feedbacksMerge';
import formatMessage from '../config/formatMessage';

const ERROR_PREFIX = formatMessage('failedToPassThePrebuild' satisfies VocabKey);

export default async function sysLpSlugsValidator(lpFolder: string): Promise<MaybeEmptyErrorsDetectionFeedback> {
  let feedback = '';

  const foldersWithDefects: Record<Path, Filename[]> = {};
  const filesCollection = await traverseAndMapFilepaths(lpFolder);

  for (const file of filesCollection) {
    const maybeSlug = file.name;
    if (!maybeSlug.endsWith(LP_FILE_EXT)) continue;

    const slug = maybeSlug.slice(0, -LP_FILE_EXT.length);
    if (!isValidLpTaxonomy(slug)) {
      if (!foldersWithDefects[file.directory]) foldersWithDefects[file.directory] = [];
      foldersWithDefects[file.directory].push(slug);
    }
  }

  Object.entries(foldersWithDefects).forEach(([folderWithDefects, defects]) => {
    if (feedback) feedback += '\n';
    feedback +=
      formatMessage('invalidSlugs' satisfies VocabKey, { count: defects.length, folderWithDefects }) +
      ' ' +
      (defects.length === 1 ? `${defects}` : `${LIST_ELEMENT_PREFIX}${defects.join(LIST_ELEMENT_PREFIX)}`) +
      '\n' +
      formatMessage('lpNamingConstraint' satisfies VocabKey) +
      '\n';
  });
  feedback = prefixFeedback(feedback, ERROR_PREFIX + '\n');
  return feedback;
}
