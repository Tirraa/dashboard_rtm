import type { MaybeEmptyErrorsDetectionFeedback, Filename, Path } from '../types/Metadatas';
import type { VocabKey } from '../config/translations';

import { MAX_BLOG_TAXONOMY_LEN, LIST_ELEMENT_PREFIX, BLOG_POST_FILE_EXT } from '../config';
import traverseAndMapFilepaths from '../lib/traverseAndMapFilepaths';
import { isValidBlogTaxonomy } from './taxonomyConvention';
import formatMessage from '../config/formatMessage';

export default async function sysBlogSlugsValidator(
  postsFolder: Path,
  __MAX_LEN: number = MAX_BLOG_TAXONOMY_LEN
): Promise<MaybeEmptyErrorsDetectionFeedback> {
  let feedback = '';

  const foldersWithDefects: Record<Path, Filename[]> = {};
  const filesCollection = await traverseAndMapFilepaths(postsFolder);

  for (const { name: filename, directory } of filesCollection) {
    const maybeSlug = filename;
    if (!maybeSlug.endsWith(BLOG_POST_FILE_EXT)) continue;

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const slug = maybeSlug.slice(0, -BLOG_POST_FILE_EXT.length);
    if (!isValidBlogTaxonomy(slug, __MAX_LEN)) {
      if (!foldersWithDefects[directory]) foldersWithDefects[directory] = [];
      foldersWithDefects[directory].push(slug);
    }
  }

  for (const [folderWithDefects, defects] of Object.entries(foldersWithDefects)) {
    if (feedback) feedback += '\n';
    feedback +=
      formatMessage('invalidSlugs' satisfies VocabKey, { count: defects.length, folderWithDefects }) +
      ' ' +
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      (defects.length === 1 ? `${defects}` : `${LIST_ELEMENT_PREFIX}${defects.join(LIST_ELEMENT_PREFIX)}`) +
      '\n' +
      formatMessage('blogNamingConstraint' satisfies VocabKey) +
      '\n';
  }
  return feedback;
}
