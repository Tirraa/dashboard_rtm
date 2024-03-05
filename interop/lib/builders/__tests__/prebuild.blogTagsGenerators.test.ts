import type { EmptyString } from '@rtm/shared-types/CustomUtilityTypes';

import { describe, expect, it } from 'vitest';

import { generateBlogTagOptionsVocabSchema, generateIndexedBlogTagOptions } from '../blogTagsGenerators';

const emptyString: EmptyString = '';
const FAKE_BLOG_TAGS_OPTIONS = ['tag_one', 'tag_two', 'tag_three'] as const satisfies string[];

describe('generateBlogTagOptionsVocabSchema', () => {
  const blogTagOptionsVocabSchema = generateBlogTagOptionsVocabSchema(FAKE_BLOG_TAGS_OPTIONS);

  it('should return a valid vocab schema, given blog tags options', () => {
    expect(blogTagOptionsVocabSchema).toStrictEqual({
      tag_three: emptyString,
      tag_one: emptyString,
      tag_two: emptyString
    });
  });

  it('should return an empty dictionnary, given empty blog tags options', () => {
    expect(generateBlogTagOptionsVocabSchema([])).toStrictEqual({});
  });
});

describe('generateIndexedBlogTagOptions', () => {
  it('should return a valid indexes dictionnary, given blog tags options', () => {
    const indexedBlogTagOptions = generateIndexedBlogTagOptions(FAKE_BLOG_TAGS_OPTIONS);

    expect(indexedBlogTagOptions).toStrictEqual({
      tag_three: 2,
      tag_one: 0,
      tag_two: 1
    });
  });

  it('should return an empty dictionnary, given empty blog tags options', () => {
    expect(generateIndexedBlogTagOptions([])).toStrictEqual({});
  });
});
