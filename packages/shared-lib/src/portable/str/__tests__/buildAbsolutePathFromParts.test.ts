import buildAbsolutePathFromParts from '../buildAbsolutePathFromParts';

it("should return '/foo/bar/test'", () => {
  const expected = '/foo/bar/test';

  expect(buildAbsolutePathFromParts('foo', 'bar', 'test')).toBe(expected);
  expect(buildAbsolutePathFromParts('///foo///', '///bar///', '///test///')).toBe(expected);
  expect(buildAbsolutePathFromParts('foo///', '///bar', 'test///')).toBe(expected);
});

it("should return '/' or '//'", () => {
  expect(buildAbsolutePathFromParts('')).toBe('/');
  expect(buildAbsolutePathFromParts('', '')).toBe('/');
  expect(buildAbsolutePathFromParts('', '', '')).toBe('//');
});
