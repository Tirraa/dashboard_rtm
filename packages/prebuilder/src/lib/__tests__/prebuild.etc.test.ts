import { describe, expect, it } from 'vitest';

import { objInnerToObj } from '../etc';

describe('objInnerToObj', () => {
  it('should return an obj, given a valid obj inner', () => {
    const objInner = `
      foo: 'bar',
      bar: 'foo',
    `;
    expect(objInnerToObj(objInner)).toStrictEqual({ foo: 'bar', bar: 'foo' });
  });
});
