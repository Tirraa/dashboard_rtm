import type { BlogFakeLanguageType } from '𝕍/testingContentCategoryDatas';
import type { BlogConfigType } from '@/config/Blog/server';
import type { BlogPostType } from '@/types/Blog';

import { TESTING_BLOG_FAKE_SUBCATEGORY } from '𝕍/testingContentCategoryDatas';
import { DEFAULT_LANGUAGE } from '##/config/i18n';
import { describe, expect, it, vi } from 'vitest';
import BlogConfig from '@/config/Blog/server';
import ROUTES_ROOTS from '##/config/routes';

import { getBlogPostUnstrict, getBlogPostStrict } from '../api';

vi.mock('@/config/Blog/server', async (orgImport) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = await orgImport<typeof import('@/config/Blog/server')>();

  return {
    default: {
      ...mod.default,
      ENABLE_DRAFTS_IN_PROD: true
    } satisfies BlogConfigType
  };
});

describe('getPostStrict (happy paths)', () => {
  it('should return a valid post when picking a non-draft post in an authorized drafts CTX', async () => {
    const [category, subcategory, slug] = [BlogConfig.TESTING_CATEGORY, TESTING_BLOG_FAKE_SUBCATEGORY, 'fake-post-01' as const];
    const lang = DEFAULT_LANGUAGE;
    const post = (await getBlogPostStrict({ subcategory, category, lang, slug })) as BlogPostType;

    expect(post.category).toBe(category);
    expect(post.subcategory).toBe(subcategory);
    expect(post.slug).toBe(slug);
    expect(post.language).toBe(lang);
    expect(post.url).toBe('/' + lang + ROUTES_ROOTS.BLOG + `${category}/${subcategory}/${slug}`);
  });

  it('should return a valid post when picking a draft post in an authorized drafts CTX', async () => {
    const [category, subcategory, lang, slug] = [
      BlogConfig.TESTING_CATEGORY,
      TESTING_BLOG_FAKE_SUBCATEGORY,
      'drafts' as const satisfies BlogFakeLanguageType,
      'fake-draft-01' as const
    ];
    const post = (await getBlogPostStrict({ subcategory, category, lang, slug })) as BlogPostType;

    expect(post.category).toBe(category);
    expect(post.subcategory).toBe(subcategory);
    expect(post.slug).toBe(slug);
    expect(post.language).toBe(lang);
    expect(post.url).toBe('/' + lang + ROUTES_ROOTS.BLOG + `${category}/${subcategory}/${slug}`);
  });
});

describe('getBlogPostUnstrict (unhappy paths)', () => {
  it('should return null, given invalid slug', async () => {
    const posts = await getBlogPostUnstrict(BlogConfig.TESTING_CATEGORY, TESTING_BLOG_FAKE_SUBCATEGORY, '__INVALID_SLUG__', DEFAULT_LANGUAGE);
    expect(posts).toBe(null);
  });
});

vi.doUnmock('@/config/Blog/server');
