import InvalidArgumentsError from '../../../../interop/errors/InvalidArguments';

/**
 * @throws {InvalidArgumentsError}
 */
function countCharacter(str: string, char: string) {
  // Stryker Workaround 1. Pointless mutants (fault tolerant).
  // Stryker disable next-line ObjectLiteral,StringLiteral
  // eslint-disable-next-line no-magic-numbers
  if (char.length !== 1) throw new InvalidArgumentsError(countCharacter.name, { char }, "char's length must be: 1");

  let count = 0;
  for (const currentChar of str) if (currentChar === char) count++;
  return count;
}

export default countCharacter;
