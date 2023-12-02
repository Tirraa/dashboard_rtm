import isEmptyObject from '../isEmptyObject';

it('should return true for an empty object', () => expect(isEmptyObject({})).toBe(true));

it('should return false for a not empty object', () => expect(isEmptyObject({ foo: 'bar' })).toBe(false));
