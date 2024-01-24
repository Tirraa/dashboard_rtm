import { InvalidArgumentsError, BLOG_POSTS_FOLDER, INDEX_NEEDLE } from '##/lib/builders/unifiedImport';
import { describe, expect, it } from 'vitest';

import buildBlogPostSlug from '../slug';

const EXT = '.FAKE_EXT';

describe('slug', () => {
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

  it('should throw, given an invalid flattenedPath', () => {
    expect(() =>
      buildBlogPostSlug({
        _raw: {
          sourceFilePath: BLOG_POSTS_FOLDER + '/' + INDEX_NEEDLE + EXT,
          flattenedPath: BLOG_POSTS_FOLDER
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);

    expect(() =>
      buildBlogPostSlug({
        _raw: {
          sourceFilePath: BLOG_POSTS_FOLDER + '/' + INDEX_NEEDLE + EXT,
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
          sourceFilePath: '_' + BLOG_POSTS_FOLDER + `/category/subcategory/lang/${slug}` + EXT,
          flattenedPath: '_' + BLOG_POSTS_FOLDER + `/category/subcategory/lang/${slug}`
        },
        _id: '_'
      })
    ).toBe(slug);
  });
});
