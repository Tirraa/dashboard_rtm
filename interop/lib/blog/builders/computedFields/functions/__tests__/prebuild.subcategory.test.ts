import { InvalidArgumentsError, BLOG_POSTS_FOLDER } from '##/lib/blog/unifiedImport';
import { describe, expect, it } from 'vitest';

import buildBlogPostSubcategory from '../subcategory';

describe('subcategory', () => {
  const subcategory = 'subcategory';
  it('should return the subcategory string part, given a valid flattenedPath', () => {
    expect(
      buildBlogPostSubcategory({
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + `/category/${subcategory}/slug`
        },
        _id: '_'
      })
    ).toBe(subcategory);

    expect(
      buildBlogPostSubcategory({
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + `/category/${subcategory}/lang/slug`
        },
        _id: '_'
      })
    ).toBe(subcategory);
  });

  it('should throw, given an invalid flattenedPath', () => {
    expect(() =>
      buildBlogPostSubcategory({
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER
        },
        _id: '_'
      })
    ).toThrow(InvalidArgumentsError);

    expect(() =>
      buildBlogPostSubcategory({
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + '/'
        },
        _id: '_'
      })
    ).toThrow(InvalidArgumentsError);

    expect(() =>
      buildBlogPostSubcategory({
        _raw: {
          flattenedPath: '_' + BLOG_POSTS_FOLDER + `/category/${subcategory}/lang/slug`
        },
        _id: '_'
      })
    ).toThrow(InvalidArgumentsError);
  });

  it('should be fault tolerant', () => {
    expect(
      buildBlogPostSubcategory({
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + `/category/${subcategory}`
        },
        _id: '_'
      })
    ).toBe(subcategory);
  });
});
