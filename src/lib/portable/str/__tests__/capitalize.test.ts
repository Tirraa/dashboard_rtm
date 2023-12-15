import { describe, expect, it } from 'vitest';
import capitalize from '../capitalize';

describe('capitalize', () => {
  it('should return capitalized string, given any string', () => {
    expect(capitalize('abc')).toBe('Abc');
    expect(capitalize('ABC')).toBe('ABC');
    expect(capitalize(' aBC')).toBe(' aBC');
  });

  it("should return '', given an empty string", () => {
    expect(capitalize('')).toBe('');
  });
});
