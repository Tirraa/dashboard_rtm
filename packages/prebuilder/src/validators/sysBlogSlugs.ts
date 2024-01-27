import type { MaybeEmptyErrorsDetectionFeedback, Filename, Path } from '../types/Metadatas';
import type { VocabKey } from '../config/translations';

import traverseAndMapFilepaths from '../lib/traverseAndMapFilepaths';
import { LIST_ELEMENT_PREFIX, BLOG_POST_FILE_EXT } from '../config';
import { isValidBlogTaxonomy } from './taxonomyConvention';
import formatMessage from '../config/formatMessage';

export default async function sysBlogSlugsValidator(postsFolder: Path): Promise<MaybeEmptyErrorsDetectionFeedback> {
  let feedback = '';

  const foldersWithDefects: Record<Path, Filename[]> = {};
  const filesCollection = await traverseAndMapFilepaths(postsFolder);

  for (const { name: filename, directory } of filesCollection) {
    const maybeSlug = filename;
    if (!maybeSlug.endsWith(BLOG_POST_FILE_EXT)) continue;

    const slug = maybeSlug.slice(0, -BLOG_POST_FILE_EXT.length);
    if (!isValidBlogTaxonomy(slug)) {
      if (!foldersWithDefects[directory]) foldersWithDefects[directory] = [];
      foldersWithDefects[directory].push(slug);
    }
  }

  Object.entries(foldersWithDefects).forEach(([folderWithDefects, defects]) => {
    if (feedback) feedback += '\n';
    feedback +=
      formatMessage('invalidSlugs' satisfies VocabKey, { count: defects.length, folderWithDefects }) +
      ' ' +
      (defects.length === 1 ? `${defects}` : `${LIST_ELEMENT_PREFIX}${defects.join(LIST_ELEMENT_PREFIX)}`) +
      '\n' +
      formatMessage('blogNamingConstraint' satisfies VocabKey) +
      '\n';
  });
  return feedback;
}
