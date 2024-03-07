import type { MaybeEmptyErrorsDetectionFeedback, ErrorsDetectionFeedback, BlogSubcategory, BlogCategory, Path } from '../types/Metadatas';
import type { VocabKey } from '../config/translations';

import { MAX_BLOG_TAXONOMY_LEN, LIST_ELEMENT_PREFIX } from '../config';
import { isValidBlogTaxonomy } from './taxonomyConvention';
import formatMessage from '../config/formatMessage';

// https://github.com/vitest-dev/vitest/discussions/2484
const fs = require('fs/promises');
const path = require('path');

export default async function sysBlogSubcategoriesValidator(
  postsFolder: Path,
  __MAX_LEN: number = MAX_BLOG_TAXONOMY_LEN
): Promise<MaybeEmptyErrorsDetectionFeedback> {
  let feedback: ErrorsDetectionFeedback = '';

  const categoriesWithDefects: Record<BlogCategory, BlogSubcategory[]> = {};
  const categoriesCollection = await fs.readdir(postsFolder, { withFileTypes: true });

  for (const maybeCategory of categoriesCollection) {
    if (!maybeCategory.isDirectory()) continue;
    const category = maybeCategory.name;
    const maybeSubcategories = await fs.readdir(path.join(maybeCategory.path, maybeCategory.name), { withFileTypes: true });

    for (const maybeSubcategory of maybeSubcategories) {
      if (!maybeSubcategory.isDirectory()) continue;
      const subcategory = maybeSubcategory.name;
      if (!isValidBlogTaxonomy(subcategory, __MAX_LEN)) {
        if (categoriesWithDefects[category] === undefined) categoriesWithDefects[category] = [];
        categoriesWithDefects[category].push(subcategory);
      }
    }
  }

  for (const [categoryWithDefects, defects] of Object.entries(categoriesWithDefects)) {
    if (feedback) feedback += '\n';

    feedback +=
      formatMessage('invalidSubcategories' satisfies VocabKey, { count: defects.length, categoryWithDefects }) +
      ' ' +
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      (defects.length === 1 ? `${defects}` : `${LIST_ELEMENT_PREFIX}${defects.join(LIST_ELEMENT_PREFIX)}`) +
      '\n' +
      formatMessage('blogNamingConstraint' satisfies VocabKey) +
      '\n';
  }

  return feedback;
}
