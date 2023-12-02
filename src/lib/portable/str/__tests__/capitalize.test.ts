import capitalize from '../capitalize';

it('should return capitalized string', () => {
  expect(capitalize('abc')).toBe('Abc');
  expect(capitalize('ABC')).toBe('ABC');
});

it("should return ''", () => {
  expect(capitalize('')).toBe('');
});
