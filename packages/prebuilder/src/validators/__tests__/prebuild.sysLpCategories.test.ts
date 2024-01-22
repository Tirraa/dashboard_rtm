// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';

import sysLpCategoriesValidator from '../sysLpCategories';

const INVALID_PATH = './bless/the/draco/these/rounds/holy/sorry/bout/your/luck';

const VALID_LP_FOLDER = './packages/prebuilder/src/validators/__tests__/fake_lp_folders/valid_fake_lp_folder';

const INVALID_LP_FOLDER_CONTAINING_ONE_INVALID_LP_CATEGORY =
  './packages/prebuilder/src/validators/__tests__/fake_lp_folders/invalid_fake_lp_folder_invalid_category';

const INVALID_LP_FOLDER_CONTAINING_SEVERAL_INVALID_LP_CATEGORIES =
  './packages/prebuilder/src/validators/__tests__/fake_lp_folders/invalid_fake_lp_folder_several_invalid_categories';

const INVALID_CATEGORY_NEEDLE = 'Invalid category'.toLowerCase();
const INVALID_CATEGORIES_NEEDLE = 'Invalid categories'.toLowerCase();

const EMPTY_FEEDBACK = '';

describe('sysLpCategoriesValidator', () => {
  it('should throw ENOENT, given invalid path', async () => {
    expect.assertions(1);

    try {
      await sysLpCategoriesValidator(INVALID_PATH);
    } catch (e) {
      const interceptedError = e as Error;
      if ('code' in interceptedError) {
        expect(interceptedError.code).toBe('ENOENT');
      } else {
        throw new Error('Error code not found');
      }
    }
  });

  it('should produce an error feedback, given a path to a folder with an invalid lp category', async () => {
    const feedback = await sysLpCategoriesValidator(INVALID_LP_FOLDER_CONTAINING_ONE_INVALID_LP_CATEGORY);
    expect(feedback.toLowerCase().includes(INVALID_CATEGORY_NEEDLE)).toBe(true);
  });

  it('should produce an error feedback, given a path to a folder with several invalid lp categories', async () => {
    const feedback = await sysLpCategoriesValidator(INVALID_LP_FOLDER_CONTAINING_SEVERAL_INVALID_LP_CATEGORIES);
    expect(feedback.toLowerCase().includes(INVALID_CATEGORIES_NEEDLE)).toBe(true);
  });

  it('should not produce any feedback, given a path to a valid lp folder', async () => {
    const feedback = await sysLpCategoriesValidator(VALID_LP_FOLDER);
    expect(feedback).toBe(EMPTY_FEEDBACK);
  });
});