import type { BlogFakeLanguageType } from '𝕍/testingContentCategoryDatas';
import type { BlogConfigType } from '@/config/blog';
import type { BlogPostType } from '@/types/Blog';

import { TESTING_BLOG_FAKE_SUBCATEGORY } from '𝕍/testingContentCategoryDatas';
import { DEFAULT_LANGUAGE } from '##/config/i18n';
import { describe, expect, it, vi } from 'vitest';
import ROUTES_ROOTS from '##/config/routes';
import BlogConfig from '@/config/blog';

import { getBlogPostStrict } from '../api';

vi.mock('@/config/blog', async (orgImport) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = await orgImport<typeof import('@/config/blog')>();

  return {
    default: {
      ...mod.default,
      ENABLE_DRAFTS_IN_PROD: false
    } satisfies BlogConfigType
  };
});

describe('getPostStrict (happy paths)', () => {
  it('should return a valid post when picking a non-draft post in an unauthorized drafts CTX', async () => {
    const [category, subcategory, slug] = [BlogConfig.TESTING_CATEGORY, TESTING_BLOG_FAKE_SUBCATEGORY, 'fake-post-01' as const];
    const lang = DEFAULT_LANGUAGE;
    const post = (await getBlogPostStrict({ subcategory, category, lang, slug })) as BlogPostType;

    expect(post.category).toBe(category);
    expect(post.subcategory).toBe(subcategory);
    expect(post.slug).toBe(slug);
    expect(post.language).toBe(lang);
    expect(post.url).toBe('/' + lang + ROUTES_ROOTS.BLOG + `${category}/${subcategory}/${slug}`);
  });
});

describe('getPostStrict (unhappy paths)', () => {
  it('should return NULL when picking a draft post in an unauthorized drafts CTX', async () => {
    const [category, subcategory, lang, slug] = [
      BlogConfig.TESTING_CATEGORY,
      TESTING_BLOG_FAKE_SUBCATEGORY,
      'drafts' as const satisfies BlogFakeLanguageType,
      'fake-draft-01' as const
    ];
    const post = await getBlogPostStrict({ subcategory, category, lang, slug });

    expect(post).toBe(null);
  });
});

vi.doUnmock('@/config/blog');
