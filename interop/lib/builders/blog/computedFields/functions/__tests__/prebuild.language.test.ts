import { InvalidArgumentsError, BLOG_POSTS_FOLDER, DEFAULT_LANGUAGE } from '##/lib/builders/unifiedImport';
import { describe, expect, it } from 'vitest';
import { LANGUAGES } from '##/config/i18n';

import buildBlogPostLanguageFlag from '../language';

describe('language', () => {
  const PREFIX = '$';
  let prefixAcc = PREFIX;
  while (LANGUAGES.includes((prefixAcc + DEFAULT_LANGUAGE) as any)) prefixAcc += PREFIX;
  const invalidLanguage = prefixAcc + DEFAULT_LANGUAGE;

  it('should be fault tolerant, given an invalid language in the flattenedPath', () => {
    expect(
      buildBlogPostLanguageFlag({
        _raw: {
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
          flattenedPath: BLOG_POSTS_FOLDER + '/category/subcategory/slug'
        },
        _id: '_'
      })
    ).toBe(DEFAULT_LANGUAGE);
  });

  it('should return the default language, given an incomplete flattenedPath', () => {
    expect(
      buildBlogPostLanguageFlag({
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + '/'
        },
        _id: '_'
      })
    ).toBe(DEFAULT_LANGUAGE);
  });

  it('should throw, given an invalid flattenedPath', () => {
    expect(() =>
      buildBlogPostLanguageFlag({
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);

    expect(() =>
      buildBlogPostLanguageFlag({
        _raw: {
          flattenedPath: '_' + BLOG_POSTS_FOLDER + '/category/subcategory/lang/slug'
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);

    expect(() =>
      buildBlogPostLanguageFlag({
        _raw: {
          flattenedPath: '_' + BLOG_POSTS_FOLDER + '/category/subcategory/slug'
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);
  });
});
