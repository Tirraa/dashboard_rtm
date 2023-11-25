import InvalidArgumentsError from '../../../errors/exceptions/InvalidArgument';

/**
 * @throws {InvalidArgumentsError}
 */
export function countCharacter(str: string, char: string) {
  if (char.length !== 1) throw new InvalidArgumentsError(countCharacter.name, { char }, "char's length must be: 1");

  let count = 0;
  for (let i = 0; i < str.length; i++) if (str.charAt(i) === char) count++;
  return count;
}

export default countCharacter;
