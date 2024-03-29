import { InvalidArgumentsError, DEFAULT_LANGUAGE, PAGES_FOLDER, INDEX_TOKEN } from '##/lib/builders/unifiedImport';
import { describe, expect, it } from 'vitest';

import buildPagePath from '../path';

describe('path', () => {
  const leaf = 'leaf';
  it('should return a valid path, given a valid input', () => {
    expect(
      buildPagePath({
        _raw: {
          flattenedPath: PAGES_FOLDER
        },
        _id: '_'
      })
    ).toBe(INDEX_TOKEN);

    expect(
      buildPagePath({
        _raw: {
          flattenedPath: PAGES_FOLDER + `/foo/bar/${leaf}`
        },
        _id: '_'
      })
    ).toBe(`foo/bar/${leaf}`);

    expect(
      buildPagePath({
        _raw: {
          flattenedPath: PAGES_FOLDER + `/foo/bar/baz/${leaf}`
        },
        _id: '_'
      })
    ).toBe(`foo/bar/baz/${leaf}`);
  });

  it('should return a valid path, given a valid input (with default language root)', () => {
    expect(
      buildPagePath({
        _raw: {
          flattenedPath: PAGES_FOLDER + `/${DEFAULT_LANGUAGE}/foo/bar/${leaf}`
        },
        _id: '_'
      })
    ).toBe(`foo/bar/${leaf}`);

    expect(
      buildPagePath({
        _raw: {
          flattenedPath: PAGES_FOLDER + `/${DEFAULT_LANGUAGE}/foo/bar/baz/${leaf}`
        },
        _id: '_'
      })
    ).toBe(`foo/bar/baz/${leaf}`);
  });

  it('should return a valid path, given a valid input with index notation', () => {
    expect(
      buildPagePath({
        _raw: {
          flattenedPath: PAGES_FOLDER + `/foo/bar/${leaf}`
        },
        _id: '_'
      })
    ).toBe(`foo/bar/${leaf}`);

    expect(
      buildPagePath({
        _raw: {
          flattenedPath: PAGES_FOLDER + `/foo/bar/baz/${leaf}`
        },
        _id: '_'
      })
    ).toBe(`foo/bar/baz/${leaf}`);
  });

  it('should return a valid path, given a valid input (with default language root and index notation)', () => {
    expect(
      buildPagePath({
        _raw: {
          flattenedPath: PAGES_FOLDER + `/${DEFAULT_LANGUAGE}`
        },
        _id: '_'
      })
    ).toBe(INDEX_TOKEN);

    expect(
      buildPagePath({
        _raw: {
          flattenedPath: PAGES_FOLDER + `/${DEFAULT_LANGUAGE}/foo/bar/${leaf}`
        },
        _id: '_'
      })
    ).toBe(`foo/bar/${leaf}`);

    expect(
      buildPagePath({
        _raw: {
          flattenedPath: PAGES_FOLDER + `/${DEFAULT_LANGUAGE}/foo/bar/baz/${leaf}`
        },
        _id: '_'
      })
    ).toBe(`foo/bar/baz/${leaf}`);
  });

  it('should NOT be fault tolerant', () => {
    expect(() =>
      buildPagePath({
        _raw: {
          flattenedPath: '_' + PAGES_FOLDER + `/foo/bar/baz/${leaf}`
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);
  });
});
