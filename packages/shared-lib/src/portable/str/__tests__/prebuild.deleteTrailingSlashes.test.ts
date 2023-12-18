import { describe, expect, it } from 'vitest';

import deleteTrailingSlashes from '../deleteTrailingSlashes';

describe('deleteTrailingSlashes', () => {
  it("should return '', given an empty string", () => {
    expect(deleteTrailingSlashes('')).toBe('');
  });

  it("should return '$'", () => {
    const expected = '$';
    expect(deleteTrailingSlashes(expected + '/////////////')).toBe(expected);
  });

  it("should return 'foo'", () => {
    const expected = 'foo';
    expect(deleteTrailingSlashes(expected + '/')).toBe(expected);
    expect(deleteTrailingSlashes(expected + '//////')).toBe(expected);
  });

  it("should return '', given string which only includes slashes", () => {
    expect(deleteTrailingSlashes('/////////////')).toBe('');
  });
});
