import getEnumKeys from '../getEnumKeys';

it('should return an array of enum keys', () => {
  enum Fake_E {
    foo,
    bar
  }

  const result = getEnumKeys(Fake_E);
  const expected: typeof result = ['foo', 'bar'];
  expect(result).toEqual(expected);
});

it('should return an empty array for an empty enum', () => {
  enum Empty_E {}
  const result: never[] = getEnumKeys(Empty_E);
  expect(result).toEqual([]);
});
