import base64url from 'base64url';

type Id = number;
type EncodedString = string;

export const MIN_ID: Id = 0;
export const MAX_ID: Id = 0xffff;

const PADDING = 2;

export function packIds(unpacked: Id[]): EncodedString {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (unpacked.length === 0) return '';

  const packed = Buffer.alloc(unpacked.length * PADDING);

  for (let i = 0; i < unpacked.length; i++) packed.writeUInt16BE(unpacked[i], i * PADDING);
  return base64url.encode(packed);
}

export function unpackIds(encodedString: EncodedString): Id[] {
  if (encodedString === '') return [];

  const packed = base64url.toBuffer(encodedString);
  const unpacked: Id[] = [];

  for (let i = 0; i < packed.length; i += PADDING) unpacked.push(packed.readUInt16BE(i));
  return unpacked;
}
