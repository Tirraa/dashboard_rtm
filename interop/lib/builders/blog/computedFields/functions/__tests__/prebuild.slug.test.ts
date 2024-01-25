import { ForbiddenToUseIndexError, BLOG_POSTS_FOLDER, INDEX_TOKEN } from '##/lib/builders/unifiedImport';
import { describe, expect, it } from 'vitest';

import buildBlogPostSlug from '../slug';

const EXT = '.FAKE_EXT';

describe('blog slug (happy paths)', () => {
  const slug = 'slug';
  it('should return the category string part, given a valid flattenedPath', () => {
    expect(
      buildBlogPostSlug({
        _raw: {
          sourceFilePath: BLOG_POSTS_FOLDER + `/category/subcategory/${slug}` + EXT,
          flattenedPath: BLOG_POSTS_FOLDER + `/category/subcategory/${slug}`
        },
        _id: '_'
      })
    ).toBe(slug);

    expect(
      buildBlogPostSlug({
        _raw: {
          sourceFilePath: BLOG_POSTS_FOLDER + `/category/subcategory/lang/${slug}` + EXT,
          flattenedPath: BLOG_POSTS_FOLDER + `/category/subcategory/lang/${slug}`
        },
        _id: '_'
      })
    ).toBe(slug);
  });

  it('should be fault tolerant', () => {
    expect(
      buildBlogPostSlug({
        _raw: {
          sourceFilePath: '_' + BLOG_POSTS_FOLDER + `/category/subcategory/lang/${slug}` + EXT,
          flattenedPath: '_' + BLOG_POSTS_FOLDER + `/category/subcategory/lang/${slug}`
        },
        _id: '_'
      })
    ).toBe(slug);
  });
});

describe('blog slug (happy paths, with index notation)', () => {
  it('should return the correct slug, with index notation', () => {
    expect(
      buildBlogPostSlug({
        _raw: {
          sourceFilePath: '_' + BLOG_POSTS_FOLDER + `/category/subcategory/lang/${INDEX_TOKEN}` + EXT,
          flattenedPath: '_' + BLOG_POSTS_FOLDER + `/category/subcategory/lang`
        },
        _id: '_'
      })
    ).toBe(INDEX_TOKEN);
  });
});

describe('blog slug (unhappy paths)', () => {
  it('should throw, given an invalid flattenedPath', () => {
    expect(() =>
      buildBlogPostSlug({
        _raw: {
          sourceFilePath: BLOG_POSTS_FOLDER + '/' + INDEX_TOKEN + EXT,
          flattenedPath: BLOG_POSTS_FOLDER
        },
        _id: '_'
      })
    ).toThrowError(ForbiddenToUseIndexError);
  });
});
