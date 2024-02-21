import type { MaybeEmptyErrorsDetectionFeedback, Path } from '../types/Metadatas';
import type { VocabKey } from '../config/translations';

import { isValidBlogTaxonomy } from './taxonomyConvention';
import formatMessage from '../config/formatMessage';
import { LIST_ELEMENT_PREFIX } from '../config';

// https://github.com/vitest-dev/vitest/discussions/2484
const fs = require('fs/promises');

export default async function sysBlogCategoriesValidator(postsFolder: Path): Promise<MaybeEmptyErrorsDetectionFeedback> {
  let feedback = '';

  const categoriesWithDefects = [];
  const maybeCategories = await fs.readdir(postsFolder, { withFileTypes: true });

  for (const maybeCategory of maybeCategories) {
    if (!maybeCategory.isDirectory()) continue;
    const category = maybeCategory.name;
    if (!isValidBlogTaxonomy(category)) categoriesWithDefects.push(category);
  }

  // eslint-disable-next-line no-magic-numbers
  if (categoriesWithDefects.length > 0) {
    feedback +=
      formatMessage('invalidCategories' satisfies VocabKey, { count: categoriesWithDefects.length }) +
      ' ' +
      // eslint-disable-next-line no-magic-numbers
      (categoriesWithDefects.length === 1 ? `${categoriesWithDefects}` : `${LIST_ELEMENT_PREFIX}${categoriesWithDefects.join(LIST_ELEMENT_PREFIX)}`) +
      '\n' +
      formatMessage('blogNamingConstraint' satisfies VocabKey) +
      '\n';
  }
  return feedback;
}
