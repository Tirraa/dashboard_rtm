import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { Index, Id } from '@rtm/shared-types/Numbers';

import { describe, expect, it } from 'vitest';

import buildBlogTagsIndexes from '../tagsIndexes';

const fakeBlogTags = ['fake_tag_one', 'fake_tag_two', 'fake_tag_three', 'uniq_fake_tag_startswith_suggest'] as const;

const damerauThreshold = 3;

const fakeIndexedBlogTagOptions = fakeBlogTags.reduce(
  (acc, tag, index) => {
    acc[tag] = index;
    return acc;
  },
  {} as Record<string, Id>
) as Record<FakeBlogTag, Id>;

describe('buildBlogTagsIndexes (happy path)', () => {
  it('should return a valid tag indexes array, given valid tagsArray', () => {
    const tagsArray = ['fake_tag_two', 'fake_tag_one'];

    const partialFakePost = {
      tags: {
        _array: tagsArray
      }
    } satisfies Pick<DocumentToCompute, 'tags'> as Partial<DocumentToCompute> as DocumentToCompute;

    const tagsIndexes = buildBlogTagsIndexes(partialFakePost, fakeIndexedBlogTagOptions, fakeBlogTags, damerauThreshold);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(tagsIndexes).toStrictEqual([1, 0]);
  });
});

describe('buildBlogTagsIndexes (unhappy path, duplicate tags)', () => {
  it('should throw an error message, given one duplicate tag', () => {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(1);

    const tagsArray = ['fake_tag_one', 'fake_tag_one', 'fake_tag_two'];

    const partialFakePost = {
      tags: {
        _array: tagsArray
      }
    } satisfies Pick<DocumentToCompute, 'tags'> as Partial<DocumentToCompute> as DocumentToCompute;

    try {
      buildBlogTagsIndexes(partialFakePost, fakeIndexedBlogTagOptions, fakeBlogTags, damerauThreshold);
    } catch (e) {
      expect(e).toBe(`BlogTagDuplicatesError: “fake_tag_one” is defined several times.`);
    }
  });

  it('should throw an error message, given many duplicate tags', () => {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(1);

    const tagsArray = ['fake_tag_one', 'fake_tag_one', 'fake_tag_two', 'fake_tag_two', 'fake_tag_three'];

    const partialFakePost = {
      tags: {
        _array: tagsArray
      }
    } satisfies Pick<DocumentToCompute, 'tags'> as Partial<DocumentToCompute> as DocumentToCompute;

    try {
      buildBlogTagsIndexes(partialFakePost, fakeIndexedBlogTagOptions, fakeBlogTags, damerauThreshold);
    } catch (e) {
      expect(e).toBe(`BlogTagDuplicatesError: [“fake_tag_one”, “fake_tag_two”] are defined several times.`);
    }
  });
});

describe('buildBlogTagsIndexes (unhappy path, unknown tags without suggestion)', () => {
  it('should throw an error message, given one unknown tag', () => {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(1);

    const tagsArray = ['tag_one'];

    const partialFakePost = {
      tags: {
        _array: tagsArray
      }
    } satisfies Pick<DocumentToCompute, 'tags'> as Partial<DocumentToCompute> as DocumentToCompute;

    try {
      buildBlogTagsIndexes(partialFakePost, fakeIndexedBlogTagOptions, fakeBlogTags, damerauThreshold);
    } catch (e) {
      expect(e).toBe(`InvalidBlogTagError: Invalid blog tag detected!
◦ “tag_one” doesn't exist. No suggestion found.`);
    }
  });

  it('should throw an error message, given many unknown tags', () => {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(1);

    const tagsArray = ['tag_one', 'tag_two', 'tag_three'];

    const partialFakePost = {
      tags: {
        _array: tagsArray
      }
    } satisfies Pick<DocumentToCompute, 'tags'> as Partial<DocumentToCompute> as DocumentToCompute;

    try {
      buildBlogTagsIndexes(partialFakePost, fakeIndexedBlogTagOptions, fakeBlogTags, damerauThreshold);
    } catch (e) {
      expect(e).toBe(`InvalidBlogTagError: Invalid blog tags detected!
◦ [“tag_one”, “tag_two”, “tag_three”] don't exist. No suggestion found.`);
    }
  });
});

describe('buildBlogTagsIndexes (unhappy path, unknown tags with suggestions)', () => {
  it('should throw an error message, given one unknown tag, StartsWith', () => {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(1);

    const tagsArray = ['uniq_fake_tag_startswith'];

    const partialFakePost = {
      tags: {
        _array: tagsArray
      }
    } satisfies Pick<DocumentToCompute, 'tags'> as Partial<DocumentToCompute> as DocumentToCompute;

    try {
      buildBlogTagsIndexes(partialFakePost, fakeIndexedBlogTagOptions, fakeBlogTags, damerauThreshold);
    } catch (e) {
      expect(e).toBe(`InvalidBlogTagError: Invalid blog tag detected!
◦ “uniq_fake_tag_startswith” doesn't exist, did you mean: “uniq_fake_tag_startswith_suggest”?`);
    }
  });

  it('should throw an error message, given one unknown tag, Damerau', () => {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(1);

    const tagsArray = ['fake_tag_oen'];

    const partialFakePost = {
      tags: {
        _array: tagsArray
      }
    } satisfies Pick<DocumentToCompute, 'tags'> as Partial<DocumentToCompute> as DocumentToCompute;

    try {
      buildBlogTagsIndexes(partialFakePost, fakeIndexedBlogTagOptions, fakeBlogTags, damerauThreshold);
    } catch (e) {
      expect(e).toBe(`InvalidBlogTagError: Invalid blog tag detected!
◦ “fake_tag_oen” doesn't exist, did you mean: “fake_tag_one”?`);
    }
  });
});

describe('buildBlogTagsIndexes (unhappy path, error combinations)', () => {
  it('should throw an error message, given many duplicate tags', () => {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(1);

    const tagsArray = ['fake_tag', 'fake_tag_oen', 'fake_tag_oen', 'fake_tag_one', 'fake_tag_one', 'fake_tag_two', 'fake_tag_two', 'fake_tag_three'];

    const partialFakePost = {
      tags: {
        _array: tagsArray
      }
    } satisfies Pick<DocumentToCompute, 'tags'> as Partial<DocumentToCompute> as DocumentToCompute;

    try {
      buildBlogTagsIndexes(partialFakePost, fakeIndexedBlogTagOptions, fakeBlogTags, damerauThreshold);
    } catch (e) {
      expect(e).toBe(`InvalidBlogTagError: Invalid blog tags detected!
◦ “fake_tag” doesn't exist, did you mean: “fake_tag_one”, or “fake_tag_two”, or “fake_tag_three”?
◦ “fake_tag_oen” doesn't exist, did you mean: “fake_tag_one”?
• BlogTagDuplicatesError: [“fake_tag_oen”, “fake_tag_one”, “fake_tag_two”] are defined several times.`);
    }
  });
});

type FakeBlogTag = (typeof fakeBlogTags)[Index];
