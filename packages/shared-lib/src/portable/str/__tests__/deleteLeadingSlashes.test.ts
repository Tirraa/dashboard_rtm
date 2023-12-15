import { describe, expect, it } from 'vitest';
import deleteLeadingSlashes from '../deleteLeadingSlashes';

describe('deleteLeadingSlashes', () => {
  it("should return '', given an empty string", () => {
    expect(deleteLeadingSlashes('')).toBe('');
  });

  it("should return '$'", () => {
    const expected = '$';
    expect(deleteLeadingSlashes('/////////////' + expected)).toBe(expected);
  });

  it("should return 'foo'", () => {
    const expected = 'foo';
    expect(deleteLeadingSlashes('/' + expected)).toBe(expected);
    expect(deleteLeadingSlashes('//////' + expected)).toBe(expected);
  });

  it("should return '', given a string which includes only slashes", () => {
    expect(deleteLeadingSlashes('/////////////')).toBe('');
  });
});
