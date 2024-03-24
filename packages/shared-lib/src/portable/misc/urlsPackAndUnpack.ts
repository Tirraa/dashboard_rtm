import base64url from 'base64url';

type Id = number;
type EncodedString = string;

export const MIN_ID: Id = 0;

/* eslint-disable @typescript-eslint/no-magic-numbers */

/**
 * @throws {RangeError}
 */
export function packIds(unpacked: Id[]): EncodedString {
  if (unpacked.length === 0) return '';

  const packed: number[] = [];

  for (let id of unpacked) {
    if (id < MIN_ID) throw new RangeError(`Invalid ID: ${id}`);

    while (id > 0x7f) {
      packed.push((id & 0x7f) | 0x80);
      id >>= 7;
    }
    packed.push(id);
  }

  return base64url.encode(Buffer.from(packed));
}

/**
 * @throws {URIError}
 */
export function unpackIds(encodedString: EncodedString): Id[] {
  if (encodedString === '') return [];

  const packed = base64url.toBuffer(encodedString);
  const unpacked: Id[] = [];

  let id = 0;
  let shift = 0;

  for (let i = 0; i < packed.length; i++) {
    const byte = packed[i];
    id |= (byte & 0x7f) << shift;

    if ((byte & 0x80) === 0) {
      unpacked.push(id);
      id = 0;
      shift = 0;
    } else shift += 7;
  }

  if (shift !== 0) throw new URIError();
  return unpacked;
}

/* eslint-enable @typescript-eslint/no-magic-numbers */
