import InvalidArgumentsError from '##/errors/InvalidArguments';
import { describe, expect, it } from 'vitest';

import countCharacter from '../countCharacter';

describe('countCharacter', () => {
  it('should return a positive value, given strings containing the searched char', () => {
    // eslint-disable-next-line no-magic-numbers
    expect(countCharacter('aa    bbqsklqjdkqjdkqjd   aa   qlj,dqkdjqkdjkbb', 'a')).toBe(4);
    // eslint-disable-next-line no-magic-numbers
    expect(countCharacter('aa    bbqsklqjdkqjdkqjd   aa   qlj,dqkdjqkdjkbb', '$')).toBe(0);
  });

  it('should throw, given char is not a char but a string', () => {
    expect(() => {
      countCharacter('aa    bbqsklqjdkqjdkqjd   aa   qlj,dqkdjqkdjkbb', 'asqdqd');
    }).toThrowError(InvalidArgumentsError);
  });
});
