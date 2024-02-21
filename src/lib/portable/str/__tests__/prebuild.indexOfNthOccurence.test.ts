import { describe, expect, it } from 'vitest';

import indexOfNthOccurrence from '../indexOfNthOccurrence';

describe('indexOfNthOccurrence', () => {
  it('should return a positive value, given a string containing the needle', () => {
    const repetitions = 3;
    const strBase = 'abc';
    const strHaystack = strBase.repeat(repetitions);
    const baseLen = strBase.length;

    for (let n = 0; n < repetitions; n++) {
      const expected = n * baseLen;
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      const result = indexOfNthOccurrence(strHaystack, 'a', n + 1);
      expect(result).toBe(expected);
    }
  });

  it('should return -1, given a string not containing the needle', () => {
    const expected = -1;
    const foo = 'foo';
    const invalidNeedle = '$';
    const validNeedle = 'f';

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(indexOfNthOccurrence('', foo, 1)).toBe(expected);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(indexOfNthOccurrence(foo, invalidNeedle, 1)).toBe(expected);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(indexOfNthOccurrence(foo, invalidNeedle, 2)).toBe(expected);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(indexOfNthOccurrence(foo, validNeedle, 0)).toBe(expected);
  });
});
