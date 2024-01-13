import { InvalidArgumentsError, LANDING_PAGES_FOLDER, DEFAULT_LANGUAGE } from '##/lib/builders/unifiedImport';
import { describe, expect, it } from 'vitest';
import { LANGUAGES } from '##/config/i18n';

import buildLandingPageLanguageFlag from '../language';

describe('language', () => {
  const PREFIX = '$';
  let prefixAcc = PREFIX;
  while (LANGUAGES.includes((prefixAcc + DEFAULT_LANGUAGE) as any)) prefixAcc += PREFIX;
  const invalidLanguage = prefixAcc + DEFAULT_LANGUAGE;

  it('should be fault tolerant, given an invalid language in the flattenedPath', () => {
    expect(
      buildLandingPageLanguageFlag({
        _raw: {
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
          flattenedPath: LANDING_PAGES_FOLDER + '/category/slug'
        },
        _id: '_'
      })
    ).toBe(DEFAULT_LANGUAGE);
  });

  it('should return the default language, given an incomplete flattenedPath', () => {
    expect(
      buildLandingPageLanguageFlag({
        _raw: {
          flattenedPath: LANDING_PAGES_FOLDER + '/'
        },
        _id: '_'
      })
    ).toBe(DEFAULT_LANGUAGE);
  });

  it('should throw, given an invalid flattenedPath', () => {
    expect(() =>
      buildLandingPageLanguageFlag({
        _raw: {
          flattenedPath: LANDING_PAGES_FOLDER
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);

    expect(() =>
      buildLandingPageLanguageFlag({
        _raw: {
          flattenedPath: '_' + LANDING_PAGES_FOLDER + '/category/lang/slug'
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);

    expect(() =>
      buildLandingPageLanguageFlag({
        _raw: {
          flattenedPath: '_' + LANDING_PAGES_FOLDER + '/category/slug'
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);
  });
});
