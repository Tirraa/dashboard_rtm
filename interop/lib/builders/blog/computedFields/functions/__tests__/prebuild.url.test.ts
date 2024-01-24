import {
  ForbiddenToUseIndexError,
  InvalidArgumentsError,
  BLOG_POSTS_FOLDER,
  DEFAULT_LANGUAGE,
  ROUTES_ROOTS,
  INDEX_TOKEN
} from '##/lib/builders/unifiedImport';
import { describe, expect, it } from 'vitest';

import buildBlogPostUrl from '../url';

const EXT = '.FAKE_EXT';

describe('url', () => {
  const root = ROUTES_ROOTS.BLOG;
  it('should return the correct default language URL, given a valid default language flattened path', () => {
    const url = '/' + DEFAULT_LANGUAGE + root + 'category/subcategory/slug';
    expect(
      buildBlogPostUrl({
        _raw: {
          sourceFilePath: BLOG_POSTS_FOLDER + '/category/subcategory/slug' + EXT,
          flattenedPath: BLOG_POSTS_FOLDER + '/category/subcategory/slug'
        },
        _id: '_'
      })
    ).toBe(url);

    expect(
      buildBlogPostUrl({
        _raw: {
          sourceFilePath: BLOG_POSTS_FOLDER + `/category/subcategory/${DEFAULT_LANGUAGE}/slug` + EXT,
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
          sourceFilePath: BLOG_POSTS_FOLDER + '/category/subcategory/fr/slug' + EXT,
          flattenedPath: BLOG_POSTS_FOLDER + '/category/subcategory/fr/slug'
        },
        _id: '_'
      })
    ).toBe(url);

    expect(
      buildBlogPostUrl({
        _raw: {
          sourceFilePath: BLOG_POSTS_FOLDER + '/category/subcategory/en/slug' + EXT,
          flattenedPath: BLOG_POSTS_FOLDER + '/category/subcategory/en/slug'
        },
        _id: '_'
      })
    ).toBe(url2);

    expect(
      buildBlogPostUrl({
        _raw: {
          sourceFilePath: BLOG_POSTS_FOLDER + '/category/subcategory/it/slug' + EXT,
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
          sourceFilePath: BLOG_POSTS_FOLDER + '/' + INDEX_TOKEN + EXT,
          flattenedPath: BLOG_POSTS_FOLDER
        },
        _id: '_'
      })
    ).toThrowError(ForbiddenToUseIndexError);

    expect(() =>
      buildBlogPostUrl({
        _raw: {
          sourceFilePath: BLOG_POSTS_FOLDER + '/category' + EXT,
          flattenedPath: BLOG_POSTS_FOLDER + '/category'
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);

    expect(() =>
      buildBlogPostUrl({
        _raw: {
          sourceFilePath: BLOG_POSTS_FOLDER + '/category/slug' + EXT,
          flattenedPath: BLOG_POSTS_FOLDER + '/category/slug'
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);

    expect(() =>
      buildBlogPostUrl({
        _raw: {
          sourceFilePath: BLOG_POSTS_FOLDER + '/category/subcategory/it/slug/foo' + EXT,
          flattenedPath: BLOG_POSTS_FOLDER + '/category/subcategory/it/slug/foo'
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);

    expect(() =>
      buildBlogPostUrl({
        _raw: {
          sourceFilePath: BLOG_POSTS_FOLDER + '/category/subcategory/it/slug/foo/bar' + EXT,
          flattenedPath: BLOG_POSTS_FOLDER + '/category/subcategory/it/slug/foo/bar'
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);
  });
});
