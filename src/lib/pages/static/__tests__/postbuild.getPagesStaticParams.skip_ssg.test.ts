import type { PagesConfigType } from '@/config/pages';
import type { Page } from 'contentlayer/generated';
import type { PagePath } from '@/types/Page';

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
    },
    {
      _raw: {
        sourceFilePath: 'pages/en/skipped/nesting-2/page-00.mdx',
        flattenedPath: 'pages/en/skipped/nesting-2/page-00',
        sourceFileDir: 'pages/en/skipped/nesting-2',
        sourceFileName: 'page-00.mdx',
        contentType: 'mdx'
      },
      _id: 'pages/en/skipped/nesting-2/page-00.mdx',
      metadescription: 'Test page metadescription',
      url: '/en/skipped/nesting-2/page-00',
      title: 'Test Page - Nesting 2 (EN)',
      path: 'skipped/nesting-2/page-00',
      root: 'skipped',
      language: 'en',
      draft: false,
      type: 'Page'
    }
  ] satisfies Omit<Page, 'body'>[];

  return {
    default: {
      ...mod.default,
      SKIP_SSG: { paths: ['page-00'] as unknown as PagePath[], prefixes: ['skipped'] },
      allPages: () => data as unknown as Page[],
      ENABLE_DRAFTS_IN_PROD: true
    } satisfies PagesConfigType
  };
});

describe('getPagesStaticParams', () => {
  it('should return static params according to the allPages mock', () => {
    const staticParams = getPagesStaticParams();

    expect(staticParams).toStrictEqual([{ [PageTaxonomy.PATH]: ['nesting-1', 'nesting-2', 'page-00'], [I18nTaxonomy.LANGUAGE]: 'en' }]);
  });
});

vi.doUnmock('../../../../../interop/config/i18n');
vi.doUnmock('@/config/pages');
