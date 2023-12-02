import deleteTrailingSlashes from '../deleteTrailingSlashes';

it("should return 'foo'", () => {
  expect(deleteTrailingSlashes('foo/')).toBe('foo');
  expect(deleteTrailingSlashes('foo//////')).toBe('foo');
});

it("should return ''", () => {
  expect(deleteTrailingSlashes('/////////////')).toBe('');
});

it("should return '$'", () => {
  expect(deleteTrailingSlashes('$/////////////')).toBe('$');
});
