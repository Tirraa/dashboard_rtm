import { describe, expect, it } from 'vitest';

import { computePagesAmount } from '../usePagination';

describe('computePagesAmount', () => {
  it('should return 2', () => {
    const expected = 2;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const pagesAmount = computePagesAmount(10, 5);
    expect(pagesAmount).toBe(expected);
  });

  it('should return 4 (ceiled)', () => {
    const expected = 4;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const pagesAmount = computePagesAmount(10, 3);
    expect(pagesAmount).toBe(expected);
  });
});
