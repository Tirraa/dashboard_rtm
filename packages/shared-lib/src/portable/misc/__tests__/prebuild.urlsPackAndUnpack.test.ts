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

const INVALID_ENCODED_STRING_GLITCHED_BASE64 =
  '0BiZ0Bip0Bi50BjJ0BjZ0Bjp0Bj50BkJ0BkZ0Bkp0Bk50BlJ0BlZ0Blp0Bl50BmJ0BmZ0Bmp0Bm50BnJ0BnZ0Bnp0Bn50BoJ0BoZ0Bop0Bo50BpJ0BpZ0Bpp0Bp50BqJ0BqZ0Bqp0Bq50BrJ0BrZ0Brp0Br50BsJ0BsZ0Bsp0Bs50BtJ0BtZ0Btp0Bt50BuJ0BuZ0Bup0Bu50BvJ0BvZ0Bvp0Bv50BwJ0BwZ0Bwp0Bw50BxJ0BxZ0Bxp0Bx50ByJ0ByZ0Byp0By50BzJ0BzZ0Bzp0Bz50B0J0B0Z0B0p0B050B1J0B1Z0B1p0B150B2J0B2Z0B2p0B250B3J0B3Z0B3p0B350B4J0B4Z0B4p0B450B5J0B5Z0B5p0B550B6J0B6Z0B6p0B650B7J0B7Z0B7p0B750B8J0B8Z0B8p0B850B9J0B9Z0B9p0B950B-J0B-Z0B-p0B-50B_J0B_Z0B_p0B_50BgJ4BgZ4Bgp4Bg54BhJ4BhZ4Bhp4Bh54BiJ4BiZ4Bip4Bi54BjJ4';

const INVALID_ENCODED_STRING_GLITCHED_BITSTREAM = '//////8=';

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
