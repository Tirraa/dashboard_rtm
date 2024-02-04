import type { Page } from 'contentlayer/generated';

import { TESTING_PAGES_FAKE_LANGUAGES } from '𝕍/testingContentCategoryDatas';
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

vi.mock('contentlayer/generated', async (orgImport) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = await orgImport<typeof import('contentlayer/generated')>();

  return {
    ...mod,
    allPages: [
      {
        _raw: { sourceFilePath: 'pages/index.mdx', sourceFileName: 'index.mdx', sourceFileDir: 'pages', flattenedPath: 'pages', contentType: 'mdx' },
        metadescription: 'Metadescription de la page de test',
        _id: 'pages/index.mdx',
        title: 'Test Page',
        url: '/fr/index',
        language: 'fr',
        path: 'index',
        draft: false,
        type: 'Page',
        root: '/'
      },
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
          sourceFilePath: 'pages/en/index.mdx',
          sourceFileName: 'index.mdx',
          sourceFileDir: 'pages/en',
          flattenedPath: 'pages/en',
          contentType: 'mdx'
        },
        metadescription: 'Metadescription de la page de test',
        _id: 'pages/en/index.mdx',
        title: 'Test Page',
        url: '/en/index',
        language: 'en',
        path: 'index',
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
          sourceFilePath: 'pages/nesting-1/index.mdx',
          sourceFileDir: 'pages/nesting-1',
          flattenedPath: 'pages/nesting-1',
          sourceFileName: 'index.mdx',
          contentType: 'mdx'
        },
        metadescription: 'Metadescription de la page de test',
        _id: 'pages/nesting-1/index.mdx',
        url: '/fr/nesting-1',
        title: 'Test Page',
        path: 'nesting-1',
        language: 'fr',
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
          sourceFilePath: 'pages/testing-pages-root/index.mdx',
          sourceFileDir: 'pages/testing-pages-root',
          flattenedPath: 'pages/testing-pages-root',
          sourceFileName: 'index.mdx',
          contentType: 'mdx'
        },
        metadescription: 'Metadescription de la page de test',
        _id: 'pages/testing-pages-root/index.mdx',
        url: '/fr/testing-pages-root',
        path: 'testing-pages-root',
        title: 'Test Page',
        language: 'fr',
        draft: false,
        type: 'Page',
        root: '/'
      },
      {
        _raw: {
          sourceFilePath: 'pages/en/nesting-1/index.mdx',
          sourceFileDir: 'pages/en/nesting-1',
          flattenedPath: 'pages/en/nesting-1',
          sourceFileName: 'index.mdx',
          contentType: 'mdx'
        },
        metadescription: 'Metadescription de la page de test',
        _id: 'pages/en/nesting-1/index.mdx',
        url: '/en/nesting-1',
        title: 'Test Page',
        path: 'nesting-1',
        language: 'en',
        draft: false,
        type: 'Page',
        root: '/'
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
          sourceFilePath: 'pages/nesting-1/nesting-2/index.mdx',
          sourceFileDir: 'pages/nesting-1/nesting-2',
          flattenedPath: 'pages/nesting-1/nesting-2',
          sourceFileName: 'index.mdx',
          contentType: 'mdx'
        },
        metadescription: 'Metadescription de la page de test',
        _id: 'pages/nesting-1/nesting-2/index.mdx',
        url: '/fr/nesting-1/nesting-2',
        path: 'nesting-1/nesting-2',
        title: 'Test Page',
        root: 'nesting-1',
        language: 'fr',
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
          sourceFilePath: 'pages/en/nesting-1/nesting-2/index.mdx',
          sourceFileDir: 'pages/en/nesting-1/nesting-2',
          flattenedPath: 'pages/en/nesting-1/nesting-2',
          sourceFileName: 'index.mdx',
          contentType: 'mdx'
        },
        metadescription: 'Metadescription de la page de test',
        _id: 'pages/en/nesting-1/nesting-2/index.mdx',
        url: '/en/nesting-1/nesting-2',
        path: 'nesting-1/nesting-2',
        title: 'Test Page',
        root: 'nesting-1',
        language: 'en',
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
    ] satisfies Omit<Page, 'body'>[]
  };
});

describe('getPagesStaticParams (index notation)', () => {
  it('should return static params according to the allPages mock', () => {
    const staticParams = getPagesStaticParams();

    expect(staticParams).toStrictEqual([
      { path: ['index'], locale: 'fr' },
      { path: ['page-00'], locale: 'fr' },
      { path: ['page-01'], locale: 'fr' },
      { path: ['index'], locale: 'en' },
      { path: ['page-00'], locale: 'en' },
      { path: ['nesting-1'], locale: 'fr' },
      { path: ['nesting-1', 'page-00'], locale: 'fr' },
      { path: ['nesting-1', 'page-01'], locale: 'fr' },
      { path: ['testing-pages-root', 'fake-page-00'], locale: 'fr' },
      { path: ['testing-pages-root'], locale: 'fr' },
      { path: ['nesting-1'], locale: 'en' },
      { path: ['nesting-1', 'page-00'], locale: 'en' },
      { path: ['nesting-1', 'nesting-2'], locale: 'fr' },
      { path: ['nesting-1', 'nesting-2', 'page-00'], locale: 'fr' },
      { path: ['nesting-1', 'nesting-2', 'page-01'], locale: 'fr' },
      { path: ['testing-pages-root', 'fake-nesting'], locale: 'fr' },
      { path: ['nesting-1', 'nesting-2'], locale: 'en' },
      { path: ['nesting-1', 'nesting-2', 'page-00'], locale: 'en' }
    ]);
  });
});

vi.doUnmock('../../../../../interop/config/i18n');
vi.doUnmock('contentlayer/generated');
