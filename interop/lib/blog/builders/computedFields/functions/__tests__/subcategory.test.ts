import { BLOG_POSTS_FOLDER, InvalidArgumentsError } from '##/lib/blog/unifiedImport';
import { describe, expect, it } from 'vitest';
import buildBlogPostSubcategory from '../subcategory';

describe('subcategory', () => {
  const subcategory = 'subcategory';
  it('should return the subcategory string part, given a valid flattenedPath', () => {
    expect(
      buildBlogPostSubcategory({
        _id: '_',
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + `/category/${subcategory}/slug`
        }
      })
    ).toBe(subcategory);

    expect(
      buildBlogPostSubcategory({
        _id: '_',
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + `/category/${subcategory}/lang/slug`
        }
      })
    ).toBe(subcategory);
  });

  it('should throw, given an invalid flattenedPath', () => {
    expect(() =>
      buildBlogPostSubcategory({
        _id: '_',
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER
        }
      })
    ).toThrow(InvalidArgumentsError);

    expect(() =>
      buildBlogPostSubcategory({
        _id: '_',
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + '/'
        }
      })
    ).toThrow(InvalidArgumentsError);

    expect(() =>
      buildBlogPostSubcategory({
        _id: '_',
        _raw: {
          flattenedPath: '_' + BLOG_POSTS_FOLDER + `/category/${subcategory}/lang/slug`
        }
      })
    ).toThrow(InvalidArgumentsError);
  });

  it('should be fault tolerant', () => {
    expect(
      buildBlogPostSubcategory({
        _id: '_',
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + `/category/${subcategory}`
        }
      })
    ).toBe(subcategory);
  });
});
