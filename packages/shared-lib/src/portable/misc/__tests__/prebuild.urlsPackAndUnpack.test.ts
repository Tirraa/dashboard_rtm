import { describe, expect, it } from 'vitest';

import { unpackIds, packIds, MAX_ID, MIN_ID } from '../urlsPackAndUnpack';

const VALID_IDS = {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  B: [10, 200, 3000, 4, 5, 60, 700, 80, 9, MAX_ID, 11],
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  A: [1, MIN_ID, 2, 3, 4, 5, 6, 7, 8, 9, 10]
};

const INVALID_IDS = {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  A: [MAX_ID, MAX_ID + 1],
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  B: [MIN_ID, MIN_ID - 1]
};

const INVALID_ENCODED_STRINGS = {
  A: 'AAA!AgADAAQABQAGAAcACAAJAAo',
  B: 'AAEAAgADAAQABQAGAAcACAAJAA'
};

const packedA = packIds(VALID_IDS.A);
const packedB = packIds(VALID_IDS.B);

describe('packIds', () => {
  it('should pack correctly, given empty list', () => {
    expect(packIds([])).toBe('');
  });

  it('should pack correctly (happy paths)', () => {
    expect(packedA).toBe('AAEAAAACAAMABAAFAAYABwAIAAkACg');
    expect(packedB).toBe('AAoAyAu4AAQABQA8ArwAUAAJ__8ACw');
  });

  it('should NOT pack correctly (unhappy paths)', () => {
    expect(() => packIds(INVALID_IDS.A)).toThrow(RangeError);
    expect(() => packIds(INVALID_IDS.B)).toThrow(RangeError);
  });
});

describe('unpackIds', () => {
  it('should unpack correctly, given empty string', () => {
    expect(unpackIds('')).toStrictEqual([]);
  });

  it('should unpack correctly (happy paths)', () => {
    expect(unpackIds(packedA)).toStrictEqual(VALID_IDS.A);
    expect(unpackIds(packedB)).toStrictEqual(VALID_IDS.B);
  });

  it('should NOT unpack correctly (unhappy paths)', () => {
    expect(() => unpackIds(INVALID_ENCODED_STRINGS.A)).toThrow(RangeError);
    expect(() => unpackIds(INVALID_ENCODED_STRINGS.B)).toThrow(RangeError);
  });
});
