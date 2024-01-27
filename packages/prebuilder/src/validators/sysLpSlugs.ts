import type { MaybeEmptyErrorsDetectionFeedback, Filename, Path } from '../types/Metadatas';
import type { VocabKey } from '../config/translations';

import traverseAndMapFilepaths from '../lib/traverseAndMapFilepaths';
import { LIST_ELEMENT_PREFIX, LP_FILE_EXT } from '../config';
import { isValidLpTaxonomy } from './taxonomyConvention';
import formatMessage from '../config/formatMessage';

export default async function sysLpSlugsValidator(lpFolder: Path): Promise<MaybeEmptyErrorsDetectionFeedback> {
  let feedback = '';

  const foldersWithDefects: Record<Path, Filename[]> = {};
  const filesCollection = await traverseAndMapFilepaths(lpFolder);

  for (const { name: filename, directory } of filesCollection) {
    const maybeSlug = filename;
    if (!maybeSlug.endsWith(LP_FILE_EXT)) continue;

    const slug = maybeSlug.slice(0, -LP_FILE_EXT.length);
    if (!isValidLpTaxonomy(slug)) {
      if (!foldersWithDefects[directory]) foldersWithDefects[directory] = [];
      foldersWithDefects[directory].push(slug);
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
  return feedback;
}
