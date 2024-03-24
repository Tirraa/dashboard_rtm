import base64url from 'base64url';

type Id = number;
type EncodedString = string;

export const MIN_ID: Id = 0;

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const [SEVEN_BITS_MASK, EIGHTH_BIT_MASK, SHIFT_STEP] = [0x7f, 0x80, 7];

/**
 * @throws {RangeError}
 */
export function packIds(unpacked: Id[]): EncodedString {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (unpacked.length === 0) return '';

  const packed: Id[] = [];

  for (let id of unpacked) {
    if (id < MIN_ID) throw new RangeError();

    while (id > SEVEN_BITS_MASK) {
      packed.push((id & SEVEN_BITS_MASK) | EIGHTH_BIT_MASK);
      id >>= SHIFT_STEP; // lol this is not Haskell
    }
    packed.push(id);
  }

  return base64url.encode(Buffer.from(packed));
}

/**
 * @throws {RangeError}
 */
export function unpackIds(encodedString: EncodedString): Id[] {
  if (encodedString === '') return [];

  const packed: Buffer = base64url.toBuffer(encodedString);
  const unpacked: Id[] = [];

  let currentUnpackedId = 0;
  let currentShift = 0;

  for (let i = 0; i < packed.length; i++) {
    const byte = packed[i];
    currentUnpackedId |= (byte & SEVEN_BITS_MASK) << currentShift;

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if ((byte & EIGHTH_BIT_MASK) !== 0) {
      currentShift += SHIFT_STEP;
      continue;
    }

    unpacked.push(currentUnpackedId);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    currentUnpackedId = currentShift = 0;
  }

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (currentShift !== 0) throw new RangeError();
  return unpacked;
}
