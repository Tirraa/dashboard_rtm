import { DEFAULT_LANGUAGE } from '##/config/i18n';
import type { TBlogConfig } from '@/config/blog';
import BlogConfig from '@/config/blog';
import type { PostBase } from '@/types/Blog';
import { describe, expect, it, vi } from 'vitest';
import { blogSubcategoryShouldTriggerNotFound, getBlogPostStrict } from '../api';

vi.mock('@/config/blog', async (orgImport) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = await orgImport<typeof import('@/config/blog')>();

  return {
    default: {
      ...mod.default,
      USE_BLOG_POSTS_NOTFOUND_WHEN_SUBCATEGORY_IS_EMPTY_INSTEAD_OF_NOT_FOUND: false
    } satisfies TBlogConfig
  };
});

describe('blogSubcategoryShouldTriggerNotFound', () => {
  it('[POSTBUILD] should return false only when the list is not empty', async () => {
    const [category, subcategory, targettedSlug] = [BlogConfig.TESTING_CATEGORY, 'fake-subcategory' as const, 'fake-post-01' as const];
    const language = DEFAULT_LANGUAGE;
    const post = (await getBlogPostStrict(category, subcategory, language, targettedSlug)) as PostBase;

    expect(blogSubcategoryShouldTriggerNotFound([])).toBe(true);
    expect(blogSubcategoryShouldTriggerNotFound([post])).toBe(false);
  });
});

vi.doUnmock('@/config/blog');
