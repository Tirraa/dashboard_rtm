import type { MaybeEmptyErrorsDetectionFeedback } from '../types/Metadatas';

import isValidTaxonomy, { NAMING_CONSTRAINTS_MSG } from './taxonomyConvention';
import getErrorLabelForDefects from '../lib/getErrorLabelForDefects';
import { prefixFeedback } from '../lib/feedbacksMerge';
import { CRITICAL_ERRORS_STR } from '../config/vocab';
import { LIST_ELEMENT_PREFIX } from '../config';

const { FAILED_TO_PASS: ERROR_PREFIX } = CRITICAL_ERRORS_STR;

// https://github.com/vitest-dev/vitest/discussions/2484
const fs = require('fs/promises');

export default async function sysBlogCategoriesValidator(postsFolder: string): Promise<MaybeEmptyErrorsDetectionFeedback> {
  let feedback = '';

  const categoriesWithDefects = [];
  const maybeCategories = await fs.readdir(postsFolder, { withFileTypes: true });

  for (const maybeCategory of maybeCategories) {
    if (!maybeCategory.isDirectory()) continue;
    const category = maybeCategory.name;
    if (!isValidTaxonomy(category)) {
      categoriesWithDefects.push(category);
    }
  }

  if (categoriesWithDefects.length > 0) {
    feedback += getErrorLabelForDefects(
      categoriesWithDefects,
      `Invalid category: ${categoriesWithDefects}` + '\n' + NAMING_CONSTRAINTS_MSG + '\n',
      `Invalid categories: ${LIST_ELEMENT_PREFIX}${categoriesWithDefects.join(LIST_ELEMENT_PREFIX)}` + '\n' + NAMING_CONSTRAINTS_MSG + '\n'
    );
  }

  feedback = prefixFeedback(feedback, ERROR_PREFIX + '\n');
  return feedback;
}
