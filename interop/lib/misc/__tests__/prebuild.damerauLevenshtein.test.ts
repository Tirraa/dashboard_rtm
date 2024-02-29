import { describe, expect, it } from 'vitest';

import damerauLevenshtein from '../damerauLevenshtein';

describe('damerauLevenshtein', () => {
  it('should pass', () => {
    const distance = damerauLevenshtein('cat', 'cat');
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(distance).toBe(0);
  });

  it('should pass', () => {
    const distance = damerauLevenshtein('cat', 'dog');
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(distance).toBe(3);
  });

  it('should pass', () => {
    const distance = damerauLevenshtein('', 'test');
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(distance).toBe(4);
  });

  it('should pass', () => {
    const distance = damerauLevenshtein('abcd', 'bacd');
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(distance).toBe(1);
  });

  it('should pass', () => {
    const distance = damerauLevenshtein('kitten', 'sitting');
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(distance).toBe(3);
  });

  it('should pass', () => {
    const distance = damerauLevenshtein('Saturday', 'Sunday');
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(distance).toBe(3);
  });

  it('should pass', () => {
    const distance = damerauLevenshtein('This is a long string to test', 'This is a long string to taste');
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(distance).toBe(2);
  });
});
