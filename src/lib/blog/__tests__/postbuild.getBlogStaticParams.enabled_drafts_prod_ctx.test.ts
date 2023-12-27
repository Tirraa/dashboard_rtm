import type { TBlogConfig } from '@/config/blog';

import TESTING_BLOG_CATEGORY_FAKE_LANGUAGES from '𝕍/testingBlogCategoryFakeLanguages';
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
        subcateg: 'fake-subcategory',
        locale: DEFAULT_LANGUAGE,
        slug: 'fake-post-01',
        categ: 'testing'
      },
      {
        subcateg: 'fake-subcategory',
        locale: DEFAULT_LANGUAGE,
        slug: 'fake-post-02',
        categ: 'testing'
      },
      {
        subcateg: 'fake-subcategory',
        locale: DEFAULT_LANGUAGE,
        slug: 'fake-post-03',
        categ: 'testing'
      },
      {
        subcateg: 'fake-subcategory',
        slug: 'fake-draft-01',
        locale: 'drafts',
        categ: 'testing'
      },
      {
        subcateg: 'fake-subcategory',
        slug: 'fake-draft-02',
        locale: 'drafts',
        categ: 'testing'
      },
      {
        subcateg: 'fake-subcategory',
        slug: 'fake-draft-03',
        locale: 'drafts',
        categ: 'testing'
      },
      {
        subcateg: 'fake-subcategory',
        slug: 'fake-post-01',
        categ: 'testing',
        locale: 'posts'
      },
      {
        subcateg: 'fake-subcategory',
        slug: 'fake-post-02',
        categ: 'testing',
        locale: 'posts'
      },
      {
        subcateg: 'fake-subcategory',
        slug: 'fake-post-03',
        categ: 'testing',
        locale: 'posts'
      },
      {
        subcateg: 'fake-subcategory',
        slug: 'fake-post-04',
        categ: 'testing',
        locale: 'posts'
      }
    ]);
  });
});

vi.doUnmock('##/config/i18n');
vi.doUnmock('../api');
vi.doUnmock('@/config/blog');
