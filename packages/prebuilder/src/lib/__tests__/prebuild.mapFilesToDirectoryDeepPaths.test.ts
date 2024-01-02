// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';

import traverseAndMapFilepaths from '../traverseAndMapFilepaths';

const INVALID_PATH = './bless/the/draco/these/rounds/holy/sorry/bout/your/luck';

describe('traverseAndMapFilepaths', () => {
  it('should return an arborescence, given a valid RootFolder (full)', async () => {
    expect(await traverseAndMapFilepaths('./packages/prebuilder/src/lib/__tests__/fakeDirectory')).toMatchSnapshot();
  });

  it('should return an arborescence, given a valid RootFolder (partial)', async () => {
    expect(await traverseAndMapFilepaths('./packages/prebuilder/src/lib/__tests__/fakeDirectory/bar')).toMatchSnapshot();
  });

  it('should return an arborescence, given a valid RootFolder (partial 2)', async () => {
    expect(await traverseAndMapFilepaths('./packages/prebuilder/src/lib/__tests__/fakeDirectory/bar/baz/foo')).toMatchSnapshot();
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
