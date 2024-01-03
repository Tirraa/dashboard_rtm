import { describe, expect, it } from 'vitest';

import endsWithChars from '../endsWithChar';

describe('endsWithChar', () => {
  it('should return true, given strings ending with endChars', () => {
    const endChars = 'abc';
    expect(endsWithChars('foo bar abc', endChars)).toBe(true);
    expect(endsWithChars('foo bar acb', endChars)).toBe(true);
    expect(endsWithChars('foo bar cba', endChars)).toBe(true);
  });

  it('should return false, given strings not ending with endChars', () => {
    const endChars = '$';
    expect(endsWithChars('foo bar abc', endChars)).toBe(false);
    expect(endsWithChars('foo bar acb', endChars)).toBe(false);
    expect(endsWithChars('foo bar cba', endChars)).toBe(false);
  });

  it('should return false, given endChars is empty', () => {
    const endChars = '';
    expect(endsWithChars('foo bar abc', endChars)).toBe(false);
    expect(endsWithChars('foo bar acb', endChars)).toBe(false);
    expect(endsWithChars('foo bar cba', endChars)).toBe(false);
  });
});
