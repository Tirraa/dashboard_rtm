import { LIST_ELEMENT_PREFIX } from '../config';
import { CRITICAL_ERRORS_STR } from '../config/vocab';
import { prefixFeedback } from '../lib/feedbacksMerge';
import getErrorLabelForDefects from '../lib/getErrorLabelForDefects';
import traverseFolder from '../lib/traverseFolder';
import type { Filename, MaybeEmptyErrorsDetectionFeedback, Path } from '../types/metadatas';
import isValidTaxonomy, { NAMING_CONSTRAINTS_MSG } from './taxonomyConvention';

const { FAILED_TO_PASS: ERROR_PREFIX } = CRITICAL_ERRORS_STR;

function sysBlogSlugsValidator(postsFolder: string): MaybeEmptyErrorsDetectionFeedback {
  let feedback = '';

  const foldersWithDefects: Record<Path, Filename[]> = {};
  const filesCollection = traverseFolder(postsFolder);

  for (const file of filesCollection) {
    const slug = file.filename;
    if (!isValidTaxonomy(slug)) {
      if (!foldersWithDefects[file.fileDirectory]) foldersWithDefects[file.fileDirectory] = [];
      foldersWithDefects[file.fileDirectory].push(slug);
    }
  }

  Object.entries(foldersWithDefects).forEach(([folderWithDefects, defects]) => {
    if (feedback) feedback += '\n';

    feedback += getErrorLabelForDefects(
      defects,
      `Incorrect filename in the '${folderWithDefects}' folder: ${defects}` + '\n' + NAMING_CONSTRAINTS_MSG + '\n',
      `Incorrect filenames in the '${folderWithDefects}' folder: ${LIST_ELEMENT_PREFIX}${defects.join(LIST_ELEMENT_PREFIX)}` +
        '\n' +
        NAMING_CONSTRAINTS_MSG +
        '\n'
    );
  });
  feedback = prefixFeedback(feedback, ERROR_PREFIX + '\n');
  return feedback;
}

export default sysBlogSlugsValidator;
