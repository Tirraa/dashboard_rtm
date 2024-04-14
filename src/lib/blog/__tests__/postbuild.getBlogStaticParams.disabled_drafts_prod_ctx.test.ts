import type { BlogConfigType } from '@/config/Blog/server';

import { TESTING_BLOG_CATEGORY_FAKE_LANGUAGES, TESTING_BLOG_FAKE_SUBCATEGORY } from '𝕍/testingContentCategoryDatas';
import { INDEX_TOKEN } from '##/lib/misc/contentlayerCornerCases';
import BlogTaxonomy from '##/config/taxonomies/blog';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { describe, expect, it, vi } from 'vitest';
import { DEFAULT_LANGUAGE } from '##/config/i18n';
import BlogConfig from '@/config/Blog/server';

import getBlogStaticParams from '../static/getBlogStaticParams';

vi.mock('##/config/i18n', async (orgImport) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = await orgImport<typeof import('##/config/i18n')>();

  return {
    ...mod,
    LANGUAGES: Array.from(new Set<string>([mod.DEFAULT_LANGUAGE, ...TESTING_BLOG_CATEGORY_FAKE_LANGUAGES]))
  };
});

vi.mock('../api', async (orgImport) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = await orgImport<typeof import('../api')>();

  return {
    ...mod,
    getAllBlogCategories: () => [BlogConfig.TESTING_CATEGORY]
  };
});

vi.mock('@/config/Blog/server', async (orgImport) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = await orgImport<typeof import('@/config/Blog/server')>();

  return {
    default: {
      ...mod.default,
      ENABLE_DRAFTS_IN_PROD: false
    } satisfies BlogConfigType
  };
});

describe('getBlogStaticParams', () => {
  it("should return static params, excluding the 'drafts' fake language", async () => {
    const staticParams = await getBlogStaticParams();
    expect(staticParams).toStrictEqual([
      {
        [BlogTaxonomy.SUBCATEGORY]: TESTING_BLOG_FAKE_SUBCATEGORY,
        [BlogTaxonomy.CATEGORY]: BlogConfig.TESTING_CATEGORY,
        [I18nTaxonomy.LANGUAGE]: DEFAULT_LANGUAGE,
        [BlogTaxonomy.SLUG]: 'fake-post-01'
      },
      {
        [BlogTaxonomy.SUBCATEGORY]: TESTING_BLOG_FAKE_SUBCATEGORY,
        [BlogTaxonomy.CATEGORY]: BlogConfig.TESTING_CATEGORY,
        [I18nTaxonomy.LANGUAGE]: DEFAULT_LANGUAGE,
        [BlogTaxonomy.SLUG]: 'fake-post-02'
      },
      {
        [BlogTaxonomy.SUBCATEGORY]: TESTING_BLOG_FAKE_SUBCATEGORY,
        [BlogTaxonomy.CATEGORY]: BlogConfig.TESTING_CATEGORY,
        [I18nTaxonomy.LANGUAGE]: DEFAULT_LANGUAGE,
        [BlogTaxonomy.SLUG]: 'fake-post-03'
      },
      {
        [BlogTaxonomy.SUBCATEGORY]: TESTING_BLOG_FAKE_SUBCATEGORY,
        [BlogTaxonomy.CATEGORY]: BlogConfig.TESTING_CATEGORY,
        [I18nTaxonomy.LANGUAGE]: DEFAULT_LANGUAGE,
        [BlogTaxonomy.SLUG]: INDEX_TOKEN
      },
      {
        [BlogTaxonomy.SUBCATEGORY]: TESTING_BLOG_FAKE_SUBCATEGORY,
        [BlogTaxonomy.CATEGORY]: BlogConfig.TESTING_CATEGORY,
        [BlogTaxonomy.SLUG]: 'fake-post-01',
        [I18nTaxonomy.LANGUAGE]: 'posts'
      },
      {
        [BlogTaxonomy.SUBCATEGORY]: TESTING_BLOG_FAKE_SUBCATEGORY,
        [BlogTaxonomy.CATEGORY]: BlogConfig.TESTING_CATEGORY,
        [BlogTaxonomy.SLUG]: 'fake-post-02',
        [I18nTaxonomy.LANGUAGE]: 'posts'
      },
      {
        [BlogTaxonomy.SUBCATEGORY]: TESTING_BLOG_FAKE_SUBCATEGORY,
        [BlogTaxonomy.CATEGORY]: BlogConfig.TESTING_CATEGORY,
        [BlogTaxonomy.SLUG]: 'fake-post-03',
        [I18nTaxonomy.LANGUAGE]: 'posts'
      },
      {
        [BlogTaxonomy.SUBCATEGORY]: TESTING_BLOG_FAKE_SUBCATEGORY,
        [BlogTaxonomy.CATEGORY]: BlogConfig.TESTING_CATEGORY,
        [BlogTaxonomy.SLUG]: 'fake-post-04',
        [I18nTaxonomy.LANGUAGE]: 'posts'
      },
      {
        [BlogTaxonomy.SUBCATEGORY]: TESTING_BLOG_FAKE_SUBCATEGORY,
        [BlogTaxonomy.CATEGORY]: BlogConfig.TESTING_CATEGORY,
        [BlogTaxonomy.SLUG]: INDEX_TOKEN,
        [I18nTaxonomy.LANGUAGE]: 'posts'
      }
    ]);
  });
});

vi.doUnmock('##/config/i18n');
vi.doUnmock('../api');
vi.doUnmock('@/config/Blog/server');
