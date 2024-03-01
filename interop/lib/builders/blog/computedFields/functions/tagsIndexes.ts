import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { BlogTag } from '##/config/contentlayer/blog/blogTags';

import { indexedBlogTagOptions, InvalidBlogTag } from '../../../unifiedImport';

/**
 * @throws {InvalidBlogTag}
 */
function buildBlogTagsIndexesFromPostObj(post: DocumentToCompute, __INDEXED_BLOG_TAG_OPTIONS: Record<BlogTag, number>): number[] {
  const tagsArray = post.tags._array as BlogTag[];
  const res: number[] = [];
  const defects: string[] = [];

  // {ToDo} Also check for duplicates here, throw both errors in a list if needed
  tagsArray;

  const tagsArrayUniq = Array.from(new Set<string>(post.tags._array as BlogTag[])) as BlogTag[];

  for (const tag of tagsArrayUniq) {
    if (__INDEXED_BLOG_TAG_OPTIONS[tag] === undefined) {
      defects.push(tag);
      continue;
    }
    res.push(__INDEXED_BLOG_TAG_OPTIONS[tag]);
  }

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (defects.length > 0) throw new InvalidBlogTag(defects);

  return res.sort((a, b) => a - b);
}

// {ToDo} Write tests
const buildBlogTagsIndexes = (post: DocumentToCompute, __INDEXED_BLOG_TAG_OPTIONS: Record<BlogTag, number> = indexedBlogTagOptions): number[] =>
  buildBlogTagsIndexesFromPostObj(post, __INDEXED_BLOG_TAG_OPTIONS);

export default buildBlogTagsIndexes;
