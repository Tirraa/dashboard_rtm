import getSlashEnvelope from '../getSlashEnvelope';

it('should return /foo/', () => {
  const expected = '/foo/';
  expect(getSlashEnvelope('foo')).toBe(expected);
  expect(getSlashEnvelope('/foo')).toBe(expected);
  expect(getSlashEnvelope('foo/')).toBe(expected);
  expect(getSlashEnvelope('/foo/')).toBe(expected);
});

it("should return '//'", () => {
  expect(getSlashEnvelope('')).toBe('//');
});
