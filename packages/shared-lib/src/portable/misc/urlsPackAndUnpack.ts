import type { Quantity, Id } from '@rtm/shared-types/Numbers';

export const MIN_ID: Id = 0;

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const [SEVEN_BITS_MASK, EIGHTH_BIT_MASK, SHIFT_STEP] = [0x7f, 0x80, 7];

const BASE64URL_MAP: Base64UrlAssoc = {
  '+': '-',
  '/': '_',
  '=': ''
};

const FLIPPED_BASE64URL_MAP: Base64UrlAssoc = Object.fromEntries(Object.entries(BASE64URL_MAP).map(([k, v]) => [v, k]));

// NOTE: Unsafe hard-coded RegEx for performance concerns, be diligent if you edit BASE64URL_MAP.
const base64UrlEncode = (bufferString: BufferGarbage): EncodedString => btoa(bufferString).replace(/[+/=]/g, (c: Char) => BASE64URL_MAP[c]);

// NOTE: Unsafe hard-coded RegEx for performance concerns, be diligent if you edit BASE64URL_MAP.
const base64UrlDecode = (encodedString: EncodedString): BufferGarbage => atob(encodedString.replace(/[-_]/g, (c: Char) => FLIPPED_BASE64URL_MAP[c]));

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

  const buffer = new Uint8Array(packed).buffer;
  const bufferArray = new Uint8Array(buffer);

  const chunkSize: Quantity = 0xffff;
  const chunks: Id[][] = [];
  for (let i = 0; i < bufferArray.length; i += chunkSize) {
    chunks.push(Array.from(bufferArray.subarray(i, i + chunkSize)));
  }

  const parts = chunks.map((chunk) => String.fromCharCode.apply(null, chunk));
  return base64UrlEncode(parts.join(''));
}

/**
 * @throws {RangeError}
 */
export function unpackIds(encodedString: EncodedString): Id[] {
  if (encodedString === '') return [];

  const bufferString = base64UrlDecode(encodedString);
  const buffer = new Uint8Array(bufferString.length);
  for (let i = 0; i < bufferString.length; i++) buffer[i] = bufferString.charCodeAt(i);

  const packed = new Uint8Array(buffer);
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

type Char = string;
type BufferGarbage = string;
type EncodedString = string;
type Base64UrlAssoc = Record<Char, Char>;
