// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';

import getBlogArchitectureMetadatas from '../blogArchitectureMetadatas';

const INVALID_PATH = './bless/the/draco/these/rounds/holy/sorry/bout/your/luck';

const VALID_BLOG_POSTS_FOLDER_PATH = './packages/prebuilder/src/metadatas-builders/__tests__/fake_blog_posts_folder';

describe('getBlogArchitectureMetadatas', () => {
  it('should throw ENOENT, given invalid path', () => {
    try {
      getBlogArchitectureMetadatas(INVALID_PATH);
    } catch (e) {
      const interceptedError = e as Error;
      if ('code' in interceptedError) {
        expect(interceptedError.code).toBe('ENOENT');
      } else {
        throw new Error('Error code not found');
      }
    }
  });

  it('should return an exhaustive metadatas object, given a valid blog posts folder path', () => {
    expect(getBlogArchitectureMetadatas(VALID_BLOG_POSTS_FOLDER_PATH)).toMatchSnapshot();
  });
});
