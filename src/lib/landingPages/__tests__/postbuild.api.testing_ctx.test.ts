import type { TLpFakeLanguage } from '𝕍/testingBlogCategoryDatas';
import type { LandingPage } from 'contentlayer/generated';

import { TESTING_LP_FAKE_LANGUAGES } from '𝕍/testingBlogCategoryDatas';
import LandingPagesConfig from '@/config/landingPages';
import { DEFAULT_LANGUAGE } from '##/config/i18n';
import { describe, expect, vi, it } from 'vitest';
import ROUTES_ROOTS from '##/config/routes';

import { getLandingPageByLanguageAndSlugStrict } from '../api';

vi.mock('../ctx', async (orgImport) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = await orgImport<typeof import('../ctx')>();

  return {
    default: {
      ...mod.default,
      TESTING: true
    }
  } satisfies typeof mod;
});

vi.mock('../../../../interop/config/i18n', async (orgImport) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = await orgImport<typeof import('../../../../interop/config/i18n')>();
  return {
    ...mod,
    LANGUAGES: TESTING_LP_FAKE_LANGUAGES
  };
});

describe('getLandingPageByLanguageAndSlugStrict (happy paths)', () => {
  it('should always return a valid lp', () => {
    const category = LandingPagesConfig.TESTING_CATEGORY;
    const targettedSlug = `${category}-fake-lp-00` as const;
    const language = DEFAULT_LANGUAGE;
    const lp = getLandingPageByLanguageAndSlugStrict(language, targettedSlug) as LandingPage;

    expect(lp.category).toBe(category);
    expect(lp.slug).toBe(targettedSlug);
    expect(lp.language).toBe(language);
    expect(lp.url).toBe('/' + language + ROUTES_ROOTS.LANDING_PAGES + targettedSlug);
  });

  it('should always return a valid lp', () => {
    const category = LandingPagesConfig.TESTING_CATEGORY;
    const targettedSlug = `${category}-index` as const;
    const language = DEFAULT_LANGUAGE;
    const lp = getLandingPageByLanguageAndSlugStrict(language, targettedSlug) as LandingPage;

    expect(lp.category).toBe(category);
    expect(lp.slug).toBe(targettedSlug);
    expect(lp.language).toBe(language);
    expect(lp.url).toBe('/' + language + ROUTES_ROOTS.LANDING_PAGES + targettedSlug);
  });

  it('should always return a valid lp', () => {
    const category = LandingPagesConfig.TESTING_CATEGORY;
    const targettedSlug = `${category}-index` as const;
    const language = 'en' satisfies TLpFakeLanguage;
    const lp = getLandingPageByLanguageAndSlugStrict(language, targettedSlug) as LandingPage;

    expect(lp.category).toBe(category);
    expect(lp.slug).toBe(targettedSlug);
    expect(lp.language).toBe(language);
    expect(lp.url).toBe('/' + language + ROUTES_ROOTS.LANDING_PAGES + targettedSlug);
  });
});

describe('getLandingPageByLanguageAndSlugStrict (unhappy paths)', () => {
  it('should always return null, given invalid slug', () => {
    const targettedSlug = '__INVALID__TARGETTED_SLUG__' as const;
    // @ts-expect-error
    const lp = getLandingPageByLanguageAndSlugStrict(DEFAULT_LANGUAGE, targettedSlug);

    expect(lp).toBe(null);
  });

  it('should always return null, given invalid language', () => {
    const targettedSlug = 'testing-fake-lp-00' as const;
    // @ts-expect-error
    const lp = getLandingPageByLanguageAndSlugStrict('__INVALID_LANGUAGE__', targettedSlug);

    expect(lp).toBe(null);
  });
});

vi.doUnmock('../ctx');
vi.doUnmock('../../../../interop/config/i18n');
