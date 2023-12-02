import buildPathFromParts from '../buildPathFromParts';

it('should return the same value as input', () => {
  expect(buildPathFromParts('foo')).toBe('foo');
  expect(buildPathFromParts('')).toBe('');
});

it('should return a path', () => {
  expect(buildPathFromParts('foo', 'bar')).toBe('foo/bar');
});

it('should return a cleaned path', () => {
  expect(buildPathFromParts('foo///', 'bar///')).toBe('foo/bar');
  expect(buildPathFromParts('///foo///', '///bar///')).toBe('foo/bar');
});

it("should return '/' or '//'", () => {
  expect(buildPathFromParts('', '')).toBe('/');
  expect(buildPathFromParts('', '', '')).toBe('//');
});
