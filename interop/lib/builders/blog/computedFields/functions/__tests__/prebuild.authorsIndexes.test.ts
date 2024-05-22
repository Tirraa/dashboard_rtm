import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { Index, Id } from '@rtm/shared-types/Numbers';

import { describe, expect, it } from 'vitest';

import buildBlogAuthorsIndexes from '../authorsIndexes';

const fakeAuthorNames = ['fake_author_one', 'fake_author_two', 'fake_author_three'] as const;

const fakeIndexedAuthorNames = fakeAuthorNames.reduce(
  (acc, tag, index) => {
    acc[tag] = index;
    return acc;
  },
  {} as Record<string, Id>
) as Record<FakeBlogAuthor, Id>;

describe('buildBlogAuthorsIndexes (happy path)', () => {
  it('should return a valid tag indexes array, given valid tagsArray', () => {
    const authorsArray: FakeBlogAuthor[] = ['fake_author_two', 'fake_author_one'];

    const partialFakePost = {
      authors: {
        _array: authorsArray
      }
    } satisfies Pick<DocumentToCompute, 'authors'> as Partial<DocumentToCompute> as DocumentToCompute;

    const authorsIndexes = buildBlogAuthorsIndexes(partialFakePost, fakeIndexedAuthorNames, fakeAuthorNames);

    // eslint-disable-next-line no-magic-numbers
    expect(authorsIndexes).toStrictEqual([1, 0]);
  });
});

describe('buildBlogAuthorsIndexes (unhappy path, duplicate authors)', () => {
  it('should throw an error message, given one duplicate author', () => {
    // eslint-disable-next-line no-magic-numbers
    expect.assertions(1);

    const authorsArray: FakeBlogAuthor[] = ['fake_author_two', 'fake_author_one', 'fake_author_two'];

    const partialFakePost = {
      authors: {
        _array: authorsArray
      }
    } satisfies Pick<DocumentToCompute, 'authors'> as Partial<DocumentToCompute> as DocumentToCompute;

    try {
      buildBlogAuthorsIndexes(partialFakePost, fakeIndexedAuthorNames, fakeAuthorNames);
    } catch (e) {
      expect(e).toBe('BlogAuthorDuplicatesError: “fake_author_two” is defined several times.');
    }
  });

  it('should throw an error message, given many duplicate authors', () => {
    // eslint-disable-next-line no-magic-numbers
    expect.assertions(1);

    const authorsArray: FakeBlogAuthor[] = ['fake_author_one', 'fake_author_one', 'fake_author_two', 'fake_author_two', 'fake_author_three'];

    const partialFakePost = {
      authors: {
        _array: authorsArray
      }
    } satisfies Pick<DocumentToCompute, 'authors'> as Partial<DocumentToCompute> as DocumentToCompute;

    try {
      buildBlogAuthorsIndexes(partialFakePost, fakeIndexedAuthorNames, fakeAuthorNames);
    } catch (e) {
      expect(e).toBe('BlogAuthorDuplicatesError: [“fake_author_one”, “fake_author_two”] are defined several times.');
    }
  });
});

describe('buildBlogAuthorsIndexes (unhappy path, unknown authors)', () => {
  it('should throw an error message, given an unknown author', () => {
    // eslint-disable-next-line no-magic-numbers
    expect.assertions(1);

    // @ts-expect-error
    const authorsArray: FakeBlogAuthor[] = ['fake_author_one', 'fake_author_two', 'fake_author_three', '__UNKNOWN__'];

    const partialFakePost = {
      authors: {
        _array: authorsArray
      }
    } satisfies Pick<DocumentToCompute, 'authors'> as Partial<DocumentToCompute> as DocumentToCompute;

    try {
      buildBlogAuthorsIndexes(partialFakePost, fakeIndexedAuthorNames, fakeAuthorNames);
    } catch (e) {
      expect(e).toBe(`InvalidBlogAuthorError: Invalid author: “__UNKNOWN__”
  Valid authors are: [“fake_author_one”, “fake_author_two”, “fake_author_three”]`);
    }
  });

  it('should throw an error message, given unknown authors', () => {
    // eslint-disable-next-line no-magic-numbers
    expect.assertions(1);

    // @ts-expect-error
    const authorsArray: FakeBlogAuthor[] = ['fake_author_one', 'fake_author_two', 'fake_author_three', '__UNKNOWN__', '__UNKNOWN_2__'];

    const partialFakePost = {
      authors: {
        _array: authorsArray
      }
    } satisfies Pick<DocumentToCompute, 'authors'> as Partial<DocumentToCompute> as DocumentToCompute;

    try {
      buildBlogAuthorsIndexes(partialFakePost, fakeIndexedAuthorNames, fakeAuthorNames);
    } catch (e) {
      expect(e).toBe(`InvalidBlogAuthorError: Invalid authors: [“__UNKNOWN__”, “__UNKNOWN_2__”]
  Valid authors are: [“fake_author_one”, “fake_author_two”, “fake_author_three”]`);
    }
  });
});

describe('buildBlogAuthorsIndexes (unhappy path, unknown authors and duplicate authors)', () => {
  it('should throw an error message, given an unknown author and one duplicate', () => {
    // eslint-disable-next-line no-magic-numbers
    expect.assertions(1);

    // @ts-expect-error
    const authorsArray: FakeBlogAuthor[] = ['fake_author_one', 'fake_author_two', 'fake_author_two', 'fake_author_three', '__UNKNOWN__'];

    const partialFakePost = {
      authors: {
        _array: authorsArray
      }
    } satisfies Pick<DocumentToCompute, 'authors'> as Partial<DocumentToCompute> as DocumentToCompute;

    try {
      buildBlogAuthorsIndexes(partialFakePost, fakeIndexedAuthorNames, fakeAuthorNames);
    } catch (e) {
      expect(e).toBe(`InvalidBlogAuthorError: Invalid author: “__UNKNOWN__”
  Valid authors are: [“fake_author_one”, “fake_author_two”, “fake_author_three”]
• BlogAuthorDuplicatesError: “fake_author_two” is defined several times.`);
    }
  });

  it('should throw an error message, given unknown authors and several duplicates', () => {
    // eslint-disable-next-line no-magic-numbers
    expect.assertions(1);

    const authorsArray: FakeBlogAuthor[] = [
      'fake_author_one',
      'fake_author_two',
      'fake_author_two',
      'fake_author_three',
      // @ts-expect-error
      '__UNKNOWN__',
      // @ts-expect-error
      '__UNKNOWN_2__'
    ];

    const partialFakePost = {
      authors: {
        _array: authorsArray
      }
    } satisfies Pick<DocumentToCompute, 'authors'> as Partial<DocumentToCompute> as DocumentToCompute;

    try {
      buildBlogAuthorsIndexes(partialFakePost, fakeIndexedAuthorNames, fakeAuthorNames);
    } catch (e) {
      expect(e).toBe(`InvalidBlogAuthorError: Invalid authors: [“__UNKNOWN__”, “__UNKNOWN_2__”]
  Valid authors are: [“fake_author_one”, “fake_author_two”, “fake_author_three”]
• BlogAuthorDuplicatesError: “fake_author_two” is defined several times.`);
    }
  });
});

type FakeBlogAuthor = (typeof fakeAuthorNames)[Index];
