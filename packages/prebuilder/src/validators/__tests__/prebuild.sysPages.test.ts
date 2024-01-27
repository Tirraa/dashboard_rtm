// eslint-disable-next-line import/no-extraneous-dependencies
import { INVALID_NESTINGS_NEEDLE, INVALID_NESTING_NEEDLE, INVALID_SLUGS_NEEDLE, INVALID_SLUG_NEEDLE } from '𝕍/needles';
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';
// eslint-disable-next-line import/no-extraneous-dependencies
import { INVALID_PATH } from '𝕍/commons';

import sysPagesValidator from '../sysPages';

const VALID_PAGES_FOLDER = './packages/prebuilder/src/validators/__tests__/fake_pages_folders/valid_fake_pages_folder';

const INVALID_PAGES_FOLDER_CONTAINING_ONE_INVALID_PAGE_SLUG =
  './packages/prebuilder/src/validators/__tests__/fake_pages_folders/invalid_fake_pages_folder_invalid_slug';
const INVALID_PAGES_FOLDER_CONTAINING_SEVERAL_INVALID_PAGE_SLUGS =
  './packages/prebuilder/src/validators/__tests__/fake_pages_folders/invalid_fake_pages_folder_several_invalid_slugs';

const INVALID_PAGES_FOLDER_CONTAINING_ONE_INVALID_PAGE_NESTING =
  './packages/prebuilder/src/validators/__tests__/fake_pages_folders/invalid_fake_pages_folder_invalid_nesting';
const INVALID_PAGES_FOLDER_CONTAINING_SEVERAL_INVALID_PAGE_NESTINGS =
  './packages/prebuilder/src/validators/__tests__/fake_pages_folders/invalid_fake_pages_folder_several_invalid_nestings';

const EMPTY_FEEDBACK = '';

describe('sysPagesValidator', () => {
  it('should throw ENOENT, given invalid path', async () => {
    expect.assertions(1);

    try {
      await sysPagesValidator(INVALID_PATH);
    } catch (e) {
      const interceptedError = e as Error;
      if ('code' in interceptedError) {
        expect(interceptedError.code).toBe('ENOENT');
      } else {
        throw new Error('Error code not found');
      }
    }
  });

  it('should produce an error feedback, given a path to a folder with an invalid page slug', async () => {
    const { feedback } = await sysPagesValidator(INVALID_PAGES_FOLDER_CONTAINING_ONE_INVALID_PAGE_SLUG);
    expect(feedback.toLowerCase().includes(INVALID_SLUG_NEEDLE)).toBe(true);
  });

  it('should produce an error feedback, given a path to a folder with several invalid page slugs', async () => {
    const { feedback } = await sysPagesValidator(INVALID_PAGES_FOLDER_CONTAINING_SEVERAL_INVALID_PAGE_SLUGS);
    expect(feedback.toLowerCase().includes(INVALID_SLUG_NEEDLE)).toBe(true);
    expect(feedback.toLowerCase().includes(INVALID_SLUGS_NEEDLE)).toBe(true);
  });

  it('should produce an error feedback, given a path to a folder with an invalid page nesting', async () => {
    const { feedback } = await sysPagesValidator(INVALID_PAGES_FOLDER_CONTAINING_ONE_INVALID_PAGE_NESTING);
    expect(feedback.toLowerCase().includes(INVALID_NESTING_NEEDLE)).toBe(true);
  });

  it('should produce an error feedback, given a path to a folder with several invalid page nestings', async () => {
    const { feedback } = await sysPagesValidator(INVALID_PAGES_FOLDER_CONTAINING_SEVERAL_INVALID_PAGE_NESTINGS);
    expect(feedback.toLowerCase().includes(INVALID_NESTINGS_NEEDLE)).toBe(true);
  });

  it('should not produce any feedback, given a path to a valid lp posts folder', async () => {
    const { feedback } = await sysPagesValidator(VALID_PAGES_FOLDER);
    expect(feedback).toBe(EMPTY_FEEDBACK);
  });
});
