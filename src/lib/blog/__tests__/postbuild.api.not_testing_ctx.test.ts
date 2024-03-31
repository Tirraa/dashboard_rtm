import { TESTING_BLOG_FAKE_SUBCATEGORY } from '𝕍/testingContentCategoryDatas';
import { DEFAULT_LANGUAGE } from '##/config/i18n';
import { describe, expect, vi, it } from 'vitest';
import BlogConfig from '@/config/Blog/server';

import { getAllBlogPostsByCategoryAndSubcategoryAndLanguageUnstrict, getBlogPostUnstrict, isValidBlogCategory } from '../api';

vi.mock('../ctx', async (orgImport) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = await orgImport<typeof import('../ctx')>();

  return {
    default: {
      ...mod.default,
      TESTING: false
    }
  } satisfies typeof mod;
});

describe('getAllBlogPostsByCategoryAndSubcategoryAndLanguageUnstrict (unhappy paths)', () => {
  it('should return an empty list, given testing category in not testing ctx', async () => {
    const posts = await getAllBlogPostsByCategoryAndSubcategoryAndLanguageUnstrict(
      BlogConfig.TESTING_CATEGORY,
      TESTING_BLOG_FAKE_SUBCATEGORY,
      DEFAULT_LANGUAGE
    );
    expect(posts).toStrictEqual([]);
  });
});

describe('getBlogPostUnstrict (unhappy paths)', () => {
  it('should return null, given testing category in not testing ctx', async () => {
    const posts = await getBlogPostUnstrict(BlogConfig.TESTING_CATEGORY, TESTING_BLOG_FAKE_SUBCATEGORY, 'fake-post-01', DEFAULT_LANGUAGE);
    expect(posts).toBe(null);
  });
});

describe('isValidBlogCategory', () => {
  it('should return false, given testing category in not testing ctx', () => {
    const posts = isValidBlogCategory(BlogConfig.TESTING_CATEGORY);
    expect(posts).toBe(false);
  });
});

vi.doUnmock('../ctx');
