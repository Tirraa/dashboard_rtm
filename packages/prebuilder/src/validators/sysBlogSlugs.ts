import { LIST_ELEMENT_PREFIX } from '@/config';
import { CRITICAL_ERRORS_STR } from '@/config/vocab';
import { prefixFeedback } from '@/lib/feedbacksMerge';
import getErrorLabelForDefects from '@/lib/getErrorLabelForDefects';
import traverseFolder from '@/lib/traverseFolder';
import type { Filename, MaybeEmptyErrorsDetectionFeedback, Path } from '@/types/metadatas';
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

  Object.keys(foldersWithDefects).forEach((folderWithDefect) => {
    const filenamesWithDefects = foldersWithDefects[folderWithDefect];
    if (feedback) feedback += '\n';

    feedback += getErrorLabelForDefects(
      filenamesWithDefects,
      `Incorrect filename in the '${folderWithDefect}' folder: ${filenamesWithDefects}` + '\n' + NAMING_CONSTRAINTS_MSG + '\n',
      `Incorrect filenames in the '${folderWithDefect}' folder: ${LIST_ELEMENT_PREFIX}${filenamesWithDefects.join(LIST_ELEMENT_PREFIX)}` +
        '\n' +
        NAMING_CONSTRAINTS_MSG +
        '\n'
    );
  });

  feedback = prefixFeedback(feedback, ERROR_PREFIX + '\n');
  return feedback;
}

export default sysBlogSlugsValidator;
