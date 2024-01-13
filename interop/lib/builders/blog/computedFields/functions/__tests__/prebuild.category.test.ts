import { InvalidArgumentsError, BLOG_POSTS_FOLDER } from '##/lib/builders/unifiedImport';
import { describe, expect, it } from 'vitest';

import buildBlogPostCategory from '../category';

describe('category', () => {
  const category = 'category';
  it('should return the category string part, given a valid flattenedPath', () => {
    expect(
      buildBlogPostCategory({
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + `/${category}/subcategory/slug`
        },
        _id: '_'
      })
    ).toBe(category);

    expect(
      buildBlogPostCategory({
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + `/${category}/subcategory/lang/slug`
        },
        _id: '_'
      })
    ).toBe(category);
  });

  it('should throw, given an invalid flattenedPath', () => {
    expect(() =>
      buildBlogPostCategory({
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);

    expect(() =>
      buildBlogPostCategory({
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + '/'
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);

    expect(() =>
      buildBlogPostCategory({
        _raw: {
          flattenedPath: '_' + BLOG_POSTS_FOLDER + `/${category}/subcategory/lang/slug`
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);
  });
});
