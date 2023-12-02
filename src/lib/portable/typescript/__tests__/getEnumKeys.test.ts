import getEnumKeys from '../getEnumKeys';

it('should return an array of enum keys', () => {
  enum DummyEnum {
    foo,
    bar
  }

  const result = getEnumKeys(DummyEnum);
  const expected: typeof result = ['foo', 'bar'];
  expect(result).toEqual(expected);
});

it('should return an empty array for an empty enum', () => {
  enum DummyEmptyEnum {}
  const result: never[] = getEnumKeys(DummyEmptyEnum);
  expect(result).toEqual([]);
});
