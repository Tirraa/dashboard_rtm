import { ForbiddenToUseIndexError, InvalidArgumentsError, LANDING_PAGES_FOLDER, DEFAULT_LANGUAGE, INDEX_TOKEN } from '##/lib/builders/unifiedImport';
import { describe, expect, it } from 'vitest';
import { LANGUAGES } from '##/config/i18n';

import buildLandingPageLanguageFlag from '../language';

const EXT = '.FAKE_EXT';

describe('language', () => {
  const PREFIX = '$';
  let prefixAcc = PREFIX;
  while (LANGUAGES.includes((prefixAcc + DEFAULT_LANGUAGE) as any)) prefixAcc += PREFIX;
  const invalidLanguage = prefixAcc + DEFAULT_LANGUAGE;

  it('should be fault tolerant, given an invalid language in the flattenedPath', () => {
    expect(
      buildLandingPageLanguageFlag({
        _raw: {
          sourceFilePath: LANDING_PAGES_FOLDER + `/category/${invalidLanguage}/slug` + EXT,
          flattenedPath: LANDING_PAGES_FOLDER + `/category/${invalidLanguage}/slug`
        },
        _id: '_'
      })
    ).toBe(invalidLanguage);
  });

  it('should return the default language, given the valid default language in the flattenedPath', () => {
    expect(
      buildLandingPageLanguageFlag({
        _raw: {
          sourceFilePath: LANDING_PAGES_FOLDER + `/category/${DEFAULT_LANGUAGE}/slug` + EXT,
          flattenedPath: LANDING_PAGES_FOLDER + `/category/${DEFAULT_LANGUAGE}/slug`
        },
        _id: '_'
      })
    ).toBe(DEFAULT_LANGUAGE);
  });

  it('should return the default language, given a valid flattenedPath without language param', () => {
    expect(
      buildLandingPageLanguageFlag({
        _raw: {
          sourceFilePath: LANDING_PAGES_FOLDER + '/category/slug' + EXT,
          flattenedPath: LANDING_PAGES_FOLDER + '/category/slug'
        },
        _id: '_'
      })
    ).toBe(DEFAULT_LANGUAGE);
  });

  it('should throw, given an invalid flattenedPath', () => {
    expect(() =>
      buildLandingPageLanguageFlag({
        _raw: {
          sourceFilePath: LANDING_PAGES_FOLDER + '/' + INDEX_TOKEN + EXT,
          flattenedPath: LANDING_PAGES_FOLDER
        },
        _id: '_'
      })
    ).toThrowError(ForbiddenToUseIndexError);

    expect(() =>
      buildLandingPageLanguageFlag({
        _raw: {
          sourceFilePath: '_' + LANDING_PAGES_FOLDER + '/category/lang/slug' + EXT,
          flattenedPath: '_' + LANDING_PAGES_FOLDER + '/category/lang/slug'
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);

    expect(() =>
      buildLandingPageLanguageFlag({
        _raw: {
          sourceFilePath: '_' + LANDING_PAGES_FOLDER + '/category/slug' + EXT,
          flattenedPath: '_' + LANDING_PAGES_FOLDER + '/category/slug'
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);
  });
});
