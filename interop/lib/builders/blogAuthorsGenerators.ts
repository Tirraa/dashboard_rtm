import type { EmptyString } from '@rtm/shared-types/CustomUtilityTypes';
import type { Index, Id } from '@rtm/shared-types/Numbers';

const emptyString: EmptyString = '';

export const generateIndexedAuthorNames = <T extends readonly string[]>(authorNames: T): Record<T[Index], Id> =>
  authorNames.reduce(
    (acc, tag, index) => {
      acc[tag] = index;
      return acc;
    },
    {} as Record<string, Id>
  ) as Record<T[Index], Id>;

export const generateBlogAuthorOptionsVocabSchema = <T extends readonly string[]>(authorNames: T): Record<T[Index], AuthorVocabArborescence> =>
  authorNames.reduce(
    (acc, tag) => {
      acc[tag] = { bio: emptyString };
      return acc;
    },
    {} as Record<string, AuthorVocabArborescence>
  ) as Record<T[Index], AuthorVocabArborescence>;

type AuthorVocabArborescence = { bio: EmptyString };
