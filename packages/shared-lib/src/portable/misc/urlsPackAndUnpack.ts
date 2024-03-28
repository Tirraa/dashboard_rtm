type Id = number;
type EncodedString = string;

export const MIN_ID: Id = 0;

/**
 * @throws {RangeError}
 */
export function packIds(unpacked: Id[]): EncodedString {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (unpacked.length === 0) return '';

  if (unpacked.some((n) => n < MIN_ID)) throw new RangeError();
  return unpacked.join('_');
}

/**
 * @throws {TypeError}
 */
export function unpackIds(encodedString: EncodedString): Id[] {
  if (encodedString === '') return [];

  const unpacked: Id[] = encodedString.split('_').map((n) => {
    const unpackedNumber = Number(n);
    if (isNaN(unpackedNumber)) throw new TypeError();
    return unpackedNumber;
  });
  return unpacked;
}
