// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';
// eslint-disable-next-line import/no-extraneous-dependencies
import { INVALID_PATH } from '𝕍/commons';

import getLpMetadatas from '../landingPagesMetadatas';

const VALID_LP_FOLDER_PATH = './packages/prebuilder/src/metadatas-builders/__tests__/fake_lp_folder';

describe('getLpMetadatas', () => {
  it('should throw ENOENT, given invalid path', async () => {
    expect.assertions(1);

    try {
      await getLpMetadatas(INVALID_PATH);
    } catch (e) {
      const interceptedError = e as Error;
      if ('code' in interceptedError) {
        expect(interceptedError.code).toBe('ENOENT');
      } else {
        throw new Error('Error code not found');
      }
    }
  });

  it('should match snapshot', async () => {
    expect(await getLpMetadatas(VALID_LP_FOLDER_PATH)).toMatchSnapshot();
  });
});
