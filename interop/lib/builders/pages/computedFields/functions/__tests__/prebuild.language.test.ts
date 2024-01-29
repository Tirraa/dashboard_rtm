import { InvalidArgumentsError, DEFAULT_LANGUAGE, PAGES_FOLDER, INDEX_TOKEN } from '##/lib/builders/unifiedImport';
import { describe, expect, it } from 'vitest';
import { LANGUAGES } from '##/config/i18n';

import buildPageLanguageFlag from '../language';

const EXT = '.FAKE_EXT';

describe('language', () => {
  const PREFIX = '$';
  let prefixAcc = PREFIX;
  while (LANGUAGES.includes((prefixAcc + DEFAULT_LANGUAGE) as any)) prefixAcc += PREFIX;
  const invalidLanguage = prefixAcc + DEFAULT_LANGUAGE;

  it('should be fault tolerant, given an invalid language in the flattenedPath (fallback on default language)', () => {
    expect(
      buildPageLanguageFlag({
        _raw: {
          sourceFilePath: PAGES_FOLDER + `/${invalidLanguage}/slug` + EXT,
          flattenedPath: PAGES_FOLDER + `/${invalidLanguage}/slug`
        },
        _id: '_'
      })
    ).toBe(DEFAULT_LANGUAGE);
  });

  it('should return the default language, given the valid default language in the flattenedPath', () => {
    expect(
      buildPageLanguageFlag({
        _raw: {
          sourceFilePath: PAGES_FOLDER + `/${DEFAULT_LANGUAGE}/slug` + EXT,
          flattenedPath: PAGES_FOLDER + `/${DEFAULT_LANGUAGE}/slug`
        },
        _id: '_'
      })
    ).toBe(DEFAULT_LANGUAGE);
  });

  it('should return the default language, given a valid flattenedPath without language param', () => {
    expect(
      buildPageLanguageFlag({
        _raw: {
          sourceFilePath: PAGES_FOLDER + '/slug' + EXT,
          flattenedPath: PAGES_FOLDER + '/slug'
        },
        _id: '_'
      })
    ).toBe(DEFAULT_LANGUAGE);
  });

  it('should return the default language, given an incomplete flattenedPath', () => {
    expect(
      buildPageLanguageFlag({
        _raw: {
          sourceFilePath: PAGES_FOLDER + '/' + INDEX_TOKEN + EXT,
          flattenedPath: PAGES_FOLDER
        },
        _id: '_'
      })
    ).toBe(DEFAULT_LANGUAGE);
  });

  it('should throw, given an invalid flattenedPath', () => {
    expect(() =>
      buildPageLanguageFlag({
        _raw: {
          sourceFilePath: '_' + PAGES_FOLDER + '/slug' + EXT,
          flattenedPath: '_' + PAGES_FOLDER + '/slug'
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);
  });
});
