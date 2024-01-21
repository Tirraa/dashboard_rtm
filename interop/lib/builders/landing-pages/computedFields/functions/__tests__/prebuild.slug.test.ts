import { InvalidArgumentsError, LANDING_PAGES_FOLDER } from '##/lib/builders/unifiedImport';
import { describe, expect, it } from 'vitest';

import buildLandingPageSlug, { buildLandingPageSlugFromLpObj } from '../slug';

describe('slug', () => {
  const name = 'slug';
  const category = 'category';
  const slug = category + '-' + name;

  it('should return the category string part, given a valid flattenedPath', () => {
    expect(
      buildLandingPageSlug({
        _raw: {
          flattenedPath: LANDING_PAGES_FOLDER + `/${category}/subcategory/${name}`
        },
        _id: '_'
      })
    ).toBe(slug);

    expect(
      buildLandingPageSlug({
        _raw: {
          flattenedPath: LANDING_PAGES_FOLDER + `/${category}/subcategory/lang/${name}`
        },
        _id: '_'
      })
    ).toBe(slug);
  });

  it('should throw, given an invalid flattenedPath', () => {
    expect(() =>
      buildLandingPageSlugFromLpObj({
        _raw: {
          flattenedPath: LANDING_PAGES_FOLDER
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);

    expect(() =>
      buildLandingPageSlugFromLpObj({
        _raw: {
          flattenedPath: LANDING_PAGES_FOLDER + '/'
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);
  });

  it('should NOT be fault tolerant', () => {
    expect(() =>
      buildLandingPageSlug({
        _raw: {
          flattenedPath: '_' + LANDING_PAGES_FOLDER + `/${category}/subcategory/lang/${name}`
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);
  });
});
