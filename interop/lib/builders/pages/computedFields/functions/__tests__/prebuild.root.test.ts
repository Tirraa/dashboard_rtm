import { InvalidArgumentsError, DEFAULT_LANGUAGE, PAGES_FOLDER } from '##/lib/builders/unifiedImport';
import { describe, expect, it } from 'vitest';

import buildPageRoot from '../root';

describe('root', () => {
  const root = 'root';
  it('should return the top level root, given a valid input', () => {
    expect(
      buildPageRoot({
        _raw: {
          flattenedPath: PAGES_FOLDER + `/${root}`
        },
        _id: '_'
      })
    ).toBe('/');

    expect(
      buildPageRoot({
        _raw: {
          flattenedPath: PAGES_FOLDER + `/${root}/foo/bar`
        },
        _id: '_'
      })
    ).toBe(root);

    expect(
      buildPageRoot({
        _raw: {
          flattenedPath: PAGES_FOLDER + `/${root}/foo/bar/baz`
        },
        _id: '_'
      })
    ).toBe(root);
  });

  it('should return the top level root, given a valid input (with default language root)', () => {
    expect(
      buildPageRoot({
        _raw: {
          flattenedPath: PAGES_FOLDER + `/${DEFAULT_LANGUAGE}/`
        },
        _id: '_'
      })
    ).toBe('/');

    expect(
      buildPageRoot({
        _raw: {
          flattenedPath: PAGES_FOLDER + `/${DEFAULT_LANGUAGE}/${root}/foo/bar/baz`
        },
        _id: '_'
      })
    ).toBe(root);

    expect(
      buildPageRoot({
        _raw: {
          flattenedPath: PAGES_FOLDER + `/${DEFAULT_LANGUAGE}/${root}/foo/bar/baz`
        },
        _id: '_'
      })
    ).toBe(root);
  });

  it('should return the top level root, given a flattenedPath corresponding to index notation', () => {
    expect(
      buildPageRoot({
        _raw: {
          flattenedPath: PAGES_FOLDER
        },
        _id: '_'
      })
    ).toBe('/');
  });

  it('should NOT be fault tolerant', () => {
    expect(() =>
      buildPageRoot({
        _raw: {
          flattenedPath: '_' + PAGES_FOLDER + `/${root}/foo/bar/baz`
        },
        _id: '_'
      })
    ).toThrowError(InvalidArgumentsError);
  });
});
