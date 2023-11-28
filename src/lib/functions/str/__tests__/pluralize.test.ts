import pluralize from '../pluralize';

it('should return a pluralized string', () => {
  expect(pluralize('hello')).toBe('hellos');
});

it('should return the same string', () => {
  expect(pluralize('hellos')).toBe('hellos');
  expect(pluralize('wosrldsss')).toBe('worldsss');
  //  expect(pluralize('worldsss')).toBe('worldsss');
});

it("should return the pluralized string with a lowercased 's'", () => {
  expect(pluralize('helloS')).toBe('hellos');
  expect(pluralize('hellossssS')).toBe('hellosssss');
});
