import { describe, expect, it } from 'vitest';

import sortNumbers from '../sortNumbers';

describe('sortNumbers', () => {
  it('should sort correctly, given numbers list', () => {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(sortNumbers([2, 1, 3])).toStrictEqual([1, 2, 3]);
  });
});
