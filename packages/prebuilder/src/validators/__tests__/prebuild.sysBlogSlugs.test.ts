// eslint-disable-next-line import/no-extraneous-dependencies
import { INVALID_SLUGS_NEEDLE, INVALID_SLUG_NEEDLE } from '𝕍/needles';
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';
// eslint-disable-next-line import/no-extraneous-dependencies
import { INVALID_PATH } from '𝕍/commons';

import sysBlogSlugsValidator from '../sysBlogSlugs';

const VALID_BLOG_POSTS_FOLDER = './packages/prebuilder/src/validators/__tests__/fake_posts_folders/valid_fake_posts_folder';

const INVALID_BLOG_POSTS_FOLDER_CONTAINING_ONE_INVALID_BLOG_SLUG =
  './packages/prebuilder/src/validators/__tests__/fake_posts_folders/invalid_fake_posts_folder_invalid_blog_slug';

const INVALID_BLOG_POSTS_FOLDER_CONTAINING_SEVERAL_INVALID_BLOG_SLUGS =
  './packages/prebuilder/src/validators/__tests__/fake_posts_folders/invalid_fake_posts_folder_several_invalid_blog_slugs';

const EMPTY_FEEDBACK = '';

describe('sysBlogSlugsValidator', () => {
  it('should throw ENOENT, given invalid path', async () => {
    // eslint-disable-next-line no-magic-numbers
    expect.assertions(1);

    try {
      await sysBlogSlugsValidator(INVALID_PATH);
    } catch (e) {
      const interceptedError = e as Error;
      if ('code' in interceptedError) {
        expect(interceptedError.code).toBe('ENOENT');
      } else {
        throw new Error('Error code not found');
      }
    }
  });

  it('should produce an error feedback, given a path to a folder with an invalid blog slug', async () => {
    const feedback = await sysBlogSlugsValidator(INVALID_BLOG_POSTS_FOLDER_CONTAINING_ONE_INVALID_BLOG_SLUG);
    expect(feedback.toLowerCase().includes(INVALID_SLUG_NEEDLE)).toBe(true);
  });

  it('should produce an error feedback, given a path to a folder with several invalid blog slugs', async () => {
    const feedback = await sysBlogSlugsValidator(INVALID_BLOG_POSTS_FOLDER_CONTAINING_SEVERAL_INVALID_BLOG_SLUGS);
    expect(feedback.toLowerCase().includes(INVALID_SLUG_NEEDLE)).toBe(true);
    expect(feedback.toLowerCase().includes(INVALID_SLUGS_NEEDLE)).toBe(true);
  });

  it('should not produce any feedback, given a path to a valid blog posts folder', async () => {
    const feedback = await sysBlogSlugsValidator(VALID_BLOG_POSTS_FOLDER);
    expect(feedback).toBe(EMPTY_FEEDBACK);
  });
});
