import type { MaybeEmptyErrorsDetectionFeedback, BlogSubcategory, BlogCategory } from '../types/Metadatas';
import type { VocabKey } from '../config/translations';

import { prefixFeedback } from '../lib/feedbacksMerge';
import formatMessage from '../config/formatMessage';
import isValidTaxonomy from './taxonomyConvention';
import { LIST_ELEMENT_PREFIX } from '../config';

const ERROR_PREFIX = formatMessage('failedToPassThePrebuild' satisfies VocabKey);

// https://github.com/vitest-dev/vitest/discussions/2484
const fs = require('fs/promises');

export default async function sysBlogSubcategoriesValidator(postsFolder: string): Promise<MaybeEmptyErrorsDetectionFeedback> {
  let feedback = '';

  const categoriesWithDefects: Record<BlogCategory, BlogSubcategory[]> = {};
  const categoriesCollection = await fs.readdir(postsFolder, { withFileTypes: true });

  for (const maybeCategory of categoriesCollection) {
    if (!maybeCategory.isDirectory()) continue;
    const category = maybeCategory.name;
    const maybeSubcategories = await fs.readdir([maybeCategory.path, maybeCategory.name].join('/'), { withFileTypes: true });

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

    feedback +=
      formatMessage('invalidSubcategories' satisfies VocabKey, { count: defects.length, categoryWithDefects }) +
      ' ' +
      (defects.length === 1 ? `${defects}` : `${LIST_ELEMENT_PREFIX}${defects.join(LIST_ELEMENT_PREFIX)}`) +
      '\n' +
      formatMessage('namingConstraint' satisfies VocabKey) +
      '\n';
  });

  feedback = prefixFeedback(feedback, ERROR_PREFIX + '\n');
  return feedback;
}
