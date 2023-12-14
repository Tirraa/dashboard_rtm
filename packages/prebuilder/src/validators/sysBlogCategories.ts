import { readdirSync } from 'fs';
import { LIST_ELEMENT_PREFIX } from '../config';
import { CRITICAL_ERRORS_STR } from '../config/vocab';
import { prefixFeedback } from '../lib/feedbacksMerge';
import getErrorLabelForDefects from '../lib/getErrorLabelForDefects';
import type { MaybeEmptyErrorsDetectionFeedback } from '../types/metadatas';
import isValidTaxonomy, { NAMING_CONSTRAINTS_MSG } from './taxonomyConvention';

const { FAILED_TO_PASS: ERROR_PREFIX } = CRITICAL_ERRORS_STR;

function sysBlogCategoriesValidator(postsFolder: string): MaybeEmptyErrorsDetectionFeedback {
  let feedback = '';

  const categoriesWithDefects = [];
  const maybeCategories = readdirSync(postsFolder, { withFileTypes: true });

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
      `Incorrect category: ${categoriesWithDefects}` + '\n' + NAMING_CONSTRAINTS_MSG + '\n',
      `Incorrect categories: ${LIST_ELEMENT_PREFIX}${categoriesWithDefects.join(LIST_ELEMENT_PREFIX)}` + '\n' + NAMING_CONSTRAINTS_MSG + '\n'
    );
  }

  feedback = prefixFeedback(feedback, ERROR_PREFIX + '\n');
  return feedback;
}

export default sysBlogCategoriesValidator;
