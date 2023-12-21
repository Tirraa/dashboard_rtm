// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';

import traverseFolder from '../traverseFolder';

const INVALID_PATH = './bless/the/draco/these/rounds/holy/sorry/bout/your/luck';

describe('traverseFolder', () => {
  it('should return an arborescence, given a valid RootFolder (full)', () => {
    expect(traverseFolder('./packages/prebuilder/src/lib/__tests__/fakeDirectory')).toStrictEqual([
      {
        fileDirectory: 'packages/prebuilder/src/lib/__tests__/fakeDirectory/bar/baz',
        filename: 'file1'
      },
      {
        fileDirectory: 'packages/prebuilder/src/lib/__tests__/fakeDirectory/bar/baz',
        filename: 'file2'
      },
      {
        fileDirectory: 'packages/prebuilder/src/lib/__tests__/fakeDirectory/bar/baz',
        filename: 'file3'
      },
      {
        fileDirectory: 'packages/prebuilder/src/lib/__tests__/fakeDirectory/bar/baz/foo',
        filename: 'file1'
      },
      {
        fileDirectory: 'packages/prebuilder/src/lib/__tests__/fakeDirectory/bar',
        filename: 'file1'
      },
      {
        fileDirectory: 'packages/prebuilder/src/lib/__tests__/fakeDirectory/bar',
        filename: 'file2'
      },
      {
        fileDirectory: 'packages/prebuilder/src/lib/__tests__/fakeDirectory/baz/bar',
        filename: 'file1'
      },
      {
        fileDirectory: 'packages/prebuilder/src/lib/__tests__/fakeDirectory/baz/bar/foo',
        filename: 'file1'
      },
      {
        fileDirectory: 'packages/prebuilder/src/lib/__tests__/fakeDirectory/baz/bar/foo',
        filename: 'file2'
      },
      {
        fileDirectory: 'packages/prebuilder/src/lib/__tests__/fakeDirectory/baz',
        filename: 'file1'
      },
      {
        fileDirectory: 'packages/prebuilder/src/lib/__tests__/fakeDirectory/baz',
        filename: 'file2'
      },
      {
        fileDirectory: 'packages/prebuilder/src/lib/__tests__/fakeDirectory/baz',
        filename: 'file3'
      },
      {
        fileDirectory: 'packages/prebuilder/src/lib/__tests__/fakeDirectory/foo/baz/bar',
        filename: 'file1'
      },
      {
        fileDirectory: 'packages/prebuilder/src/lib/__tests__/fakeDirectory/foo/baz/bar',
        filename: 'file2'
      },
      {
        fileDirectory: 'packages/prebuilder/src/lib/__tests__/fakeDirectory/foo/baz',
        filename: 'file1'
      },
      {
        fileDirectory: 'packages/prebuilder/src/lib/__tests__/fakeDirectory/foo',
        filename: 'file1'
      },
      {
        fileDirectory: 'packages/prebuilder/src/lib/__tests__/fakeDirectory/foo',
        filename: 'file2'
      },
      {
        fileDirectory: 'packages/prebuilder/src/lib/__tests__/fakeDirectory/foo',
        filename: 'file3'
      }
    ]);
  });

  it('should return an arborescence, given a valid RootFolder (partial)', () => {
    expect(traverseFolder('./packages/prebuilder/src/lib/__tests__/fakeDirectory/bar')).toStrictEqual([
      {
        fileDirectory: 'packages/prebuilder/src/lib/__tests__/fakeDirectory/bar/baz',
        filename: 'file1'
      },
      {
        fileDirectory: 'packages/prebuilder/src/lib/__tests__/fakeDirectory/bar/baz',
        filename: 'file2'
      },
      {
        fileDirectory: 'packages/prebuilder/src/lib/__tests__/fakeDirectory/bar/baz',
        filename: 'file3'
      },
      {
        fileDirectory: 'packages/prebuilder/src/lib/__tests__/fakeDirectory/bar/baz/foo',
        filename: 'file1'
      },
      {
        fileDirectory: './packages/prebuilder/src/lib/__tests__/fakeDirectory/bar',
        filename: 'file1'
      },
      {
        fileDirectory: './packages/prebuilder/src/lib/__tests__/fakeDirectory/bar',
        filename: 'file2'
      }
    ]);
  });

  it('should return an arborescence, given a valid RootFolder (partial 2)', () => {
    expect(traverseFolder('./packages/prebuilder/src/lib/__tests__/fakeDirectory/bar/baz/foo')).toStrictEqual([
      {
        fileDirectory: './packages/prebuilder/src/lib/__tests__/fakeDirectory/bar/baz/foo',
        filename: 'file1'
      }
    ]);
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
