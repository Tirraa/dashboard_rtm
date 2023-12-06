import getEnumKeys from '../getEnumKeys';

it('should return an array of enum keys', () => {
  // eslint-disable-next-line no-unused-vars
  enum Fake_E {
    // eslint-disable-next-line no-unused-vars
    foo,
    // eslint-disable-next-line no-unused-vars
    bar
  }

  const result = getEnumKeys(Fake_E);
  const expected: typeof result = ['foo', 'bar'];
  expect(result).toEqual(expected);
});

it('should return an empty array for an empty enum', () => {
  // eslint-disable-next-line no-unused-vars
  enum Empty_E {}
  const result: never[] = getEnumKeys(Empty_E);
  expect(result).toEqual([]);
});
