import InvalidArgumentsError from '##/errors/InvalidArguments';
import { describe, expect, it } from 'vitest';

import getFlattenedPathWithoutRootFolder from '../getFlattenedPathWithoutRootFolder';

describe('getFlattenedPathWithoutRootFolder', () => {
  const POSTS_FOLDER = 'posts' as const;

  it('should return the correct outputs, given valid inputs', () => {
    expect(getFlattenedPathWithoutRootFolder('whatever/lang/category/subcategory/slug')).toBe('lang/category/subcategory/slug');

    expect(getFlattenedPathWithoutRootFolder('posts/lang/category/subcategory/slug', POSTS_FOLDER)).toBe('lang/category/subcategory/slug');
  });

  it('should throw, given invalid inputs', () => {
    expect(() => getFlattenedPathWithoutRootFolder('posts/lang/category/subcategory/slug', 'invalidNeedle')).toThrow(InvalidArgumentsError);

    expect(() => getFlattenedPathWithoutRootFolder(POSTS_FOLDER)).toThrow(InvalidArgumentsError);

    expect(() => getFlattenedPathWithoutRootFolder(POSTS_FOLDER + '/')).toThrow(InvalidArgumentsError);
  });
});
