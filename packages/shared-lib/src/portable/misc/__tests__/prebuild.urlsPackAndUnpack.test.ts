// eslint-disable-next-line import/no-extraneous-dependencies
import { INVALID_ENCODED_STRING_GLITCHED_BITSTREAM, INVALID_ENCODED_STRING_GLITCHED_BASE64 } from '𝕍/commons';
import { describe, expect, it } from 'vitest';

import { unpackIds, packIds, MIN_ID } from '../urlsPackAndUnpack';

const BIG_LENGTH = 1e6;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const RIDICULOUSLY_LARGE_ID_RANGE = Array.from({ length: BIG_LENGTH }, (_, n) => n);

const VALID_IDS = {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  B: [10, 200, 3000, 4, 5, 0xfffffff, 60, 700, 80, 9, 0xffffff, 0xf, 0xff, 0xfff, 0xffff, 0xfffff, 11],
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  A: [1, MIN_ID, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  C: RIDICULOUSLY_LARGE_ID_RANGE
};

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const INVALID_IDS = [MIN_ID, MIN_ID - 1];

const packedA = packIds(VALID_IDS.A);
const packedB = packIds(VALID_IDS.B);
const packedC = packIds(VALID_IDS.C);

describe('packIds', () => {
  it('should pack correctly, given empty list', () => {
    expect(packIds([])).toBe('');
  });

  it('should pack correctly', () => {
    expect(packedA).toMatchSnapshot();
    expect(packedB).toMatchSnapshot();
    expect(packedC).toMatchSnapshot();
  });
});

describe('unpackIds', () => {
  it('should unpack correctly, given empty string', () => {
    expect(unpackIds('')).toStrictEqual([]);
  });

  it('should unpack correctly', () => {
    expect(unpackIds(packedA)).toStrictEqual(VALID_IDS.A);
    expect(unpackIds(packedB)).toStrictEqual(VALID_IDS.B);
    expect(unpackIds(packedC)).toStrictEqual(VALID_IDS.C);
  });
});

describe('pack/unpackIds (unhappy paths)', () => {
  it('should NOT pack/unpack correctly (unhappy paths)', () => {
    expect(() => packIds(INVALID_IDS)).toThrow(RangeError);
    expect(() => unpackIds(INVALID_ENCODED_STRING_GLITCHED_BITSTREAM)).toThrow(RangeError);
    expect(() => unpackIds(INVALID_ENCODED_STRING_GLITCHED_BASE64)).toThrow('The string to be decoded is not correctly encoded.');
  });
});
