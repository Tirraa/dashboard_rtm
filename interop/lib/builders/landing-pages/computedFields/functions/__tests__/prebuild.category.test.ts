import { InvalidArgumentsError, LANDING_PAGES_FOLDER } from '##/lib/builders/unifiedImport';
import { describe, expect, it } from 'vitest';

import buildLandingPageCategory from '../category';

describe('category', () => {
  const category = 'category';
  it('should return the category string part, given a valid flattenedPath', () => {
    expect(
      buildLandingPageCategory({
        _raw: {
          flattenedPath: LANDING_PAGES_FOLDER + `/${category}/slug`
        },
        _id: '_'
      })
    ).toBe(category);

    expect(
      buildLandingPageCategory({
        _raw: {
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
          flattenedPath: LANDING_PAGES_FOLDER
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);

    expect(() =>
      buildLandingPageCategory({
        _raw: {
          flattenedPath: LANDING_PAGES_FOLDER + '/'
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);

    expect(() =>
      buildLandingPageCategory({
        _raw: {
          flattenedPath: '_' + LANDING_PAGES_FOLDER + `/${category}/lang/slug`
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);
  });
});
