import type { MaybeEmptyErrorsDetectionFeedback, Filename, Path } from '../types/metadatas';

import isValidTaxonomy, { NAMING_CONSTRAINTS_MSG } from './taxonomyConvention';
import getErrorLabelForDefects from '../lib/getErrorLabelForDefects';
import { LIST_ELEMENT_PREFIX, BLOG_POST_FILE_EXT } from '../config';
import { prefixFeedback } from '../lib/feedbacksMerge';
import { CRITICAL_ERRORS_STR } from '../config/vocab';
import traverseFolder from '../lib/traverseFolder';

const { FAILED_TO_PASS: ERROR_PREFIX } = CRITICAL_ERRORS_STR;

export default async function sysBlogSlugsValidator(postsFolder: string): Promise<MaybeEmptyErrorsDetectionFeedback> {
  let feedback = '';

  const foldersWithDefects: Record<Path, Filename[]> = {};
  const filesCollection = await traverseFolder(postsFolder);

  for (const file of filesCollection) {
    const maybeSlug = file.name;
    if (!maybeSlug.endsWith(BLOG_POST_FILE_EXT)) continue;

    const slug = maybeSlug.slice(0, -BLOG_POST_FILE_EXT.length);
    if (!isValidTaxonomy(slug)) {
      if (!foldersWithDefects[file.directory]) foldersWithDefects[file.directory] = [];
      foldersWithDefects[file.directory].push(slug);
    }
  }

  Object.entries(foldersWithDefects).forEach(([folderWithDefects, defects]) => {
    if (feedback) feedback += '\n';

    feedback += getErrorLabelForDefects(
      defects,
      `Invalid slug in the '${folderWithDefects}' folder: ${defects}` + '\n' + NAMING_CONSTRAINTS_MSG + '\n',
      `Invalid slugs in the '${folderWithDefects}' folder: ${LIST_ELEMENT_PREFIX}${defects.join(LIST_ELEMENT_PREFIX)}` +
        '\n' +
        NAMING_CONSTRAINTS_MSG +
        '\n'
    );
  });
  feedback = prefixFeedback(feedback, ERROR_PREFIX + '\n');
  return feedback;
}
