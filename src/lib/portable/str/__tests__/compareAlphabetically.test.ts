import { describe, expect, it } from 'vitest';

import compareAlphabetically from '../compareAlphabetically';

describe('compareAlphabetically', () => {
  it('should return the correct result (basic test, since it relays on native functions)', () => {
    const language = 'fr';
    const [s1, s2] = ['M-Z', 'Z-A'];

    expect(compareAlphabetically(s1, s2, language)).toBe(-1);
    expect(compareAlphabetically(s2, s1, language)).toBe(1);
  });
});
