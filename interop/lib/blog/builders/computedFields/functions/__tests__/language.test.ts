import { LANGUAGES } from '##/config/i18n';
import { BLOG_POSTS_FOLDER, DEFAULT_LANGUAGE, InvalidArgumentsError } from '##/lib/blog/unifiedImport';
import { describe, expect, it } from 'vitest';
import buildBlogPostLanguageFlag from '../language';

describe('language', () => {
  const PREFIX = '$';
  const FIRST_LANG = LANGUAGES[0];
  let prefixAcc = PREFIX;
  while (LANGUAGES.includes((prefixAcc + FIRST_LANG) as any)) prefixAcc += PREFIX;
  const invalidLanguage = prefixAcc + FIRST_LANG;

  it('should be fault tolerant, given an invalid language in the flattenedPath', () => {
    expect(
      buildBlogPostLanguageFlag({
        _id: '_',
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + `/category/subcategory/${invalidLanguage}/slug`
        }
      })
    ).toBe(invalidLanguage);
  });

  it('should return the default language, given the valid default language in the flattenedPath', () => {
    expect(
      buildBlogPostLanguageFlag({
        _id: '_',
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + `/category/subcategory/${DEFAULT_LANGUAGE}/slug`
        }
      })
    ).toBe(DEFAULT_LANGUAGE);
  });

  it('should return the default language, given a valid flattenedPath without language param', () => {
    expect(
      buildBlogPostLanguageFlag({
        _id: '_',
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + '/category/subcategory/slug'
        }
      })
    ).toBe(DEFAULT_LANGUAGE);
  });

  it('should return the default language, given an incomplete flattenedPath', () => {
    expect(
      buildBlogPostLanguageFlag({
        _id: '_',
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER + '/'
        }
      })
    ).toBe(DEFAULT_LANGUAGE);
  });

  it('should throw, given an invalid flattenedPath', () => {
    expect(() =>
      buildBlogPostLanguageFlag({
        _id: '_',
        _raw: {
          flattenedPath: BLOG_POSTS_FOLDER
        }
      })
    ).toThrow(InvalidArgumentsError);

    expect(() =>
      buildBlogPostLanguageFlag({
        _id: '_',
        _raw: {
          flattenedPath: '_' + BLOG_POSTS_FOLDER + '/category/subcategory/lang/slug'
        }
      })
    ).toThrow(InvalidArgumentsError);

    expect(() =>
      buildBlogPostLanguageFlag({
        _id: '_',
        _raw: {
          flattenedPath: '_' + BLOG_POSTS_FOLDER + '/category/subcategory/slug'
        }
      })
    ).toThrow(InvalidArgumentsError);
  });
});
