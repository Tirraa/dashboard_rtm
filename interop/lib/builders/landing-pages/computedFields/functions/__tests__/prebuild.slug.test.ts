import { ForbiddenToUseIndexError, InvalidArgumentsError, LANDING_PAGES_FOLDER, INDEX_TOKEN } from '##/lib/builders/unifiedImport';
import { describe, expect, it } from 'vitest';

import buildLandingPageSlug, { buildLandingPageSlugFromLpObj } from '../slug';

const EXT = '.FAKE_EXT';

describe('slug', () => {
  const name = 'slug';
  const category = 'category';
  const slug = category + '-' + name;

  it('should return the category string part, given a valid flattenedPath', () => {
    expect(
      buildLandingPageSlug({
        _raw: {
          sourceFilePath: LANDING_PAGES_FOLDER + `/${category}/subcategory/${name}` + EXT,
          flattenedPath: LANDING_PAGES_FOLDER + `/${category}/subcategory/${name}`
        },
        _id: '_'
      })
    ).toBe(slug);

    expect(
      buildLandingPageSlug({
        _raw: {
          sourceFilePath: LANDING_PAGES_FOLDER + `/${category}/subcategory/lang/${name}` + EXT,
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
          sourceFilePath: LANDING_PAGES_FOLDER + '/' + INDEX_TOKEN + EXT,
          flattenedPath: LANDING_PAGES_FOLDER
        },
        _id: '_'
      })
    ).toThrowError(ForbiddenToUseIndexError);
  });

  it('should NOT be fault tolerant', () => {
    expect(() =>
      buildLandingPageSlug({
        _raw: {
          sourceFilePath: '_' + LANDING_PAGES_FOLDER + `/${category}/subcategory/lang/${name}` + EXT,
          flattenedPath: '_' + LANDING_PAGES_FOLDER + `/${category}/subcategory/lang/${name}`
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);
  });
});
