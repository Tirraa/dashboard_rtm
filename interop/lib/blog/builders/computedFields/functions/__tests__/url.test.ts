import { BLOG_POSTS_FOLDER, DEFAULT_LANGUAGE, InvalidArgumentsError, ROUTES_ROOTS } from '##/lib/blog/unifiedImport';
import { describe, expect, it } from 'vitest';
import buildBlogPostUrl from '../url';

describe('url', () => {
  const root = ROUTES_ROOTS.BLOG;
  it('should return the correct default language URL, given a valid default language flattened path', () => {
    const url = '/' + DEFAULT_LANGUAGE + root + 'category/subcategory/slug';
    expect(
      buildBlogPostUrl({
        _id: '_',
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + '/category/subcategory/slug'
        }
      })
    ).toBe(url);

    expect(
      buildBlogPostUrl({
        _id: '_',
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + `/category/subcategory/${DEFAULT_LANGUAGE}/slug`
        }
      })
    ).toBe(url);
  });

  it('should return the correct language URL, given a valid flattened path including a language', () => {
    const url = '/' + 'fr' + root + 'category/subcategory/slug';
    const url2 = '/' + 'en' + root + 'category/subcategory/slug';
    const url3 = '/' + 'it' + root + 'category/subcategory/slug';
    expect(
      buildBlogPostUrl({
        _id: '_',
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + '/category/subcategory/fr/slug'
        }
      })
    ).toBe(url);

    expect(
      buildBlogPostUrl({
        _id: '_',
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + '/category/subcategory/en/slug'
        }
      })
    ).toBe(url2);

    expect(
      buildBlogPostUrl({
        _id: '_',
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + '/category/subcategory/it/slug'
        }
      })
    ).toBe(url3);
  });

  it('should throw, given invalid flattened paths', () => {
    expect(() =>
      buildBlogPostUrl({
        _id: '_',
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + '/'
        }
      })
    ).toThrow(InvalidArgumentsError);

    expect(() =>
      buildBlogPostUrl({
        _id: '_',
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + '/category'
        }
      })
    ).toThrow(InvalidArgumentsError);

    expect(() =>
      buildBlogPostUrl({
        _id: '_',
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + '/category/slug'
        }
      })
    ).toThrow(InvalidArgumentsError);

    expect(() =>
      buildBlogPostUrl({
        _id: '_',
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + '/category/subcategory/it/slug/foo'
        }
      })
    ).toThrow(InvalidArgumentsError);

    expect(() =>
      buildBlogPostUrl({
        _id: '_',
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + '/category/subcategory/it/slug/foo/bar'
        }
      })
    ).toThrow(InvalidArgumentsError);
  });
});
