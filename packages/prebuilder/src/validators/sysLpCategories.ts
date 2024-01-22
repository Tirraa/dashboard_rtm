import type { MaybeEmptyErrorsDetectionFeedback } from '../types/Metadatas';
import type { VocabKey } from '../config/translations';

import { isValidLpTaxonomy } from './taxonomyConvention';
import formatMessage from '../config/formatMessage';
import { LIST_ELEMENT_PREFIX } from '../config';

// https://github.com/vitest-dev/vitest/discussions/2484
const fs = require('fs/promises');

export default async function sysLpCategoriesValidator(lpFolder: string): Promise<MaybeEmptyErrorsDetectionFeedback> {
  let feedback = '';

  const categoriesWithDefects = [];
  const maybeCategories = await fs.readdir(lpFolder, { withFileTypes: true });

  for (const maybeCategory of maybeCategories) {
    if (!maybeCategory.isDirectory()) continue;
    const category = maybeCategory.name;
    if (!isValidLpTaxonomy(category)) categoriesWithDefects.push(category);
  }

  if (categoriesWithDefects.length > 0) {
    feedback +=
      formatMessage('invalidCategories' satisfies VocabKey, { count: categoriesWithDefects.length }) +
      ' ' +
      (categoriesWithDefects.length === 1 ? `${categoriesWithDefects}` : `${LIST_ELEMENT_PREFIX}${categoriesWithDefects.join(LIST_ELEMENT_PREFIX)}`) +
      '\n' +
      formatMessage('lpNamingConstraint' satisfies VocabKey) +
      '\n';
  }
  return feedback;
}