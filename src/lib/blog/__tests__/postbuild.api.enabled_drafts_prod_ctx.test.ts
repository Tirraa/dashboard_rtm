import type { TBlogConfig } from '@/config/blog';
import type { TBlogPost } from '@/types/Blog';

import { DEFAULT_LANGUAGE } from '##/config/i18n';
import { describe, expect, it, vi } from 'vitest';
import BlogConfig from '@/config/blog';

import { getBlogPostStrict } from '../api';

vi.mock('@/config/blog', async (orgImport) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = await orgImport<typeof import('@/config/blog')>();

  return {
    default: {
      ...mod.default,
      ENABLE_DRAFTS_IN_PROD: true
    } satisfies TBlogConfig
  };
});

describe('getPostStrict', () => {
  it('should always return a valid post when picking a non-draft post in an authorized drafts CTX', async () => {
    const [category, subcategory, targettedSlug] = [BlogConfig.TESTING_CATEGORY, 'fake-subcategory' as const, 'fake-post-01' as const];
    const language = DEFAULT_LANGUAGE;
    const post = (await getBlogPostStrict(category, subcategory, language, targettedSlug)) as TBlogPost;

    expect(post.category).toBe(category);
    expect(post.subcategory).toBe(subcategory);
    expect(post.slug).toBe(targettedSlug);
    expect(post.language).toBe(language);
    expect(post.url).toBe(`/${language}/${category}/${subcategory}/${targettedSlug}`);
  });

  it('should always return a valid post when picking a draft post in an authorized drafts CTX', async () => {
    const [category, subcategory, language, targettedSlug] = [
      BlogConfig.TESTING_CATEGORY,
      'fake-subcategory' as const,
      'drafts' as const,
      'fake-draft-01' as const
    ];
    const post = (await getBlogPostStrict(category, subcategory, language, targettedSlug)) as TBlogPost;

    expect(post.category).toBe(category);
    expect(post.subcategory).toBe(subcategory);
    expect(post.slug).toBe(targettedSlug);
    expect(post.language).toBe(language);
    expect(post.url).toBe(`/${language}/${category}/${subcategory}/${targettedSlug}`);
  });
});

vi.doUnmock('@/config/blog');
