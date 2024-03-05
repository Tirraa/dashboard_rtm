import { describe, expect, it } from 'vitest';

import { generateBlogTagOptionsVocabSchema, generateIndexedBlogTagOptions } from '../blogTagsGenerators';

type EmptyString = '';

const emptyString: EmptyString = '';
const FAKE_BLOG_TAGS_OPTIONS: string[] = ['tag_one', 'tag_two', 'tag_three'] as const;

describe('generateBlogTagOptionsVocabSchema', () => {
  it('should return a valid vocab schema, given blog tags options', () => {
    expect(generateBlogTagOptionsVocabSchema(FAKE_BLOG_TAGS_OPTIONS as any)).toStrictEqual({
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
  it('should return a valid vocab schema, given blog tags options', () => {
    expect(generateIndexedBlogTagOptions(FAKE_BLOG_TAGS_OPTIONS as any)).toStrictEqual({
      tag_three: 2,
      tag_one: 0,
      tag_two: 1
    });
  });

  it('should return an empty dictionnary, given empty blog tags options', () => {
    expect(generateIndexedBlogTagOptions([])).toStrictEqual({});
  });
});
