// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';

import sysLpSlugsValidator from '../sysLpSlugs';

const INVALID_PATH = './bless/the/draco/these/rounds/holy/sorry/bout/your/luck';

const VALID_LP_FOLDER = './packages/prebuilder/src/validators/__tests__/fake_lp_folders/valid_fake_lp_folder';

const INVALID_LP_FOLDER_CONTAINING_ONE_INVALID_LP_SLUG =
  './packages/prebuilder/src/validators/__tests__/fake_lp_folders/invalid_fake_lp_folder_invalid_slug';

const INVALID_LP_FOLDER_CONTAINING_SEVERAL_INVALID_LP_SLUGS =
  './packages/prebuilder/src/validators/__tests__/fake_lp_folders/invalid_fake_lp_folder_several_invalid_slugs';

const INVALID_SLUG_NEEDLE = 'Invalid slug'.toLowerCase();
const INVALID_SLUGS_NEEDLE = 'Invalid slugs'.toLowerCase();

const EMPTY_FEEDBACK = '';

describe('sysLpSlugsValidator', () => {
  it('should throw ENOENT, given invalid path', async () => {
    expect.assertions(1);

    try {
      await sysLpSlugsValidator(INVALID_PATH);
    } catch (e) {
      const interceptedError = e as Error;
      if ('code' in interceptedError) {
        expect(interceptedError.code).toBe('ENOENT');
      } else {
        throw new Error('Error code not found');
      }
    }
  });

  it('should produce an error feedback, given a path to a folder with an invalid lp slug', async () => {
    const feedback = await sysLpSlugsValidator(INVALID_LP_FOLDER_CONTAINING_ONE_INVALID_LP_SLUG);
    expect(feedback.toLowerCase().includes(INVALID_SLUG_NEEDLE)).toBe(true);
  });

  it('should produce an error feedback, given a path to a folder with several invalid lp slugs', async () => {
    const feedback = await sysLpSlugsValidator(INVALID_LP_FOLDER_CONTAINING_SEVERAL_INVALID_LP_SLUGS);
    expect(feedback.toLowerCase().includes(INVALID_SLUG_NEEDLE)).toBe(true);
    expect(feedback.toLowerCase().includes(INVALID_SLUGS_NEEDLE)).toBe(true);
  });

  it('should not produce any feedback, given a path to a valid lp posts folder', async () => {
    const feedback = await sysLpSlugsValidator(VALID_LP_FOLDER);
    expect(feedback).toBe(EMPTY_FEEDBACK);
  });
});
