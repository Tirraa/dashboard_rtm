import { BLOG_POSTS_FOLDER, InvalidArgumentsError } from '##/lib/blog/unifiedImport';
import { describe, expect, it } from 'vitest';
import buildBlogPostSlug from '../slug';

describe('slug', () => {
  const slug = 'slug';
  it('should return the category string part, given a valid flattenedPath', () => {
    expect(
      buildBlogPostSlug({
        _id: '_',
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + `/category/subcategory/${slug}`
        }
      })
    ).toBe(slug);

    expect(
      buildBlogPostSlug({
        _id: '_',
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + `/category/subcategory/lang/${slug}`
        }
      })
    ).toBe(slug);
  });

  it('should throw, given an invalid flattenedPath', () => {
    expect(() =>
      buildBlogPostSlug({
        _id: '_',
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER
        }
      })
    ).toThrow(InvalidArgumentsError);

    expect(() =>
      buildBlogPostSlug({
        _id: '_',
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + '/'
        }
      })
    ).toThrow(InvalidArgumentsError);
  });

  it('should be fault tolerant', () => {
    expect(
      buildBlogPostSlug({
        _id: '_',
        _raw: {
          flattenedPath: '_' + BLOG_POSTS_FOLDER + `/category/subcategory/lang/${slug}`
        }
      })
    ).toBe(slug);
  });
});
