// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';

import sysBlogSubcategoriesValidator from '../sysBlogSubcategories';

const INVALID_PATH = './bless/the/draco/these/rounds/holy/sorry/bout/your/luck';

const VALID_BLOG_POSTS_FOLDER = './packages/prebuilder/src/validators/__tests__/fake_posts_folders/valid_fake_posts_folder';

const INVALID_BLOG_POSTS_FOLDER_CONTAINING_ONE_INVALID_BLOG_SUBCATEGORY =
  './packages/prebuilder/src/validators/__tests__/fake_posts_folders/invalid_fake_posts_folder_invalid_subcategory';

const INVALID_BLOG_POSTS_FOLDER_CONTAINING_SEVERAL_INVALID_BLOG_SUBCATEGORIES =
  './packages/prebuilder/src/validators/__tests__/fake_posts_folders/invalid_fake_posts_folder_several_invalid_subcategories';

// {ToDo} Rewrite this when https://github.com/Tirraa/dashboard_rtm/issues/16 will be solved.
const INVALID_SUBCATEGORY_NEEDLE = 'Invalid subcategory'.toLowerCase();
const INVALID_SUBCATEGORIES_NEEDLE = 'Invalid subcategories'.toLowerCase();

const EMPTY_FEEDBACK = '';

describe('sysBlogSubcategoriesValidator', () => {
  it('should throw ENOENT, given invalid path', async () => {
    expect.assertions(1);

    try {
      await sysBlogSubcategoriesValidator(INVALID_PATH);
    } catch (e) {
      const interceptedError = e as Error;
      if ('code' in interceptedError) {
        expect(interceptedError.code).toBe('ENOENT');
      } else {
        throw new Error('Error code not found');
      }
    }
  });

  it('should produce an error feedback, given a path to a folder with an invalid blog subcategory', async () => {
    const feedback = await sysBlogSubcategoriesValidator(INVALID_BLOG_POSTS_FOLDER_CONTAINING_ONE_INVALID_BLOG_SUBCATEGORY);
    expect(feedback.toLowerCase().includes(INVALID_SUBCATEGORY_NEEDLE)).toBe(true);
  });

  it('should produce an error feedback, given a path to a folder with several invalid blog subcategories', async () => {
    const feedback = await sysBlogSubcategoriesValidator(INVALID_BLOG_POSTS_FOLDER_CONTAINING_SEVERAL_INVALID_BLOG_SUBCATEGORIES);
    expect(feedback.toLowerCase().includes(INVALID_SUBCATEGORIES_NEEDLE)).toBe(true);
  });

  it('should not produce any feedback, given a path to a valid blog posts folder', async () => {
    const feedback = await sysBlogSubcategoriesValidator(VALID_BLOG_POSTS_FOLDER);
    expect(feedback).toBe(EMPTY_FEEDBACK);
  });
});
