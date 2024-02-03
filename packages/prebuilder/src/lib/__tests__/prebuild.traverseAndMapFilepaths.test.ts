// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';
// eslint-disable-next-line import/no-extraneous-dependencies
import { INVALID_PATH } from '𝕍/commons';

import traverseAndMapFilepaths from '../traverseAndMapFilepaths';

describe('traverseAndMapFilepaths', () => {
  it('should return an arborescence, given a valid RootFolder (full)', async () => {
    const architecture = await traverseAndMapFilepaths('./packages/prebuilder/src/lib/__tests__/fakeDirectory');

    expect(architecture).toMatchSnapshot();
  });

  it('should return an arborescence, given a valid RootFolder (partial)', async () => {
    const architecture = await traverseAndMapFilepaths('./packages/prebuilder/src/lib/__tests__/fakeDirectory/bar');

    expect(architecture).toMatchSnapshot();
  });

  it('should return an arborescence, given a valid RootFolder (partial 2)', async () => {
    const architecture = await traverseAndMapFilepaths('./packages/prebuilder/src/lib/__tests__/fakeDirectory/bar/baz/foo');

    expect(architecture).toMatchSnapshot();
  });

  it('should throw ENOENT, given invalid path', async () => {
    expect.assertions(1);

    try {
      await traverseAndMapFilepaths(INVALID_PATH);
    } catch (e) {
      const interceptedError = e as Error;
      if ('code' in interceptedError) {
        expect(interceptedError.code).toBe('ENOENT');
      } else {
        throw new Error('Error code not found');
      }
    }
  });
});
