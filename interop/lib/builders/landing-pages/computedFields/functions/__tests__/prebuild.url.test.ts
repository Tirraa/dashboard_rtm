import { InvalidArgumentsError, LANDING_PAGES_FOLDER, DEFAULT_LANGUAGE, ROUTES_ROOTS } from '##/lib/builders/unifiedImport';
import { describe, expect, it } from 'vitest';

import buildLandingPageUrl from '../url';

describe('url', () => {
  const root = ROUTES_ROOTS.WEBSITE;
  it('should return the correct default language URL, given a valid default language flattened path', () => {
    const url = '/' + DEFAULT_LANGUAGE + root + 'category-slug';
    expect(
      buildLandingPageUrl({
        _raw: {
          flattenedPath: LANDING_PAGES_FOLDER + '/category/slug'
        },
        _id: '_'
      })
    ).toBe(url);

    expect(
      buildLandingPageUrl({
        _raw: {
          flattenedPath: LANDING_PAGES_FOLDER + `/category/${DEFAULT_LANGUAGE}/slug`
        },
        _id: '_'
      })
    ).toBe(url);
  });

  it('should return the correct language URL, given a valid flattened path including a language', () => {
    const url = '/' + 'fr' + root + 'category-slug';
    const url2 = '/' + 'en' + root + 'category-slug';
    const url3 = '/' + 'it' + root + 'category-slug';
    expect(
      buildLandingPageUrl({
        _raw: {
          flattenedPath: LANDING_PAGES_FOLDER + '/category/fr/slug'
        },
        _id: '_'
      })
    ).toBe(url);

    expect(
      buildLandingPageUrl({
        _raw: {
          flattenedPath: LANDING_PAGES_FOLDER + '/category/en/slug'
        },
        _id: '_'
      })
    ).toBe(url2);

    expect(
      buildLandingPageUrl({
        _raw: {
          flattenedPath: LANDING_PAGES_FOLDER + '/category/it/slug'
        },
        _id: '_'
      })
    ).toBe(url3);
  });

  it('should throw, given invalid flattened paths', () => {
    expect(() =>
      buildLandingPageUrl({
        _raw: {
          flattenedPath: LANDING_PAGES_FOLDER + '/'
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);

    expect(() =>
      buildLandingPageUrl({
        _raw: {
          flattenedPath: LANDING_PAGES_FOLDER + '/category'
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);

    expect(() =>
      buildLandingPageUrl({
        _raw: {
          flattenedPath: LANDING_PAGES_FOLDER + '/slug'
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);

    expect(() =>
      buildLandingPageUrl({
        _raw: {
          flattenedPath: LANDING_PAGES_FOLDER + '/category/it/slug/foo'
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);

    expect(() =>
      buildLandingPageUrl({
        _raw: {
          flattenedPath: LANDING_PAGES_FOLDER + '/category/it/slug/foo/bar'
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);
  });
});
