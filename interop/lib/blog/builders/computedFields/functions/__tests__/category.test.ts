import { BLOG_POSTS_FOLDER, InvalidArgumentsError } from '##/lib/blog/unifiedImport';
import { describe, expect, it } from 'vitest';
import buildBlogPostCategory from '../category';

describe('category', () => {
  const category = 'category';
  it('should return the category string part, given a valid flattenedPath', () => {
    expect(
      buildBlogPostCategory({
        _id: '_',
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + `/${category}/subcategory/slug`
        }
      })
    ).toBe(category);

    expect(
      buildBlogPostCategory({
        _id: '_',
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + `/${category}/subcategory/lang/slug`
        }
      })
    ).toBe(category);
  });

  it('should throw, given an invalid flattenedPath', () => {
    expect(() =>
      buildBlogPostCategory({
        _id: '_',
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER
        }
      })
    ).toThrow(InvalidArgumentsError);

    expect(() =>
      buildBlogPostCategory({
        _id: '_',
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + '/'
        }
      })
    ).toThrow(InvalidArgumentsError);

    expect(() =>
      buildBlogPostCategory({
        _id: '_',
        _raw: {
          flattenedPath: '_' + BLOG_POSTS_FOLDER + `/${category}/subcategory/lang/slug`
        }
      })
    ).toThrow(InvalidArgumentsError);
  });
});
