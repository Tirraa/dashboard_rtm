import { ForbiddenToUseIndexError, InvalidArgumentsError, BLOG_POSTS_FOLDER, DEFAULT_LANGUAGE, INDEX_TOKEN } from '##/lib/builders/unifiedImport';
import { describe, expect, it } from 'vitest';
import { LANGUAGES } from '##/config/i18n';

import buildBlogPostLanguageFlag from '../language';

const EXT = '.FAKE_EXT';

const PREFIX = '$';
let prefixAcc = PREFIX;
while (LANGUAGES.includes((prefixAcc + DEFAULT_LANGUAGE) as any)) prefixAcc += PREFIX;
const invalidLanguage = prefixAcc + DEFAULT_LANGUAGE;

describe('blog language (happy paths)', () => {
  it('should be fault tolerant, given an invalid language in the flattenedPath', () => {
    expect(
      buildBlogPostLanguageFlag({
        _raw: {
          sourceFilePath: BLOG_POSTS_FOLDER + `/category/subcategory/${invalidLanguage}/slug` + EXT,
          flattenedPath: BLOG_POSTS_FOLDER + `/category/subcategory/${invalidLanguage}/slug`
        },
        _id: '_'
      })
    ).toBe(invalidLanguage);
  });

  it('should return the default language, given the valid default language in the flattenedPath', () => {
    expect(
      buildBlogPostLanguageFlag({
        _raw: {
          sourceFilePath: BLOG_POSTS_FOLDER + `/category/subcategory/${DEFAULT_LANGUAGE}/slug` + EXT,
          flattenedPath: BLOG_POSTS_FOLDER + `/category/subcategory/${DEFAULT_LANGUAGE}/slug`
        },
        _id: '_'
      })
    ).toBe(DEFAULT_LANGUAGE);
  });

  it('should return the default language, given a valid flattenedPath without language param', () => {
    expect(
      buildBlogPostLanguageFlag({
        _raw: {
          sourceFilePath: BLOG_POSTS_FOLDER + '/category/subcategory/slug' + EXT,
          flattenedPath: BLOG_POSTS_FOLDER + '/category/subcategory/slug'
        },
        _id: '_'
      })
    ).toBe(DEFAULT_LANGUAGE);
  });
});

describe('blog language (happy paths, with index notation)', () => {
  it('should handle index corner cases, given a valid default language path using index notation', () => {
    expect(
      buildBlogPostLanguageFlag({
        _raw: {
          sourceFilePath: BLOG_POSTS_FOLDER + `/category/subcategory/${INDEX_TOKEN}` + EXT,
          flattenedPath: BLOG_POSTS_FOLDER + `/category/subcategory`
        },
        _id: '_'
      })
    ).toBe(DEFAULT_LANGUAGE);
  });

  it('should handle index corner cases, given a valid custom language path using index notation', () => {
    expect(
      buildBlogPostLanguageFlag({
        _raw: {
          sourceFilePath: BLOG_POSTS_FOLDER + `/category/subcategory/${invalidLanguage}/${INDEX_TOKEN}` + EXT,
          flattenedPath: BLOG_POSTS_FOLDER + `/category/subcategory/${invalidLanguage}`
        },
        _id: '_'
      })
    ).toBe(invalidLanguage);
  });
});

describe('blog language (unhappy paths)', () => {
  it('should throw, given an invalid flattenedPath', () => {
    expect(() =>
      buildBlogPostLanguageFlag({
        _raw: {
          sourceFilePath: BLOG_POSTS_FOLDER + '/' + INDEX_TOKEN + EXT,
          flattenedPath: BLOG_POSTS_FOLDER
        },
        _id: '_'
      })
    ).toThrowError(ForbiddenToUseIndexError);

    expect(() =>
      buildBlogPostLanguageFlag({
        _raw: {
          sourceFilePath: '_' + BLOG_POSTS_FOLDER + '/category/subcategory/lang/slug' + EXT,
          flattenedPath: '_' + BLOG_POSTS_FOLDER + '/category/subcategory/lang/slug'
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);

    expect(() =>
      buildBlogPostLanguageFlag({
        _raw: {
          sourceFilePath: '_' + BLOG_POSTS_FOLDER + '/category/subcategory/slug' + EXT,
          flattenedPath: '_' + BLOG_POSTS_FOLDER + '/category/subcategory/slug'
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);
  });
});
