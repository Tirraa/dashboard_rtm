import type { MaybeEmptyErrorsDetectionFeedback, BlogSubcategory, BlogCategory } from '../types/metadatas';

import isValidTaxonomy, { NAMING_CONSTRAINTS_MSG } from './taxonomyConvention';
import getErrorLabelForDefects from '../lib/getErrorLabelForDefects';
import { prefixFeedback } from '../lib/feedbacksMerge';
import { CRITICAL_ERRORS_STR } from '../config/vocab';
import { LIST_ELEMENT_PREFIX } from '../config';

const { FAILED_TO_PASS: ERROR_PREFIX } = CRITICAL_ERRORS_STR;

// https://github.com/vitest-dev/vitest/discussions/2484
const fs = require('fs');

export default function sysBlogSubcategoriesValidator(postsFolder: string): MaybeEmptyErrorsDetectionFeedback {
  let feedback = '';

  const categoriesWithDefects: Record<BlogCategory, BlogSubcategory[]> = {};
  const categoriesCollection = fs.readdirSync(postsFolder, { withFileTypes: true });

  for (const maybeCategory of categoriesCollection) {
    if (!maybeCategory.isDirectory()) continue;
    const category = maybeCategory.name;
    const maybeSubcategories = fs.readdirSync([maybeCategory.path, maybeCategory.name].join('/'), { withFileTypes: true });

    for (const maybeSubcategory of maybeSubcategories) {
      if (!maybeSubcategory.isDirectory()) continue;
      const subcategory = maybeSubcategory.name;
      if (!isValidTaxonomy(subcategory)) {
        if (categoriesWithDefects[category] === undefined) categoriesWithDefects[category] = [];
        categoriesWithDefects[category].push(subcategory);
      }
    }
  }

  Object.entries(categoriesWithDefects).forEach(([categoryWithDefects, defects]) => {
    if (feedback) feedback += '\n';

    feedback += getErrorLabelForDefects(
      defects,
      `Invalid subcategory in the '${categoryWithDefects}' category: ${defects}` + '\n' + NAMING_CONSTRAINTS_MSG + '\n',
      `Invalid subcategories in the '${categoryWithDefects}' category: ${LIST_ELEMENT_PREFIX}${defects.join(LIST_ELEMENT_PREFIX)}` +
        '\n' +
        NAMING_CONSTRAINTS_MSG +
        '\n'
    );
  });

  feedback = prefixFeedback(feedback, ERROR_PREFIX + '\n');
  return feedback;
}
