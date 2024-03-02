import { describe, expect, it } from 'vitest';

import InvalidBlogTag from '../InvalidBlogTag';

const fakeBlogTags = [
  'fake_tag_one',
  'fake_tag_two',
  'overlap_tset_',
  'overlap_test_one',
  'overlap_test_one_long',
  'overlap_test_one_long_long',
  'overlap_test_one_long_long_long'
];

describe('InvalidBlogTag (unknown tags)', () => {
  it('should generate an error message with hint (1 unknown tag)', () => {
    const unknownTag = 'sqdjqkdjqskdjqskdjqkdjq';
    const FAKE_ERROR = new InvalidBlogTag([unknownTag], fakeBlogTags);

    expect(FAKE_ERROR.message).toBe(`Invalid blog tag detected!
◦ “sqdjqkdjqskdjqskdjqkdjq” doesn't exist. No suggestion found.`);
  });

  it('should generate an error message with hint (many unknown tags)', () => {
    const unknownTags = ['sqdjqkdjqskdjqskdjqkdjq', 'sdkqldkqldkqldkqldkqqskdlqkdql'];
    const FAKE_ERROR = new InvalidBlogTag(unknownTags, fakeBlogTags);

    expect(FAKE_ERROR.message).toBe(`Invalid blog tags detected!
◦ [“sqdjqkdjqskdjqskdjqkdjq”, “sdkqldkqldkqldkqldkqqskdlqkdql”] don't exist. No suggestion found.`);
  });
});

describe('InvalidBlogTag (suggestions)', () => {
  it('should generate an error message with hint (1 unknown tag, Damerau)', () => {
    const unknownTag = 'fake_tag_oen';
    const FAKE_ERROR = new InvalidBlogTag([unknownTag], fakeBlogTags);

    expect(FAKE_ERROR.message).toBe(`Invalid blog tag detected!
◦ “fake_tag_oen” doesn't exist, did you mean: “fake_tag_one”?`);
  });

  it('should generate an error message with hint (many unknown tags, Damerau)', () => {
    const unknownTags = ['fake_tag_oen', 'fake_tag_tow'];
    const FAKE_ERROR = new InvalidBlogTag(unknownTags, fakeBlogTags);

    expect(FAKE_ERROR.message).toBe(`Invalid blog tags detected!
◦ “fake_tag_oen” doesn't exist, did you mean: “fake_tag_one”?
◦ “fake_tag_tow” doesn't exist, did you mean: “fake_tag_two”?`);
  });

  it('should generate an error message with hint (1 unknown tag, StartsWith)', () => {
    const unknownTag = 'fake';
    const FAKE_ERROR = new InvalidBlogTag([unknownTag], fakeBlogTags);

    expect(FAKE_ERROR.message).toBe(`Invalid blog tag detected!
◦ “fake” doesn't exist, did you mean: “fake_tag_one”, or “fake_tag_two”?`);
  });

  it('should generate an error message with hint (many unknown tags, StartsWith)', () => {
    const unknownTags = ['fake', 'fake_'];
    const FAKE_ERROR = new InvalidBlogTag(unknownTags, fakeBlogTags);

    expect(FAKE_ERROR.message).toBe(`Invalid blog tags detected!
◦ “fake” doesn't exist, did you mean: “fake_tag_one”, or “fake_tag_two”?
◦ “fake_” doesn't exist, did you mean: “fake_tag_one”, or “fake_tag_two”?`);
  });
});

describe('InvalidBlogTag (both suggestions and unknown tags)', () => {
  it('should generate an error message with hint (1 unknown tag, 1 tag with suggestions)', () => {
    const unknownTags = ['fake_tag_oen', 'dsqkdkqsldsqkdjsqkdjsqkdjq'];
    const FAKE_ERROR = new InvalidBlogTag(unknownTags, fakeBlogTags);

    expect(FAKE_ERROR.message).toBe(`Invalid blog tags detected!
◦ “fake_tag_oen” doesn't exist, did you mean: “fake_tag_one”?
◦ “dsqkdkqsldsqkdjsqkdjsqkdjq” doesn't exist. No suggestion found.`);
  });

  it('should generate an error message with hint (many unknown tags, 1 tag with suggestions)', () => {
    const unknownTags = ['fake_tag_oen', 'dsqkdkqsldsqkdjsqkdjsqkdjq', 'dsqldsqldksqdlqskdlqsksdq'];
    const FAKE_ERROR = new InvalidBlogTag(unknownTags, fakeBlogTags);

    expect(FAKE_ERROR.message).toBe(`Invalid blog tags detected!
◦ “fake_tag_oen” doesn't exist, did you mean: “fake_tag_one”?
◦ [“dsqkdkqsldsqkdjsqkdjsqkdjq”, “dsqldsqldksqdlqskdlqsksdq”] don't exist. No suggestion found.`);
  });

  it('should generate an error message with hint (1 unknown tag, many tags with suggestions)', () => {
    const unknownTags = ['fake_tag_oen', 'fake_tag_tow', 'dsqkdkqsldsqkdjsqkdjsqkdjq'];
    const FAKE_ERROR = new InvalidBlogTag(unknownTags, fakeBlogTags);

    expect(FAKE_ERROR.message).toBe(`Invalid blog tags detected!
◦ “fake_tag_oen” doesn't exist, did you mean: “fake_tag_one”?
◦ “fake_tag_tow” doesn't exist, did you mean: “fake_tag_two”?
◦ “dsqkdkqsldsqkdjsqkdjsqkdjq” doesn't exist. No suggestion found.`);
  });

  it('should generate an error message with hint (many unknown tags, many tags with suggestions)', () => {
    const unknownTags = ['fake_tag_oen', 'fake_tag_tow', 'dsqkdkqsldsqkdjsqkdjsqkdjq', 'sdlksqldksqldkqsldkqqssl'];
    const FAKE_ERROR = new InvalidBlogTag(unknownTags, fakeBlogTags);

    expect(FAKE_ERROR.message).toBe(`Invalid blog tags detected!
◦ “fake_tag_oen” doesn't exist, did you mean: “fake_tag_one”?
◦ “fake_tag_tow” doesn't exist, did you mean: “fake_tag_two”?
◦ [“dsqkdkqsldsqkdjsqkdjsqkdjq”, “sdlksqldksqldkqsldkqqssl”] don't exist. No suggestion found.`);
  });

  it('should generate an error message with hint (overlap, Damerau Levenshtein and StartsWith combination)', () => {
    const unknownTags = ['overlap_test_'];
    const damerauThreshold = 3;
    const FAKE_ERROR = new InvalidBlogTag(unknownTags, fakeBlogTags, damerauThreshold);

    expect(FAKE_ERROR.message).toBe(`Invalid blog tag detected!
◦ “overlap_test_” doesn't exist, did you mean: “overlap_tset_”, or “overlap_test_one”, or “overlap_test_one_long”, or “overlap_test_one_long_long”, or “overlap_test_one_long_long_long”?`);
  });
});
