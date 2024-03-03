type EmptyString = '';
const emptyString: EmptyString = '';

const _blogTagOptions = ['tag_one', 'tag_two', 'tag_three'] as const satisfies string[];

export const blogTagOptions = [..._blogTagOptions].sort() as readonly BlogTag[];

export const indexedBlogTagOptions = blogTagOptions.reduce(
  (acc, tag, index) => {
    acc[tag] = index;
    return acc;
  },
  {} as Record<string, number>
) as Record<BlogTag, number>;

export const blogTagOptionsVocabSchema = blogTagOptions.reduce(
  (acc, tag) => {
    acc[tag] = emptyString;
    return acc;
  },
  {} as Record<string, string>
) as Record<BlogTag, EmptyString>;

export type BlogTag = (typeof _blogTagOptions)[number];
