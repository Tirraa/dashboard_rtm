// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';

import traverseFolder from '../traverseFolder';

const INVALID_PATH = './bless/the/draco/these/rounds/holy/sorry/bout/your/luck';

describe('traverseFolder', () => {
  it('should return an arborescence, given a valid RootFolder (full)', () => {
    expect(traverseFolder('./packages/prebuilder/src/lib/__tests__/fakeDirectory')).toMatchSnapshot();
  });

  it('should return an arborescence, given a valid RootFolder (partial)', () => {
    expect(traverseFolder('./packages/prebuilder/src/lib/__tests__/fakeDirectory/bar')).toMatchSnapshot();
  });

  it('should return an arborescence, given a valid RootFolder (partial 2)', () => {
    expect(traverseFolder('./packages/prebuilder/src/lib/__tests__/fakeDirectory/bar/baz/foo')).toMatchSnapshot();
  });

  it('should throw ENOENT, given invalid path', () => {
    try {
      traverseFolder(INVALID_PATH);
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
