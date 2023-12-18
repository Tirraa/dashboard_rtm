import { describe, expect, it } from 'vitest';

import getRefCurrentPtr from '../getRefCurrentPtr';

describe('getRefCurrentPtr', () => {
  it('should return current value, given a valid RefObject', () => {
    const ptr = getRefCurrentPtr({
      current: 'foo'
    });
    expect(ptr).toBe('foo');
  });
});
