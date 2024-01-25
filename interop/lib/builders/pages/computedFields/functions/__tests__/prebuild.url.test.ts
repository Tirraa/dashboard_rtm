import { InvalidArgumentsError, DEFAULT_LANGUAGE, PAGES_FOLDER, ROUTES_ROOTS, INDEX_TOKEN } from '##/lib/builders/unifiedImport';
import { describe, expect, it } from 'vitest';

import buildPageUrl from '../url';

describe('url', () => {
  const leaf = 'leaf';
  it('should return a valid url, given a valid input', () => {
    expect(
      buildPageUrl({
        _raw: {
          flattenedPath: PAGES_FOLDER
        },
        _id: '_'
      })
    ).toBe(ROUTES_ROOTS.WEBSITE + DEFAULT_LANGUAGE + '/' + INDEX_TOKEN);

    expect(
      buildPageUrl({
        _raw: {
          flattenedPath: PAGES_FOLDER + '/'
        },
        _id: '_'
      })
    ).toBe(ROUTES_ROOTS.WEBSITE + DEFAULT_LANGUAGE + '/' + INDEX_TOKEN);

    expect(
      buildPageUrl({
        _raw: {
          flattenedPath: PAGES_FOLDER + `/foo/bar/${leaf}`
        },
        _id: '_'
      })
    ).toBe(ROUTES_ROOTS.WEBSITE + `${DEFAULT_LANGUAGE}/foo/bar/${leaf}`);

    expect(
      buildPageUrl({
        _raw: {
          flattenedPath: PAGES_FOLDER + `/foo/bar/baz/${leaf}`
        },
        _id: '_'
      })
    ).toBe(ROUTES_ROOTS.WEBSITE + `${DEFAULT_LANGUAGE}/foo/bar/baz/${leaf}`);
  });

  it('should return a valid path, given a valid input (with default language root)', () => {
    expect(
      buildPageUrl({
        _raw: {
          flattenedPath: PAGES_FOLDER + `/${DEFAULT_LANGUAGE}/`
        },
        _id: '_'
      })
    ).toBe(ROUTES_ROOTS.WEBSITE + DEFAULT_LANGUAGE + '/' + INDEX_TOKEN);

    expect(
      buildPageUrl({
        _raw: {
          flattenedPath: PAGES_FOLDER + `/${DEFAULT_LANGUAGE}/foo/bar/${leaf}`
        },
        _id: '_'
      })
    ).toBe(ROUTES_ROOTS.WEBSITE + `${DEFAULT_LANGUAGE}/foo/bar/${leaf}`);

    expect(
      buildPageUrl({
        _raw: {
          flattenedPath: PAGES_FOLDER + `/${DEFAULT_LANGUAGE}/foo/bar/baz/${leaf}`
        },
        _id: '_'
      })
    ).toBe(ROUTES_ROOTS.WEBSITE + `${DEFAULT_LANGUAGE}/foo/bar/baz/${leaf}`);
  });

  it('should NOT be fault tolerant', () => {
    expect(() =>
      buildPageUrl({
        _raw: {
          flattenedPath: '_' + PAGES_FOLDER + `/foo/bar/baz/${leaf}`
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);
  });
});
