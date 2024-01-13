import { InvalidArgumentsError, BLOG_POSTS_FOLDER, DEFAULT_LANGUAGE, ROUTES_ROOTS } from '##/lib/builders/unifiedImport';
import { describe, expect, it } from 'vitest';

import buildBlogPostUrl from '../url';

describe('url', () => {
  const root = ROUTES_ROOTS.BLOG;
  it('should return the correct default language URL, given a valid default language flattened path', () => {
    const url = '/' + DEFAULT_LANGUAGE + root + 'category/subcategory/slug';
    expect(
      buildBlogPostUrl({
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + '/category/subcategory/slug'
        },
        _id: '_'
      })
    ).toBe(url);

    expect(
      buildBlogPostUrl({
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + `/category/subcategory/${DEFAULT_LANGUAGE}/slug`
        },
        _id: '_'
      })
    ).toBe(url);
  });

  it('should return the correct language URL, given a valid flattened path including a language', () => {
    const url = '/' + 'fr' + root + 'category/subcategory/slug';
    const url2 = '/' + 'en' + root + 'category/subcategory/slug';
    const url3 = '/' + 'it' + root + 'category/subcategory/slug';
    expect(
      buildBlogPostUrl({
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + '/category/subcategory/fr/slug'
        },
        _id: '_'
      })
    ).toBe(url);

    expect(
      buildBlogPostUrl({
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + '/category/subcategory/en/slug'
        },
        _id: '_'
      })
    ).toBe(url2);

    expect(
      buildBlogPostUrl({
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + '/category/subcategory/it/slug'
        },
        _id: '_'
      })
    ).toBe(url3);
  });

  it('should throw, given invalid flattened paths', () => {
    expect(() =>
      buildBlogPostUrl({
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + '/'
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);

    expect(() =>
      buildBlogPostUrl({
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + '/category'
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);

    expect(() =>
      buildBlogPostUrl({
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + '/category/slug'
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);

    expect(() =>
      buildBlogPostUrl({
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + '/category/subcategory/it/slug/foo'
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);

    expect(() =>
      buildBlogPostUrl({
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + '/category/subcategory/it/slug/foo/bar'
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);
  });
});
