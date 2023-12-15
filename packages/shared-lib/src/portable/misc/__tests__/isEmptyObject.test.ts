import { describe, expect, it } from 'vitest';
import isEmptyObject from '../isEmptyObject';

describe('isEmptyObject', () => {
  it('should return true, given an empty object', () => expect(isEmptyObject({})).toBe(true));

  it('should return false, given a not empty object', () => expect(isEmptyObject({ foo: 'bar' })).toBe(false));
});
