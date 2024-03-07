import type { MaybeEmptyErrorsDetectionFeedback, ErrorsDetectionFeedback, Filename, Path } from '../types/Metadatas';
import type { VocabKey } from '../config/translations';

import { LIST_ELEMENT_PREFIX, MAX_LP_TAXONOMY_LEN, LP_FILE_EXT } from '../config';
import traverseAndMapFilepaths from '../lib/traverseAndMapFilepaths';
import { isValidLpTaxonomy } from './taxonomyConvention';
import formatMessage from '../config/formatMessage';

export default async function sysLpSlugsValidator(
  lpFolder: Path,
  __MAX_LEN: number = MAX_LP_TAXONOMY_LEN
): Promise<MaybeEmptyErrorsDetectionFeedback> {
  let feedback: ErrorsDetectionFeedback = '';

  const foldersWithDefects: Record<Path, Filename[]> = {};
  const filesCollection = await traverseAndMapFilepaths(lpFolder);

  for (const { name: filename, directory } of filesCollection) {
    const maybeSlug = filename;
    if (!maybeSlug.endsWith(LP_FILE_EXT)) continue;

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const slug = maybeSlug.slice(0, -LP_FILE_EXT.length);
    if (!isValidLpTaxonomy(slug, __MAX_LEN)) {
      if (!foldersWithDefects[directory]) foldersWithDefects[directory] = [];
      foldersWithDefects[directory].push(slug);
    }
  }

  for (const [folderWithDefects, defects] of Object.entries(foldersWithDefects)) {
    if (feedback) feedback += '\n';
    feedback +=
      formatMessage('invalidSlugs' satisfies VocabKey, { count: defects.length, folderWithDefects }) +
      ' ' +
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      (defects.length === 1 ? `${defects}` : `${LIST_ELEMENT_PREFIX}${defects.join(LIST_ELEMENT_PREFIX)}`) +
      '\n' +
      formatMessage('lpNamingConstraint' satisfies VocabKey) +
      '\n';
  }

  return feedback;
}
