import endsWithChars from '../endsWithChar';

it('should return true', () => {
  const endsChar = 'abc';
  expect(endsWithChars('foo bar abc', endsChar)).toBe(true);
  expect(endsWithChars('foo bar acb', endsChar)).toBe(true);
  expect(endsWithChars('foo bar cba', endsChar)).toBe(true);
});

it("should return false given that str doesn't match endsChar", () => {
  const endsChar = '$';
  expect(endsWithChars('foo bar abc', endsChar)).toBe(false);
  expect(endsWithChars('foo bar acb', endsChar)).toBe(false);
  expect(endsWithChars('foo bar cba', endsChar)).toBe(false);
});

it('should return false given that endsChar is empty', () => {
  const endsChar = '';
  expect(endsWithChars('foo bar abc', endsChar)).toBe(false);
  expect(endsWithChars('foo bar acb', endsChar)).toBe(false);
  expect(endsWithChars('foo bar cba', endsChar)).toBe(false);
});
