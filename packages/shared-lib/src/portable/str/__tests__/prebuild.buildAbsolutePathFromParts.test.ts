import { describe, expect, it } from 'vitest';

import buildAbsolutePathFromParts from '../buildAbsolutePathFromParts';

describe('buildAbsolutePathFromParts', () => {
  it("should return '/foo', given only one arg", () => {
    expect(buildAbsolutePathFromParts('foo')).toBe('/foo');
  });

  it("should return '/foo/bar/test', given clean and dirty args", () => {
    const expected = '/foo/bar/test';

    expect(buildAbsolutePathFromParts('foo', 'bar', 'test')).toBe(expected);
    expect(buildAbsolutePathFromParts('///foo///', '///bar///', '///test///')).toBe(expected);
    expect(buildAbsolutePathFromParts('foo///', '///bar', 'test///')).toBe(expected);
  });

  it("should return '/' or '//', given empty args", () => {
    expect(buildAbsolutePathFromParts('')).toBe('/');
    expect(buildAbsolutePathFromParts('', '')).toBe('/');
    expect(buildAbsolutePathFromParts('', '', '')).toBe('//');
  });
});
