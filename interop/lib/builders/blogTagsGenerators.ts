type EmptyString = '';
const emptyString: EmptyString = '';

export const generateIndexedBlogTagOptions = <T extends readonly string[]>(blogTagOptions: T): Record<T[number], number> =>
  blogTagOptions.reduce(
    (acc, tag, index) => {
      acc[tag] = index;
      return acc;
    },
    {} as Record<string, number>
  ) as Record<T[number], number>;

export const generateBlogTagOptionsVocabSchema = <T extends readonly string[]>(blogTagOptions: T): Record<T[number], EmptyString> =>
  blogTagOptions.reduce(
    (acc, tag) => {
      acc[tag] = emptyString;
      return acc;
    },
    {} as Record<string, EmptyString>
  ) as Record<T[number], EmptyString>;
