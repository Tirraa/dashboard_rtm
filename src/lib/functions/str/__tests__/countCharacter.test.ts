import countCharacter from '../countCharacter';

it('should return a positive value', () => {
  expect(countCharacter('aa    bbqsklqjdkqjdkqjd   aa   qlj,dqkdjqkdjkbb', 'a')).toBe(4);
  expect(countCharacter('aa    bbqsklqjdkqjdkqjd   aa   qlj,dqkdjqkdjkbb', '$')).toBe(0);
});

it('should throw', () => {
  expect(() => {
    countCharacter('aa    bbqsklqjdkqjdkqjd   aa   qlj,dqkdjqkdjkbb', 'asqdqd');
  }).toThrow();
});
