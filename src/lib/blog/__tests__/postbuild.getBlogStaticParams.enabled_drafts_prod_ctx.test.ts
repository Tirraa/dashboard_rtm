import type { TBlogConfig } from '@/config/blog';

import { TESTING_BLOG_CATEGORY_FAKE_LANGUAGES, TESTING_BLOG_FAKE_SUBCATEGORY } from '𝕍/testingBlogCategoryDatas';
import BlogTaxonomy from '##/config/taxonomies/blog';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { describe, expect, it, vi } from 'vitest';
import { DEFAULT_LANGUAGE } from '##/config/i18n';
import BlogConfig from '@/config/blog';

import getBlogStaticParams from '../static/getBlogStaticParams';

vi.mock('##/config/i18n', async (orgImport) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = await orgImport<typeof import('##/config/i18n')>();

  return {
    ...mod,
    LANGUAGES: [mod.DEFAULT_LANGUAGE, ...TESTING_BLOG_CATEGORY_FAKE_LANGUAGES]
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

describe('getBlogStaticParams', () => {
  it("should return static params, including the 'drafts' fake language", async () => {
    const staticParams = await getBlogStaticParams();
    expect(staticParams).toStrictEqual([
      {
        [BlogTaxonomy.SUBCATEGORY]: TESTING_BLOG_FAKE_SUBCATEGORY,
        [I18nTaxonomy.LANGUAGE]: DEFAULT_LANGUAGE,
        [BlogTaxonomy.SLUG]: 'fake-post-01',
        [BlogTaxonomy.CATEGORY]: 'testing'
      },
      {
        [BlogTaxonomy.SUBCATEGORY]: TESTING_BLOG_FAKE_SUBCATEGORY,
        [I18nTaxonomy.LANGUAGE]: DEFAULT_LANGUAGE,
        [BlogTaxonomy.SLUG]: 'fake-post-02',
        [BlogTaxonomy.CATEGORY]: 'testing'
      },
      {
        [BlogTaxonomy.SUBCATEGORY]: TESTING_BLOG_FAKE_SUBCATEGORY,
        [I18nTaxonomy.LANGUAGE]: DEFAULT_LANGUAGE,
        [BlogTaxonomy.SLUG]: 'fake-post-03',
        [BlogTaxonomy.CATEGORY]: 'testing'
      },
      {
        [BlogTaxonomy.SUBCATEGORY]: TESTING_BLOG_FAKE_SUBCATEGORY,
        [BlogTaxonomy.SLUG]: 'fake-draft-01',
        [BlogTaxonomy.CATEGORY]: 'testing',
        [I18nTaxonomy.LANGUAGE]: 'drafts'
      },
      {
        [BlogTaxonomy.SUBCATEGORY]: TESTING_BLOG_FAKE_SUBCATEGORY,
        [BlogTaxonomy.SLUG]: 'fake-draft-02',
        [BlogTaxonomy.CATEGORY]: 'testing',
        [I18nTaxonomy.LANGUAGE]: 'drafts'
      },
      {
        [BlogTaxonomy.SUBCATEGORY]: TESTING_BLOG_FAKE_SUBCATEGORY,
        [BlogTaxonomy.SLUG]: 'fake-draft-03',
        [BlogTaxonomy.CATEGORY]: 'testing',
        [I18nTaxonomy.LANGUAGE]: 'drafts'
      },
      {
        [BlogTaxonomy.SUBCATEGORY]: TESTING_BLOG_FAKE_SUBCATEGORY,
        [BlogTaxonomy.SLUG]: 'fake-post-01',
        [BlogTaxonomy.CATEGORY]: 'testing',
        [I18nTaxonomy.LANGUAGE]: 'posts'
      },
      {
        [BlogTaxonomy.SUBCATEGORY]: TESTING_BLOG_FAKE_SUBCATEGORY,
        [BlogTaxonomy.SLUG]: 'fake-post-02',
        [BlogTaxonomy.CATEGORY]: 'testing',
        [I18nTaxonomy.LANGUAGE]: 'posts'
      },
      {
        [BlogTaxonomy.SUBCATEGORY]: TESTING_BLOG_FAKE_SUBCATEGORY,
        [BlogTaxonomy.SLUG]: 'fake-post-03',
        [BlogTaxonomy.CATEGORY]: 'testing',
        [I18nTaxonomy.LANGUAGE]: 'posts'
      },
      {
        [BlogTaxonomy.SUBCATEGORY]: TESTING_BLOG_FAKE_SUBCATEGORY,
        [BlogTaxonomy.SLUG]: 'fake-post-04',
        [BlogTaxonomy.CATEGORY]: 'testing',
        [I18nTaxonomy.LANGUAGE]: 'posts'
      }
    ]);
  });
});

vi.doUnmock('##/config/i18n');
vi.doUnmock('../api');
vi.doUnmock('@/config/blog');
