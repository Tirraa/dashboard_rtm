import { describe, expect, it } from 'vitest';

import { getEnumKeys } from '../../../typescript';

describe('getEnumKeys', () => {
  it('should return an array of enum keys, given a fake enum', () => {
    enum Fake_E {
      foo,
      bar
    }

    const result = getEnumKeys(Fake_E);
    const expected: typeof result = ['foo', 'bar'];
    expect(result).toStrictEqual(expected);
  });

  it('should return an empty array, given an empty fake enum', () => {
    enum Empty_E {}
    const result: never[] = getEnumKeys(Empty_E);
    expect(result).toStrictEqual([]);
  });
});
