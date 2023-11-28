import deleteLeadingSlashes from '../deleteLeadingSlashes';

it("should return 'foo'", () => {
  expect(deleteLeadingSlashes('/foo')).toBe('foo');
  expect(deleteLeadingSlashes('//////foo')).toBe('foo');
});

it("should return ''", () => {
  expect(deleteLeadingSlashes('/////////////')).toBe('');
});

it("should return '$'", () => {
  expect(deleteLeadingSlashes('/////////////$')).toBe('$');
});
