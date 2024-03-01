type EmptyString = '';
const emptyString: EmptyString = '';

export const blogTagOptions = ['tag_one', 'tag_two'] as const;

export const indexedBlogTagOptions = blogTagOptions.reduce(
  (acc, tag, index) => {
    acc[tag] = index;
    return acc;
  },
  {} as { [key: string]: number }
) as Record<BlogTag, number>;

export const blogTagOptionsVocabSchema = blogTagOptions.reduce(
  (acc, tag) => {
    acc[tag] = emptyString;
    return acc;
  },
  {} as Record<string, string>
) as Record<BlogTag, EmptyString>;

export type BlogTag = (typeof blogTagOptions)[number];
