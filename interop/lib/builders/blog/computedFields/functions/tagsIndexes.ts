import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { BlogTag } from '##/config/contentlayer/blog/blogTags';

import {
  DAMERAU_LEVENSHTEIN_THRESHOLD,
  indexedBlogTagOptions,
  BlogTagDuplicates,
  InvalidBlogTag,
  blogTagOptions,
  BULLET
} from '../../../unifiedImport';

function validateTagNames(
  tagsArrayUniq: BlogTag[],
  __INDEXED_BLOG_TAG_OPTIONS: Record<string, number>,
  __BLOG_TAGS_OPTIONS: readonly string[],
  __DAMERAU_THRESHOLD: number
): MaybeNull<InvalidBlogTag> {
  const defects: string[] = [];

  for (const tag of tagsArrayUniq) {
    if (__INDEXED_BLOG_TAG_OPTIONS[tag] === undefined) {
      defects.push(tag);
      continue;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (defects.length > 0) return new InvalidBlogTag(defects, __BLOG_TAGS_OPTIONS, __DAMERAU_THRESHOLD);
  return null;
}

function validateTagNoDuplicates(tagsArray: BlogTag[]): MaybeNull<BlogTagDuplicates> {
  const tagsMemory: unknown[] = [];
  const duplicatesSet = new Set<unknown>();

  for (const currentTag of tagsArray) {
    if (tagsMemory.includes(currentTag)) {
      duplicatesSet.add(currentTag);
      continue;
    }
    tagsMemory.push(currentTag);
  }

  const duplicates = Array.from(duplicatesSet);
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (duplicates.length > 0) return new BlogTagDuplicates(duplicates);
  return null;
}

/**
 * @throws {[InvalidBlogTag, BlogTagDuplicates]}
 */
function buildBlogTagsIndexesFromPostObj(
  tagsArray: BlogTag[],
  __INDEXED_BLOG_TAG_OPTIONS: Record<string, number>,
  __BLOG_TAGS_OPTIONS: readonly string[],
  __DAMERAU_THRESHOLD: number
): number[] {
  const tagsArrayUniq = Array.from(new Set<BlogTag>(tagsArray));

  const maybeValidateTagNamesError = validateTagNames(tagsArrayUniq, __INDEXED_BLOG_TAG_OPTIONS, __BLOG_TAGS_OPTIONS, __DAMERAU_THRESHOLD);
  const maybeValidateTagNoDuplicatesError = validateTagNoDuplicates(tagsArray);

  const mergedErrors = [maybeValidateTagNamesError, maybeValidateTagNoDuplicatesError].filter((e) => e !== null);

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (mergedErrors.length > 0) throw mergedErrors.join('\n' + BULLET + ' ');

  const res: number[] = [];
  for (const tag of tagsArrayUniq) res.push(__INDEXED_BLOG_TAG_OPTIONS[tag]);

  return res.sort((a, b) => a - b);
}

const buildBlogTagsIndexes = (
  post: DocumentToCompute,
  __INDEXED_BLOG_TAG_OPTIONS: Record<string, number> = indexedBlogTagOptions,
  __BLOG_TAGS_OPTIONS: readonly string[] = blogTagOptions,
  __DAMERAU_THRESHOLD: number = DAMERAU_LEVENSHTEIN_THRESHOLD
): number[] => buildBlogTagsIndexesFromPostObj(post.tags._array as BlogTag[], __INDEXED_BLOG_TAG_OPTIONS, __BLOG_TAGS_OPTIONS, __DAMERAU_THRESHOLD);

export default buildBlogTagsIndexes;
