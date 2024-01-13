import { InvalidArgumentsError, LANDING_PAGES_FOLDER } from '##/lib/builders/unifiedImport';
import { describe, expect, it } from 'vitest';

import buildLandingPageSlug from '../slug';

describe('slug', () => {
  const slug = 'slug';
  it('should return the category string part, given a valid flattenedPath', () => {
    expect(
      buildLandingPageSlug({
        _raw: {
          flattenedPath: LANDING_PAGES_FOLDER + `/category/subcategory/${slug}`
        },
        _id: '_'
      })
    ).toBe(slug);

    expect(
      buildLandingPageSlug({
        _raw: {
          flattenedPath: LANDING_PAGES_FOLDER + `/category/subcategory/lang/${slug}`
        },
        _id: '_'
      })
    ).toBe(slug);
  });

  it('should throw, given an invalid flattenedPath', () => {
    expect(() =>
      buildLandingPageSlug({
        _raw: {
          flattenedPath: LANDING_PAGES_FOLDER
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);

    expect(() =>
      buildLandingPageSlug({
        _raw: {
          flattenedPath: LANDING_PAGES_FOLDER + '/'
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);
  });

  it('should be fault tolerant', () => {
    expect(
      buildLandingPageSlug({
        _raw: {
          flattenedPath: '_' + LANDING_PAGES_FOLDER + `/category/subcategory/lang/${slug}`
        },
        _id: '_'
      })
    ).toBe(slug);
  });
});
