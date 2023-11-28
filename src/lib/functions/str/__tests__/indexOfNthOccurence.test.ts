import indexOfNthOccurrence from '../indexOfNthOccurrence';

it('should return a positive value', () => {
  const repetitions = 3;
  const strBase = 'abc';
  const strHaystack = strBase.repeat(repetitions);
  const baseLen = strBase.length;

  for (let n = 0; n < repetitions; n++) {
    const expected = n * baseLen;
    const result = indexOfNthOccurrence(strHaystack, 'a', n + 1);
    expect(result).toBe(expected);
  }
});

it('should return -1', () => {
  const expected = -1;
  const foo = 'foo';
  const invalidNeedle = '$';
  const validNeedle = 'f';

  expect(indexOfNthOccurrence('', foo, 1)).toBe(expected);
  expect(indexOfNthOccurrence(foo, invalidNeedle, 1)).toBe(expected);
  expect(indexOfNthOccurrence(foo, invalidNeedle, 2)).toBe(expected);
  expect(indexOfNthOccurrence(foo, validNeedle, 0)).toBe(expected);
});
