import type { MaybeEmptyErrorsDetectionFeedback } from '../types/Metadatas';
import type { VocabKey } from '../config/translations';

import { isValidBlogTaxonomy } from './taxonomyConvention';
import { prefixFeedback } from '../lib/feedbacksMerge';
import formatMessage from '../config/formatMessage';
import { LIST_ELEMENT_PREFIX } from '../config';

const ERROR_PREFIX = formatMessage('failedToPassThePrebuild' satisfies VocabKey);

// https://github.com/vitest-dev/vitest/discussions/2484
const fs = require('fs/promises');

export default async function sysBlogCategoriesValidator(postsFolder: string): Promise<MaybeEmptyErrorsDetectionFeedback> {
  let feedback = '';

  const categoriesWithDefects = [];
  const maybeCategories = await fs.readdir(postsFolder, { withFileTypes: true });

  for (const maybeCategory of maybeCategories) {
    if (!maybeCategory.isDirectory()) continue;
    const category = maybeCategory.name;
    if (!isValidBlogTaxonomy(category)) {
      categoriesWithDefects.push(category);
    }
  }

  if (categoriesWithDefects.length > 0) {
    feedback +=
      formatMessage('invalidCategories' satisfies VocabKey, { count: categoriesWithDefects.length }) +
      ' ' +
      (categoriesWithDefects.length === 1 ? `${categoriesWithDefects}` : `${LIST_ELEMENT_PREFIX}${categoriesWithDefects.join(LIST_ELEMENT_PREFIX)}`) +
      '\n' +
      formatMessage('namingConstraint' satisfies VocabKey) +
      '\n';
  }

  feedback = prefixFeedback(feedback, ERROR_PREFIX + '\n');
  return feedback;
}
