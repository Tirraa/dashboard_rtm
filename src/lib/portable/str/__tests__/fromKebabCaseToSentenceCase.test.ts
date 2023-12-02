import fromKebabCaseToSentenceCase from '../fromKebabCaseToSentenceCase';

it('should return a sentence case str', () => {
  expect(fromKebabCaseToSentenceCase('foo-bar')).toBe('Foo bar');
  expect(fromKebabCaseToSentenceCase('Foo')).toBe('Foo');
});

it("should return ''", () => {
  expect(fromKebabCaseToSentenceCase('')).toBe('');
});
