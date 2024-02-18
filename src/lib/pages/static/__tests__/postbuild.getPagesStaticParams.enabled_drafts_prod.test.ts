import type { PagesConfigType } from '@/config/pages';
import type { Page } from 'contentlayer/generated';

import { TESTING_PAGES_FAKE_LANGUAGES } from '𝕍/testingContentCategoryDatas';
import PageTaxonomy from '##/config/taxonomies/pages';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { describe, expect, it, vi } from 'vitest';

import getPagesStaticParams from '../getPagesStaticParams';

vi.mock('../../../../../interop/config/i18n', async (orgImport) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = await orgImport<typeof import('../../../../../interop/config/i18n')>();
  return {
    ...mod,
    LANGUAGES: [mod.DEFAULT_LANGUAGE, ...TESTING_PAGES_FAKE_LANGUAGES]
  };
});

vi.mock('@/config/pages', async (orgImport) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = await orgImport<typeof import('@/config/pages')>();
  const data = [
    {
      _raw: {
        sourceFilePath: 'pages/page-00.mdx',
        flattenedPath: 'pages/page-00',
        sourceFileName: 'page-00.mdx',
        sourceFileDir: 'pages',
        contentType: 'mdx'
      },
      metadescription: 'Metadescription de la page de test',
      _id: 'pages/page-00.mdx',
      title: 'Test Page',
      url: '/fr/page-00',
      path: 'page-00',
      language: 'fr',
      draft: false,
      type: 'Page',
      root: '/'
    },
    {
      _raw: {
        sourceFilePath: 'pages/page-01.mdx',
        flattenedPath: 'pages/page-01',
        sourceFileName: 'page-01.mdx',
        sourceFileDir: 'pages',
        contentType: 'mdx'
      },
      metadescription: 'Metadescription de la page de test',
      _id: 'pages/page-01.mdx',
      title: 'Test Page',
      url: '/fr/page-01',
      path: 'page-01',
      language: 'fr',
      draft: false,
      type: 'Page',
      root: '/'
    },
    {
      _raw: {
        sourceFilePath: 'pages/en/page-00.mdx',
        flattenedPath: 'pages/en/page-00',
        sourceFileName: 'page-00.mdx',
        sourceFileDir: 'pages/en',
        contentType: 'mdx'
      },
      metadescription: 'Test page metadescription',
      _id: 'pages/en/page-00.mdx',
      title: 'Test Page (EN)',
      url: '/en/page-00',
      path: 'page-00',
      language: 'en',
      draft: false,
      type: 'Page',
      root: '/'
    },
    {
      _raw: {
        sourceFilePath: 'pages/nesting-1/page-00.mdx',
        flattenedPath: 'pages/nesting-1/page-00',
        sourceFileDir: 'pages/nesting-1',
        sourceFileName: 'page-00.mdx',
        contentType: 'mdx'
      },
      metadescription: 'Metadescription de la page de test - Nesting 1 (FR)',
      title: 'Page de test - Nesting 1 (FR)',
      _id: 'pages/nesting-1/page-00.mdx',
      url: '/fr/nesting-1/page-00',
      path: 'nesting-1/page-00',
      root: 'nesting-1',
      language: 'fr',
      draft: false,
      type: 'Page'
    },
    {
      _raw: {
        sourceFilePath: 'pages/nesting-1/page-01.mdx',
        flattenedPath: 'pages/nesting-1/page-01',
        sourceFileDir: 'pages/nesting-1',
        sourceFileName: 'page-01.mdx',
        contentType: 'mdx'
      },
      metadescription: 'Metadescription de la page de test - Nesting 1 (FR)',
      title: 'Page de test - Nesting 1 (FR)',
      _id: 'pages/nesting-1/page-01.mdx',
      url: '/fr/nesting-1/page-01',
      path: 'nesting-1/page-01',
      root: 'nesting-1',
      language: 'fr',
      draft: false,
      type: 'Page'
    },
    {
      _raw: {
        sourceFilePath: 'pages/testing-pages-root/fake-draft-00.mdx',
        flattenedPath: 'pages/testing-pages-root/fake-draft-00',
        sourceFileDir: 'pages/testing-pages-root',
        sourceFileName: 'fake-draft-00.mdx',
        contentType: 'mdx'
      },
      _id: 'pages/testing-pages-root/fake-draft-00.mdx',
      url: '/fr/testing-pages-root/fake-draft-00',
      path: 'testing-pages-root/fake-draft-00',
      root: 'testing-pages-root',
      metadescription: 'FAKE',
      language: 'fr',
      title: 'FAKE',
      type: 'Page',
      draft: true
    },
    {
      _raw: {
        sourceFilePath: 'pages/testing-pages-root/fake-page-00.mdx',
        flattenedPath: 'pages/testing-pages-root/fake-page-00',
        sourceFileDir: 'pages/testing-pages-root',
        sourceFileName: 'fake-page-00.mdx',
        contentType: 'mdx'
      },
      _id: 'pages/testing-pages-root/fake-page-00.mdx',
      url: '/fr/testing-pages-root/fake-page-00',
      path: 'testing-pages-root/fake-page-00',
      root: 'testing-pages-root',
      metadescription: 'FAKE',
      language: 'fr',
      title: 'FAKE',
      draft: false,
      type: 'Page'
    },
    {
      _raw: {
        sourceFilePath: 'pages/en/nesting-1/page-00.mdx',
        flattenedPath: 'pages/en/nesting-1/page-00',
        sourceFileDir: 'pages/en/nesting-1',
        sourceFileName: 'page-00.mdx',
        contentType: 'mdx'
      },
      metadescription: 'Test page metadescription',
      _id: 'pages/en/nesting-1/page-00.mdx',
      title: 'Test Page - Nesting 1 (EN)',
      url: '/en/nesting-1/page-00',
      path: 'nesting-1/page-00',
      root: 'nesting-1',
      language: 'en',
      draft: false,
      type: 'Page'
    },
    {
      _raw: {
        sourceFilePath: 'pages/nesting-1/nesting-2/page-00.mdx',
        flattenedPath: 'pages/nesting-1/nesting-2/page-00',
        sourceFileDir: 'pages/nesting-1/nesting-2',
        sourceFileName: 'page-00.mdx',
        contentType: 'mdx'
      },
      metadescription: 'Metadescription de la page de test - Nesting 2 (FR)',
      _id: 'pages/nesting-1/nesting-2/page-00.mdx',
      title: 'Page de test - Nesting 2 (FR)',
      url: '/fr/nesting-1/nesting-2/page-00',
      path: 'nesting-1/nesting-2/page-00',
      root: 'nesting-1',
      language: 'fr',
      draft: false,
      type: 'Page'
    },
    {
      _raw: {
        sourceFilePath: 'pages/nesting-1/nesting-2/page-01.mdx',
        flattenedPath: 'pages/nesting-1/nesting-2/page-01',
        sourceFileDir: 'pages/nesting-1/nesting-2',
        sourceFileName: 'page-01.mdx',
        contentType: 'mdx'
      },
      metadescription: 'Metadescription de la page de test - Nesting 2 (FR)',
      _id: 'pages/nesting-1/nesting-2/page-01.mdx',
      title: 'Page de test - Nesting 2 (FR)',
      url: '/fr/nesting-1/nesting-2/page-01',
      path: 'nesting-1/nesting-2/page-01',
      root: 'nesting-1',
      language: 'fr',
      draft: false,
      type: 'Page'
    },
    {
      _raw: {
        sourceFilePath: 'pages/testing-pages-root/fake-nesting/index.mdx',
        sourceFileDir: 'pages/testing-pages-root/fake-nesting',
        flattenedPath: 'pages/testing-pages-root/fake-nesting',
        sourceFileName: 'index.mdx',
        contentType: 'mdx'
      },
      _id: 'pages/testing-pages-root/fake-nesting/index.mdx',
      url: '/fr/testing-pages-root/fake-nesting',
      path: 'testing-pages-root/fake-nesting',
      root: 'testing-pages-root',
      metadescription: 'FAKE',
      language: 'fr',
      title: 'FAKE',
      draft: false,
      type: 'Page'
    },
    {
      _raw: {
        sourceFilePath: 'pages/en/nesting-1/nesting-2/page-00.mdx',
        flattenedPath: 'pages/en/nesting-1/nesting-2/page-00',
        sourceFileDir: 'pages/en/nesting-1/nesting-2',
        sourceFileName: 'page-00.mdx',
        contentType: 'mdx'
      },
      _id: 'pages/en/nesting-1/nesting-2/page-00.mdx',
      metadescription: 'Test page metadescription',
      url: '/en/nesting-1/nesting-2/page-00',
      title: 'Test Page - Nesting 2 (EN)',
      path: 'nesting-1/nesting-2/page-00',
      root: 'nesting-1',
      language: 'en',
      draft: false,
      type: 'Page'
    }
  ] satisfies Omit<Page, 'body'>[];

  return {
    default: {
      ...mod.default,
      allPages: () => data as unknown as Page[],
      SKIP_SSG: { prefixes: [], paths: [] },
      ENABLE_DRAFTS_IN_PROD: true
    } satisfies PagesConfigType
  };
});

