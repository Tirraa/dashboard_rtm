import surroundString from '../surroundString';

it('should return /foo/', () => {
  const foo = 'foo';
  const envelope = 'bar';
  const expected = envelope + foo + envelope;
  expect(surroundString(foo, envelope)).toBe(expected);
  expect(surroundString(envelope + foo, envelope)).toBe(expected);
  expect(surroundString(foo + envelope, envelope)).toBe(expected);
  expect(surroundString(expected, envelope)).toBe(expected);
});

it("should return 'barbar'", () => {
  const envelope = 'bar';
  expect(surroundString('', envelope)).toBe(envelope.repeat(2));
});
