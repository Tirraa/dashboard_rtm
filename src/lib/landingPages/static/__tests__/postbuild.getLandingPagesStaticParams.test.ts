import LandingPageTaxonomy from '##/config/taxonomies/landingPages';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { describe, expect, it, vi } from 'vitest';

import getLandingPagesStaticParams from '../getLandingPagesStaticParams';

vi.mock('contentlayer/generated', async (orgImport) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = await orgImport<typeof import('contentlayer/generated')>();

  return {
    ...mod,
    allLandingPages: [
      {
        _raw: {
          sourceFilePath: 'landing-pages/dummy-category/lp-00.mdx',
          flattenedPath: 'landing-pages/dummy-category/lp-00',
          sourceFileDir: 'landing-pages/dummy-category',
          sourceFileName: 'lp-00.mdx',
          contentType: 'mdx'
        },
        metadescription: 'Meta description LP test FR',
        _id: 'landing-pages/dummy-category/lp-00.mdx',
        url: '/fr/lp/dummy-category-lp-00',
        slug: 'dummy-category-lp-00',
        category: 'dummy-category',
        title: 'LP test FR',
        type: 'LandingPage',
        language: 'fr',
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
        _id: 'landing-pages/testing/fake-draft-lp-00.mdx',
        url: '/fr/lp/testing-fake-draft-lp-00',
        slug: 'testing-fake-draft-lp-00',
        metadescription: 'FAKE',
        type: 'LandingPage',
        category: 'testing',
        language: 'fr',
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
        _id: 'landing-pages/testing/fake-lp-00.mdx',
        url: '/fr/lp/testing-fake-lp-00',
        slug: 'testing-fake-lp-00',
        metadescription: 'FAKE',
        type: 'LandingPage',
        category: 'testing',
        language: 'fr',
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
        url: '/en/lp/dummy-category-lp-00',
        slug: 'dummy-category-lp-00',
        category: 'dummy-category',
        title: 'LP test EN',
        type: 'LandingPage',
        language: 'en',
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
        url: '/en/lp/testing-fake-draft-lp-00',
        slug: 'testing-fake-draft-lp-00',
        metadescription: 'FAKE',
        type: 'LandingPage',
        category: 'testing',
        language: 'en',
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
        url: '/en/lp/testing-fake-lp-00',
        slug: 'testing-fake-lp-00',
        metadescription: 'FAKE',
        type: 'LandingPage',
        category: 'testing',
        language: 'en',
        title: 'FAKE',
        draft: false
      }
    ]
  };
});

describe('getLandingPagesStaticParams', () => {
  it('should return static params, according to the allLandingPages mock', async () => {
    const staticParams = await getLandingPagesStaticParams();

    expect(staticParams).toStrictEqual([
      {
        [LandingPageTaxonomy.SLUG]: 'testing-fake-lp-00',
        [I18nTaxonomy.LANGUAGE]: 'fr'
      },
      {
        [LandingPageTaxonomy.SLUG]: 'testing-fake-lp-00',
        [I18nTaxonomy.LANGUAGE]: 'en'
      }
    ]);
  });
});

vi.doUnmock('contentlayer/generated');
