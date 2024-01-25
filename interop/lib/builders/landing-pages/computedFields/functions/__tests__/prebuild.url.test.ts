import {
  ForbiddenToUseIndexError,
  InvalidArgumentsError,
  LANDING_PAGES_FOLDER,
  DEFAULT_LANGUAGE,
  ROUTES_ROOTS,
  INDEX_TOKEN
} from '##/lib/builders/unifiedImport';
import { describe, expect, it } from 'vitest';

import buildLandingPageUrl from '../url';

const EXT = '.FAKE_EXT';

describe('lp url (happy paths)', () => {
  const root = ROUTES_ROOTS.LANDING_PAGES;
  it('should return the correct default language URL, given a valid default language flattened path', () => {
    const url = '/' + DEFAULT_LANGUAGE + root + 'category-slug';
    expect(
      buildLandingPageUrl({
        _raw: {
          sourceFilePath: LANDING_PAGES_FOLDER + '/category/slug' + EXT,
          flattenedPath: LANDING_PAGES_FOLDER + '/category/slug'
        },
        _id: '_'
      })
    ).toBe(url);

    expect(
      buildLandingPageUrl({
        _raw: {
          sourceFilePath: LANDING_PAGES_FOLDER + `/category/${DEFAULT_LANGUAGE}/slug` + EXT,
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
    const url4 = '/' + 'it' + root + 'index-slug';
    const url5 = '/' + 'it' + root + 'category-index';

    expect(
      buildLandingPageUrl({
        _raw: {
          sourceFilePath: LANDING_PAGES_FOLDER + '/category/fr/slug' + EXT,
          flattenedPath: LANDING_PAGES_FOLDER + '/category/fr/slug'
        },
        _id: '_'
      })
    ).toBe(url);

    expect(
      buildLandingPageUrl({
        _raw: {
          sourceFilePath: LANDING_PAGES_FOLDER + '/category/en/slug' + EXT,
          flattenedPath: LANDING_PAGES_FOLDER + '/category/en/slug'
        },
        _id: '_'
      })
    ).toBe(url2);

    expect(
      buildLandingPageUrl({
        _raw: {
          sourceFilePath: LANDING_PAGES_FOLDER + '/category/it/slug' + EXT,
          flattenedPath: LANDING_PAGES_FOLDER + '/category/it/slug'
        },
        _id: '_'
      })
    ).toBe(url3);

    expect(
      buildLandingPageUrl({
        _raw: {
          sourceFilePath: LANDING_PAGES_FOLDER + `/${INDEX_TOKEN}/it/slug` + EXT,
          flattenedPath: LANDING_PAGES_FOLDER + `/${INDEX_TOKEN}/it/slug`
        },
        _id: '_'
      })
    ).toBe(url4);

    expect(
      buildLandingPageUrl({
        _raw: {
          sourceFilePath: LANDING_PAGES_FOLDER + `/category/it/${INDEX_TOKEN}` + EXT,
          flattenedPath: LANDING_PAGES_FOLDER + '/category/it'
        },
        _id: '_'
      })
    ).toBe(url5);
  });
});

describe('lp url (unhappy paths)', () => {
  it('should throw, given invalid flattened paths', () => {
    expect(() =>
      buildLandingPageUrl({
        _raw: {
          sourceFilePath: LANDING_PAGES_FOLDER + '/' + INDEX_TOKEN + EXT,
          flattenedPath: LANDING_PAGES_FOLDER
        },
        _id: '_'
      })
    ).toThrowError(ForbiddenToUseIndexError);

    expect(() =>
      buildLandingPageUrl({
        _raw: {
          sourceFilePath: LANDING_PAGES_FOLDER + '/category' + EXT,
          flattenedPath: LANDING_PAGES_FOLDER + '/category'
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);

    expect(() =>
      buildLandingPageUrl({
        _raw: {
          sourceFilePath: LANDING_PAGES_FOLDER + '/slug' + EXT,
          flattenedPath: LANDING_PAGES_FOLDER + '/slug'
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);

    expect(() =>
      buildLandingPageUrl({
        _raw: {
          sourceFilePath: LANDING_PAGES_FOLDER + '/category/it/slug/foo' + EXT,
          flattenedPath: LANDING_PAGES_FOLDER + '/category/it/slug/foo'
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);

    expect(() =>
      buildLandingPageUrl({
        _raw: {
          sourceFilePath: LANDING_PAGES_FOLDER + '/category/it/slug/foo/bar' + EXT,
          flattenedPath: LANDING_PAGES_FOLDER + '/category/it/slug/foo/bar'
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);
  });
});
