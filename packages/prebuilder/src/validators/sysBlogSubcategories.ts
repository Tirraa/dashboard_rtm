import type { MaybeEmptyErrorsDetectionFeedback, BlogSubcategory, BlogCategory, Path } from '../types/Metadatas';
import type { VocabKey } from '../config/translations';

import { isValidBlogTaxonomy } from './taxonomyConvention';
import formatMessage from '../config/formatMessage';
import { LIST_ELEMENT_PREFIX } from '../config';

// https://github.com/vitest-dev/vitest/discussions/2484
const fs = require('fs/promises');
const path = require('path');

export default async function sysBlogSubcategoriesValidator(postsFolder: Path): Promise<MaybeEmptyErrorsDetectionFeedback> {
  let feedback = '';

  const categoriesWithDefects: Record<BlogCategory, BlogSubcategory[]> = {};
  const categoriesCollection = await fs.readdir(postsFolder, { withFileTypes: true });

  for (const maybeCategory of categoriesCollection) {
    if (!maybeCategory.isDirectory()) continue;
    const category = maybeCategory.name;
    const maybeSubcategories = await fs.readdir(path.join(maybeCategory.path, maybeCategory.name), { withFileTypes: true });

    for (const maybeSubcategory of maybeSubcategories) {
      if (!maybeSubcategory.isDirectory()) continue;
      const subcategory = maybeSubcategory.name;
      if (!isValidBlogTaxonomy(subcategory)) {
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
      formatMessage('blogNamingConstraint' satisfies VocabKey) +
      '\n';
  });
  return feedback;
}
