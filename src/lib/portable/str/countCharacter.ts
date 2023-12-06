import InvalidArgumentsError from '../../../../interop/errors/InvalidArguments';

/**
 * @throws {InvalidArgumentsError}
 */
function countCharacter(str: string, char: string) {
  if (char.length !== 1) throw new InvalidArgumentsError(countCharacter.name, { char }, "char's length must be: 1");

  let count = 0;
  for (const currentChar of str) if (currentChar === char) count++;
  return count;
}

export default countCharacter;
