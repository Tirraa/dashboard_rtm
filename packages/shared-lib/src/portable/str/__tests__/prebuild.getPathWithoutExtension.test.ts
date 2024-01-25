import { describe, expect, it } from 'vitest';

import getPathWithoutExtension from '../getPathWithoutExtension';

describe('getPathWithoutExtension', () => {
  const expected = 'path/to/something';

  it('should return the correct paths', () => {
    expect(getPathWithoutExtension('')).toBe('');
    expect(getPathWithoutExtension(expected)).toBe(expected);
    expect(getPathWithoutExtension(`${expected}.any_extension`)).toBe(expected);
  });
});
