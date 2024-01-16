import { InvalidArgumentsError, LANDING_PAGES_FOLDER } from '##/lib/builders/unifiedImport';
import { describe, expect, it } from 'vitest';

import buildLandingPageSlug, { buildLandingPageSlugFromLpObj, buildLandingPageCategory } from '../slug';

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

describe('slug', () => {
  const name = 'slug';
  const category = 'category';
  const slug = [category, name].join('-');

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
