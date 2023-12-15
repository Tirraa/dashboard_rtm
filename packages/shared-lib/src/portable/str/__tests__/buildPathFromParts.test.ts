import { describe, expect, it } from 'vitest';
import buildPathFromParts from '../buildPathFromParts';

describe('buildPathFromParts', () => {
  it('should return the same value as input, given only one argument', () => {
    expect(buildPathFromParts('foo')).toBe('foo');
    expect(buildPathFromParts('')).toBe('');
  });

  it('should return a path, given two arguments', () => {
    expect(buildPathFromParts('foo', 'bar')).toBe('foo/bar');
  });

  it('should return a cleaned path, given dirty arguments', () => {
    expect(buildPathFromParts('foo///', 'bar///')).toBe('foo/bar');
    expect(buildPathFromParts('///foo///', '///bar///')).toBe('foo/bar');
  });

  it("should return '/' or '//', given empty arguments", () => {
    expect(buildPathFromParts('', '')).toBe('/');
    expect(buildPathFromParts('', '', '')).toBe('//');
  });
});
