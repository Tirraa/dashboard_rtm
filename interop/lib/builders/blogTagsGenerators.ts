import type { BlogTag } from '../../config/contentlayer/blog/blogTags';

import { blogTagOptions } from '../../config/contentlayer/blog/blogTags';

type EmptyString = '';
const emptyString: EmptyString = '';

export const generateIndexedBlogTagOptions = (__BLOG_TAG_OPTIONS: readonly BlogTag[] = blogTagOptions): Record<BlogTag, number> =>
  __BLOG_TAG_OPTIONS.reduce(
    (acc, tag, index) => {
      acc[tag] = index;
      return acc;
    },
    {} as Record<string, number>
  ) as Record<BlogTag, number>;

export const generateBlogTagOptionsVocabSchema = (__BLOG_TAG_OPTIONS: readonly BlogTag[] = blogTagOptions): Record<BlogTag, EmptyString> =>
  __BLOG_TAG_OPTIONS.reduce(
    (acc, tag) => {
      acc[tag] = emptyString;
      return acc;
    },
    {} as Record<string, string>
  ) as Record<BlogTag, EmptyString>;
