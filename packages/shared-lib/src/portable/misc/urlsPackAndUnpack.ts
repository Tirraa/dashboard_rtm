type Id = number;
type EncodedString = string;

export const MIN_ID: Id = 0;
export const MAX_ID: Id = 0xffff;

export function packIds(unpacked: Id[]): EncodedString {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const packed = Buffer.alloc(unpacked.length * 2);

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  for (let i = 0; i < unpacked.length; i++) packed.writeUInt16BE(unpacked[i], i * 2);
  return packed.toString('base64url');
}

export function unpackIds(encodedString: EncodedString): Id[] {
  const packed = Buffer.from(encodedString, 'base64url');
  const unpacked: Id[] = [];

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  for (let i = 0; i < packed.length; i += 2) unpacked.push(packed.readUInt16BE(i));
  return unpacked;
}
