/*
{ToDo} Implement this pack/unpack with base64url and bits magic if, one day, this issue is fixed:
https://github.com/vercel/next.js/issues/40178
-> https://github.com/Tirraa/dashboard_rtm/pull/116/commits/c5cd294520c0abeebe4a32b138e165438c4a5edb
*/

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
