import type { EmptyString } from '@rtm/shared-types/CustomUtilityTypes';
import type { Index, Id } from '@rtm/shared-types/Numbers';

const emptyString: EmptyString = '';

export const generateIndexedBlogTagOptions = <T extends readonly string[]>(blogTagOptions: T): Record<T[Index], Id> =>
  blogTagOptions.reduce(
    (acc, tag, index) => {
      acc[tag] = index;
      return acc;
    },
    {} as Record<string, Id>
  ) as Record<T[Index], Id>;

export const generateBlogTagOptionsVocabSchema = <T extends readonly string[]>(blogTagOptions: T): Record<T[Index], EmptyString> =>
  blogTagOptions.reduce(
    (acc, tag) => {
      acc[tag] = emptyString;
      return acc;
    },
    {} as Record<string, EmptyString>
  ) as Record<T[Index], EmptyString>;
