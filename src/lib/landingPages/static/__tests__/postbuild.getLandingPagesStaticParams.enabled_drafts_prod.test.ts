import type { LpFakeLanguageType } from '𝕍/testingContentCategoryDatas';
import type { LandingPagesConfigType } from '@/config/landingPages';
import type { LandingPage } from 'contentlayer/generated';

import { TESTING_LP_FAKE_LANGUAGES } from '𝕍/testingContentCategoryDatas';
import LandingPageTaxonomy from '##/config/taxonomies/landingPages';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { describe, expect, it, vi } from 'vitest';

import getLandingPagesStaticParams from '../getLandingPagesStaticParams';

vi.mock('##/config/i18n', async (orgImport) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = await orgImport<typeof import('##/config/i18n')>();

  return {
    ...mod,
    LANGUAGES: [mod.DEFAULT_LANGUAGE, ...TESTING_LP_FAKE_LANGUAGES]
  };
});

vi.mock('@/config/landingPages', async (orgImport) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = await orgImport<typeof import('@/config/landingPages')>();
  const data = [
    {
      _raw: {
        sourceFilePath: 'landing-pages/dummy-category/lp-00.mdx',
        flattenedPath: 'landing-pages/dummy-category/lp-00',
        sourceFileDir: 'landing-pages/dummy-category',
        sourceFileName: 'lp-00.mdx',
        contentType: 'mdx'
      },
      metadescription: 'Meta description LP test (default language)',
      language: 'default_language' satisfies LpFakeLanguageType,
      url: '/default_language/lp/dummy-category-lp-00',
      _id: 'landing-pages/dummy-category/lp-00.mdx',
      title: 'LP test (default language)',
      slug: 'dummy-category-lp-00',
      category: 'dummy-category',
      type: 'LandingPage',
      draft: true
    },
    {
      _raw: {
        sourceFilePath: 'landing-pages/testing/fake-draft-lp-00.mdx',
        flattenedPath: 'landing-pages/testing/fake-draft-lp-00',
        sourceFileName: 'fake-draft-lp-00.mdx',
        sourceFileDir: 'landing-pages/testing',
        contentType: 'mdx'
      },
      language: 'default_language' satisfies LpFakeLanguageType,
      url: '/default_language/lp/testing-fake-draft-lp-00',
      _id: 'landing-pages/testing/fake-draft-lp-00.mdx',
      slug: 'testing-fake-draft-lp-00',
      metadescription: 'FAKE',
      type: 'LandingPage',
      category: 'testing',
      title: 'FAKE',
      draft: true
    },
    {
      _raw: {
        sourceFilePath: 'landing-pages/testing/fake-lp-00.mdx',
        flattenedPath: 'landing-pages/testing/fake-lp-00',
        sourceFileDir: 'landing-pages/testing',
        sourceFileName: 'fake-lp-00.mdx',
        contentType: 'mdx'
      },
      language: 'default_language' satisfies LpFakeLanguageType,
      url: '/default_language/lp/testing-fake-lp-00',
      _id: 'landing-pages/testing/fake-lp-00.mdx',
      slug: 'testing-fake-lp-00',
      metadescription: 'FAKE',
      type: 'LandingPage',
      category: 'testing',
      title: 'FAKE',
      draft: false
    },
    {
      _raw: {
        sourceFilePath: 'landing-pages/dummy-category/en/lp-00.mdx',
        flattenedPath: 'landing-pages/dummy-category/en/lp-00',
        sourceFileDir: 'landing-pages/dummy-category/en',
        sourceFileName: 'lp-00.mdx',
        contentType: 'mdx'
      },
      _id: 'landing-pages/dummy-category/en/lp-00.mdx',
      metadescription: 'Meta description LP test EN',
      language: 'en' satisfies LpFakeLanguageType,
      url: '/en/lp/dummy-category-lp-00',
      slug: 'dummy-category-lp-00',
      category: 'dummy-category',
      title: 'LP test EN',
      type: 'LandingPage',
      draft: true
    },
    {
      _raw: {
        sourceFilePath: 'landing-pages/testing/en/fake-draft-lp-00.mdx',
        flattenedPath: 'landing-pages/testing/en/fake-draft-lp-00',
        sourceFileDir: 'landing-pages/testing/en',
        sourceFileName: 'fake-draft-lp-00.mdx',
        contentType: 'mdx'
      },
      _id: 'landing-pages/testing/en/fake-draft-lp-00.mdx',
      language: 'en' satisfies LpFakeLanguageType,
      url: '/en/lp/testing-fake-draft-lp-00',
      slug: 'testing-fake-draft-lp-00',
      metadescription: 'FAKE',
      type: 'LandingPage',
      category: 'testing',
      title: 'FAKE',
      draft: true
    },
    {
      _raw: {
        sourceFilePath: 'landing-pages/testing/en/fake-lp-00.mdx',
        flattenedPath: 'landing-pages/testing/en/fake-lp-00',
        sourceFileDir: 'landing-pages/testing/en',
        sourceFileName: 'fake-lp-00.mdx',
        contentType: 'mdx'
      },
      _id: 'landing-pages/testing/en/fake-lp-00.mdx',
      language: 'en' satisfies LpFakeLanguageType,
      url: '/en/lp/testing-fake-lp-00',
      slug: 'testing-fake-lp-00',
      metadescription: 'FAKE',
      type: 'LandingPage',
      category: 'testing',
      title: 'FAKE',
      draft: false
    },
    {
      _raw: {
        sourceFilePath: 'landing-pages/testing/__INVALID_LOCALE__/fake-lp-00.mdx',
        flattenedPath: 'landing-pages/testing/__INVALID_LOCALE__/fake-lp-00',
        sourceFileDir: 'landing-pages/testing/__INVALID_LOCALE__',
        sourceFileName: 'fake-lp-00.mdx',
        contentType: 'mdx'
      },
      _id: 'landing-pages/testing/__INVALID_LOCALE__/fake-lp-00.mdx',
      url: '/__INVALID_LOCALE__/lp/testing-fake-lp-00',
      language: '__INVALID_LOCALE__',
      slug: 'testing-fake-lp-00',
      metadescription: 'FAKE',
      type: 'LandingPage',
      category: 'testing',
      title: 'FAKE',
      draft: false
    }
  ] satisfies Omit<LandingPage, 'body'>[];

  return {
    default: {
      ...mod.default,
      allLandingPages: () => data as unknown as Promise<LandingPage[]>,
      ENABLE_DRAFTS_IN_PROD: true
    } satisfies LandingPagesConfigType
  };
});

describe('getLandingPagesStaticParams', () => {
  it('should return static params, including the mocked drafts', async () => {
    const staticParams = await getLandingPagesStaticParams();
    expect(staticParams).toStrictEqual([
      { [LandingPageTaxonomy.SLUG]: 'dummy-category-lp-00', [I18nTaxonomy.LANGUAGE]: 'default_language' },
      { [LandingPageTaxonomy.SLUG]: 'testing-fake-draft-lp-00', [I18nTaxonomy.LANGUAGE]: 'default_language' },
      { [LandingPageTaxonomy.SLUG]: 'testing-fake-lp-00', [I18nTaxonomy.LANGUAGE]: 'default_language' },
      { [LandingPageTaxonomy.SLUG]: 'dummy-category-lp-00', [I18nTaxonomy.LANGUAGE]: 'en' },
      { [LandingPageTaxonomy.SLUG]: 'testing-fake-draft-lp-00', [I18nTaxonomy.LANGUAGE]: 'en' },
      { [LandingPageTaxonomy.SLUG]: 'testing-fake-lp-00', [I18nTaxonomy.LANGUAGE]: 'en' }
    ]);
  });
});

vi.doUnmock('##/config/i18n');
vi.doUnmock('@/config/landingPages');
