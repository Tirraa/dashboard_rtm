import { ForbiddenToUseIndexError, InvalidArgumentsError, LANDING_PAGES_FOLDER, INDEX_TOKEN } from '##/lib/builders/unifiedImport';
import { describe, expect, it } from 'vitest';

import buildLandingPageCategory from '../category';

const EXT = '.FAKE_EXT';

describe('category', () => {
  const category = 'category';
  it('should return the category string part, given a valid flattenedPath', () => {
    expect(
      buildLandingPageCategory({
        _raw: {
          sourceFilePath: LANDING_PAGES_FOLDER + `/${category}/slug` + EXT,
          flattenedPath: LANDING_PAGES_FOLDER + `/${category}/slug`
        },
        _id: '_'
      })
    ).toBe(category);

    expect(
      buildLandingPageCategory({
        _raw: {
          sourceFilePath: LANDING_PAGES_FOLDER + `/${category}/lang/slug` + EXT,
          flattenedPath: LANDING_PAGES_FOLDER + `/${category}/lang/slug`
        },
        _id: '_'
      })
    ).toBe(category);
  });

  it('should throw, given an invalid flattenedPath', () => {
    expect(() =>
      buildLandingPageCategory({
        _raw: {
          sourceFilePath: LANDING_PAGES_FOLDER + '/' + INDEX_TOKEN + EXT,
          flattenedPath: LANDING_PAGES_FOLDER
        },
        _id: '_'
      })
    ).toThrowError(ForbiddenToUseIndexError);

    expect(() =>
      buildLandingPageCategory({
        _raw: {
          sourceFilePath: '_' + LANDING_PAGES_FOLDER + `/${category}/lang/slug` + EXT,
          flattenedPath: '_' + LANDING_PAGES_FOLDER + `/${category}/lang/slug`
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);
  });
});
