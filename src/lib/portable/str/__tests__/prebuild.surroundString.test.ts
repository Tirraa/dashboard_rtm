import { describe, expect, it } from 'vitest';

import surroundString from '../surroundString';

describe('surroundString', () => {
  it('should return envelope + foo + envelope', () => {
    const foo = 'foo';
    const envelope = 'bar';
    const expected = envelope + foo + envelope;

    expect(surroundString(foo, envelope)).toBe(expected);
    expect(surroundString(envelope + foo, envelope)).toBe(expected);
    expect(surroundString(foo + envelope, envelope)).toBe(expected);
    expect(surroundString(expected, envelope)).toBe(expected);
  });

  it("should return 'barbar', given '' as input and 'bar' as envelope", () => {
    const envelope = 'bar';
    // eslint-disable-next-line no-magic-numbers
    expect(surroundString('', envelope)).toBe(envelope.repeat(2));
  });
});
