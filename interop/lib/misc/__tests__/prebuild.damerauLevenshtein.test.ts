import { describe, expect, it } from 'vitest';

import damerauLevenshtein from '../damerauLevenshtein';

// https://github.com/aldebaran/libport/blob/master/tests/libport/damerau-levenshtein-distance.cc

describe('damerauLevenshtein', () => {
  const emptyString = '';

  it('should pass, empty strings', () => {
    const distance = damerauLevenshtein(emptyString, emptyString);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(distance).toBe(0);
  });

  it('should pass, distance 0', () => {
    const s = 'cat';
    const distance = damerauLevenshtein(s, s);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(distance).toBe(0);
  });

  it('should pass, 100% distance', () => {
    const s2 = 'test';
    const expectedDistance = s2.length;
    const distance = damerauLevenshtein(emptyString, s2);
    expect(distance).toBe(expectedDistance);
  });

  it('should pass, cat and dog', () => {
    const distance = damerauLevenshtein('cat', 'dog');
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(distance).toBe(3);
  });

  it('should pass, deletion', () => {
    const distance = damerauLevenshtein('azertyuiop', 'aeryuop');
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(distance).toBe(3);
  });

  it('should pass, insertion', () => {
    const distance = damerauLevenshtein('aeryuop', 'azertyuiop');
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(distance).toBe(3);
  });

  it('should pass, substitution', () => {
    const distance = damerauLevenshtein('azertyuiopqsdfghjklmwxcvbn,', 'qwertyuiopasdfghjkl;zxcvbnm');
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(distance).toBe(6);
  });

  it('should pass, transposition', () => {
    const distance = damerauLevenshtein('1234567890', '1324576809');
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(distance).toBe(3);
  });
});

describe('damerauLevenshtein (early termination)', () => {
  it('should pass, cat and dog, early terminating at 2', () => {
    const maxScore = 2;
    const distance = damerauLevenshtein('cat', 'dog', maxScore);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(distance).toBe(maxScore + 1);
  });

  it('should pass, cat and dog, early terminating at 0, should always return 0', () => {
    const maxScore = 0;
    const distance = damerauLevenshtein('cat', 'dog', maxScore);

    expect(distance).toBe(maxScore);
  });
});
