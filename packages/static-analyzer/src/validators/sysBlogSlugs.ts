import { LIST_ELEMENT_PREFIX } from '../config';
import getErrorLabelForDefects from '../lib/getErrorLabelForDefects';
import traverseFolder from '../lib/traverseFolder';
import { Filename, MaybeEmptyErrorsDetectionFeedback, Path } from '../types/metadatas';
import isValidTaxonomy, { NAMING_CONSTRAINTS_MSG } from './taxonomyConvention';

export function sysBlogSlugsValidator(postsFolder: string): MaybeEmptyErrorsDetectionFeedback {
  let feedback = '';

  const foldersWithDefects: Record<Path, Filename[]> = {};
  const filesCollection = traverseFolder(postsFolder);

  for (const file of filesCollection) {
    if (!isValidTaxonomy(file.filename)) {
      if (!foldersWithDefects[file.fileDirectory]) foldersWithDefects[file.fileDirectory] = [];
      foldersWithDefects[file.fileDirectory].push(file.filename);
    }
  }

  Object.keys(foldersWithDefects).forEach((folderWithDefect) => {
    const filenamesWithDefects = foldersWithDefects[folderWithDefect];
    if (feedback) feedback += '\n';

    feedback += getErrorLabelForDefects(
      filenamesWithDefects,
      `Incorrect filename in '${folderWithDefect}': ${filenamesWithDefects}` + '\n' + NAMING_CONSTRAINTS_MSG + '\n',
      `Incorrect filenames in '${folderWithDefect}': ${LIST_ELEMENT_PREFIX}${filenamesWithDefects.join(LIST_ELEMENT_PREFIX)}` +
        '\n' +
        NAMING_CONSTRAINTS_MSG +
        '\n'
    );
  });

  return feedback;
}

export default sysBlogSlugsValidator;