describe('getPagesStaticParams', () => {
  it('should return static params according to the allPages mock', () => {
    const staticParams = getPagesStaticParams();

    expect(staticParams).toStrictEqual([
      { [PageTaxonomy.PATH]: ['page-00'], [I18nTaxonomy.LANGUAGE]: 'fr' },
      { [PageTaxonomy.PATH]: ['page-01'], [I18nTaxonomy.LANGUAGE]: 'fr' },
      { [PageTaxonomy.PATH]: ['page-00'], [I18nTaxonomy.LANGUAGE]: 'en' },
      { [PageTaxonomy.PATH]: ['nesting-1', 'page-00'], [I18nTaxonomy.LANGUAGE]: 'fr' },
      { [PageTaxonomy.PATH]: ['nesting-1', 'page-01'], [I18nTaxonomy.LANGUAGE]: 'fr' },
      { [PageTaxonomy.PATH]: ['testing-pages-root', 'fake-draft-00'], [I18nTaxonomy.LANGUAGE]: 'fr' },
      { [PageTaxonomy.PATH]: ['testing-pages-root', 'fake-page-00'], [I18nTaxonomy.LANGUAGE]: 'fr' },
      { [PageTaxonomy.PATH]: ['nesting-1', 'page-00'], [I18nTaxonomy.LANGUAGE]: 'en' },
      { [PageTaxonomy.PATH]: ['nesting-1', 'nesting-2', 'page-00'], [I18nTaxonomy.LANGUAGE]: 'fr' },
      { [PageTaxonomy.PATH]: ['nesting-1', 'nesting-2', 'page-01'], [I18nTaxonomy.LANGUAGE]: 'fr' },
      { [PageTaxonomy.PATH]: ['testing-pages-root', 'fake-nesting'], [I18nTaxonomy.LANGUAGE]: 'fr' },
      { [PageTaxonomy.PATH]: ['nesting-1', 'nesting-2', 'page-00'], [I18nTaxonomy.LANGUAGE]: 'en' }
    ]);
  });
});

vi.doUnmock('../../../../../interop/config/i18n');
vi.doUnmock('@/config/pages');
