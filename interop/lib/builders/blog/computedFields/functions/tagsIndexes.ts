import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { BlogTag } from '##/config/contentlayer/blog/blogTags';

import { indexedBlogTagOptions, InvalidBlogTag } from '../../../unifiedImport';

/**
 * @throws {InvalidBlogTag}
 */
function buildBlogTagsIndexesFromPostObj(post: DocumentToCompute): number[] {
  const tagsArray = post.tags._array as BlogTag[];
  const res: number[] = [];
  const defects: string[] = [];

  for (const tag of tagsArray) {
    if (indexedBlogTagOptions[tag] === undefined) {
      defects.push(tag);
      continue;
    }
    res.push(indexedBlogTagOptions[tag]);
  }

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (defects.length > 0) throw new InvalidBlogTag(defects);

  return res.sort((a, b) => a - b);
}

const buildBlogTagsIndexes = (post: DocumentToCompute): number[] => buildBlogTagsIndexesFromPostObj(post);

export default buildBlogTagsIndexes;
