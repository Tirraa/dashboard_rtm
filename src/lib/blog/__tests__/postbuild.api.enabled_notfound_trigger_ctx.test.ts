import type { TBlogConfig } from '@/config/blog';
import type { TBlogPost } from '@/types/Blog';

import { TESTING_BLOG_FAKE_SUBCATEGORY } from '𝕍/testingBlogCategoryDatas';
import { DEFAULT_LANGUAGE } from '##/config/i18n';
import { describe, expect, it, vi } from 'vitest';
import BlogConfig from '@/config/blog';

import { blogSubcategoryShouldTriggerNotFound, getBlogPostStrict } from '../api';

vi.mock('@/config/blog', async (orgImport) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = await orgImport<typeof import('@/config/blog')>();

  return {
    default: {
      ...mod.default,
      USE_BLOG_POSTS_NOTFOUND_WHEN_SUBCATEGORY_IS_EMPTY_INSTEAD_OF_NOT_FOUND: true
    } satisfies TBlogConfig
  };
});

describe('blogSubcategoryShouldTriggerNotFound', () => {
  it('should return false', async () => {
    const [category, subcategory, targettedSlug] = [BlogConfig.TESTING_CATEGORY, TESTING_BLOG_FAKE_SUBCATEGORY, 'fake-post-01' as const];
    const language = DEFAULT_LANGUAGE;
    const post = (await getBlogPostStrict(category, subcategory, language, targettedSlug)) as TBlogPost;

    expect(blogSubcategoryShouldTriggerNotFound([])).toBe(false);
    expect(blogSubcategoryShouldTriggerNotFound([post])).toBe(false);
  });
});

vi.doUnmock('@/config/blog');
