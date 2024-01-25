import { ForbiddenToUseIndexError, InvalidArgumentsError, BLOG_POSTS_FOLDER, INDEX_TOKEN } from '##/lib/builders/unifiedImport';
import { describe, expect, it } from 'vitest';

import buildBlogPostCategory from '../category';

const EXT = '.FAKE_EXT';

describe('blog category (happy paths)', () => {
  const category = 'category';
  it('should return the category string part, given a valid flattenedPath', () => {
    expect(
      buildBlogPostCategory({
        _raw: {
          sourceFilePath: BLOG_POSTS_FOLDER + `/${category}/subcategory/slug` + EXT,
          flattenedPath: BLOG_POSTS_FOLDER + `/${category}/subcategory/slug`
        },
        _id: '_'
      })
    ).toBe(category);

    expect(
      buildBlogPostCategory({
        _raw: {
          sourceFilePath: BLOG_POSTS_FOLDER + `/${category}/subcategory/lang/slug` + EXT,
          flattenedPath: BLOG_POSTS_FOLDER + `/${category}/subcategory/lang/slug`
        },
        _id: '_'
      })
    ).toBe(category);
  });
});

describe('blog category (unhappy paths)', () => {
  const category = 'category';
  it('should throw, given an invalid flattenedPath', () => {
    expect(() =>
      buildBlogPostCategory({
        _raw: {
          sourceFilePath: BLOG_POSTS_FOLDER + '/' + INDEX_TOKEN + EXT,
          flattenedPath: BLOG_POSTS_FOLDER
        },
        _id: '_'
      })
    ).toThrowError(ForbiddenToUseIndexError);

    expect(() =>
      buildBlogPostCategory({
        _raw: {
          sourceFilePath: '_' + BLOG_POSTS_FOLDER + `/${category}/subcategory/lang/slug` + EXT,
          flattenedPath: '_' + BLOG_POSTS_FOLDER + `/${category}/subcategory/lang/slug`
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);
  });
});
