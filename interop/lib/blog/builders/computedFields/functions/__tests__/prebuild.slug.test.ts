import { InvalidArgumentsError, BLOG_POSTS_FOLDER } from '##/lib/blog/unifiedImport';
import { describe, expect, it } from 'vitest';

import buildBlogPostSlug from '../slug';

describe('slug', () => {
  const slug = 'slug';
  it('should return the category string part, given a valid flattenedPath', () => {
    expect(
      buildBlogPostSlug({
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + `/category/subcategory/${slug}`
        },
        _id: '_'
      })
    ).toBe(slug);

    expect(
      buildBlogPostSlug({
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + `/category/subcategory/lang/${slug}`
        },
        _id: '_'
      })
    ).toBe(slug);
  });

  it('should throw, given an invalid flattenedPath', () => {
    expect(() =>
      buildBlogPostSlug({
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);

    expect(() =>
      buildBlogPostSlug({
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + '/'
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);
  });

  it('should be fault tolerant', () => {
    expect(
      buildBlogPostSlug({
        _raw: {
          flattenedPath: '_' + BLOG_POSTS_FOLDER + `/category/subcategory/lang/${slug}`
        },
        _id: '_'
      })
    ).toBe(slug);
  });
});
