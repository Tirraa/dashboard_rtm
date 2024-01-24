import { ForbiddenToUseIndexError, InvalidArgumentsError, BLOG_POSTS_FOLDER, INDEX_TOKEN } from '##/lib/builders/unifiedImport';
import { describe, expect, it } from 'vitest';

import buildBlogPostSubcategory from '../subcategory';

const EXT = '.FAKE_EXT';

describe('subcategory', () => {
  const subcategory = 'subcategory';
  it('should return the subcategory string part, given a valid flattenedPath', () => {
    expect(
      buildBlogPostSubcategory({
        _raw: {
          sourceFilePath: BLOG_POSTS_FOLDER + `/category/${subcategory}/slug` + EXT,
          flattenedPath: BLOG_POSTS_FOLDER + `/category/${subcategory}/slug`
        },
        _id: '_'
      })
    ).toBe(subcategory);

    expect(
      buildBlogPostSubcategory({
        _raw: {
          sourceFilePath: BLOG_POSTS_FOLDER + `/category/${subcategory}/lang/slug` + EXT,
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
          sourceFilePath: BLOG_POSTS_FOLDER + '/' + INDEX_TOKEN + EXT,
          flattenedPath: BLOG_POSTS_FOLDER
        },
        _id: '_'
      })
    ).toThrowError(ForbiddenToUseIndexError);

    expect(() =>
      buildBlogPostSubcategory({
        _raw: {
          sourceFilePath: '_' + BLOG_POSTS_FOLDER + `/category/${subcategory}/lang/slug` + EXT,
          flattenedPath: '_' + BLOG_POSTS_FOLDER + `/category/${subcategory}/lang/slug`
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);
  });

  it('should be fault tolerant', () => {
    expect(
      buildBlogPostSubcategory({
        _raw: {
          sourceFilePath: BLOG_POSTS_FOLDER + `/category/${subcategory}` + EXT,
          flattenedPath: BLOG_POSTS_FOLDER + `/category/${subcategory}`
        },
        _id: '_'
      })
    ).toBe(subcategory);
  });
});
